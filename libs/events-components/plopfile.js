import { existsSync } from 'fs';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import hbs from 'handlebars';
import { dirname, join, parse } from 'path';
import prettier from 'prettier';
import { fileURLToPath } from 'url';

const { format, resolveConfigFile, resolveConfig } = prettier;

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const resolvePath = (path) =>
  join(dirname(fileURLToPath(import.meta.url)), path);

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setHelper('capitalize', (text) => {
    return capitalize(text);
  });

  plop.setGenerator('package', {
    description: 'Generate a component package',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'Enter component name in camelCase:',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: './packages/{{ dashCase componentName }}',
        base: 'plop/package',
        templateFiles: 'plop/package/**',
        abortOnFail: true,
      },
    ],
  });

  plop.setGenerator('hook', {
    description: 'Generate a hook',
    prompts: [
      {
        type: 'input',
        name: 'hookName',
        message: 'Enter hook name in camelCase:',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: './packages/{{ dashCase hookName }}',
        base: 'plop/hook',
        templateFiles: 'plop/hook/**',
        abortOnFail: true,
      },
    ],
  });

  plop.setGenerator('icons', {
    prompts: [],
    actions: [
      async function generateIcons() {
        console.time('icons');
        const srcFolder = resolvePath('./packages/icons/src');
        const resourcesFolder = resolvePath('./packages/icons/resources');
        const plopTemplatesFolder = resolvePath('./plop/icon');
        const iconsFolder = resolvePath('./packages/icons/src/icons');

        const toKebab = plop.getHelper('kebabCase');
        const toTitleCase = plop.getHelper('titleCase');

        const { convertSvgToJsx } = await import('@svgo/jsx');
        const prettierOptions = await resolveConfig(
          await resolveConfigFile(resolvePath('./.prettierrc'))
        );

        const template = await readFile(
          join(plopTemplatesFolder, 'icon.hbs'),
          'utf-8'
        );

        if (!existsSync(iconsFolder)) {
          await mkdir(iconsFolder);
        }
        const iconFiles = await readdir(resourcesFolder);

        const iconNames = await Promise.all(
          iconFiles.map(async (fileName) => {
            const { name } = parse(fileName);
            const iconName = toTitleCase(name);
            const iconFileName = toKebab(name);

            let svg = await readFile(join(resourcesFolder, fileName), 'utf-8');

            const { jsx } = convertSvgToJsx({
              svg,
              svgProps: {
                '{...props}': null,
                ref: '{ref}',
              },
              plugins: [{ name: 'removeXMLNS' }],
            });

            const data = {
              iconName,
              svg: new hbs.SafeString(
                jsx
                  .replaceAll('svg', 'Icon')
                  .replace(/fill="(?!none)([^"]+)"/gm, 'fill="currentColor"')
                  .replace(
                    /stroke="(?!none)([^"]+)"/gm,
                    'stroke="currentColor"'
                  )
              ),
            };

            const iconJsx = plop.renderString(template, data);
            await writeFile(
              join(iconsFolder, `${iconFileName}.tsx`),
              format(iconJsx, { ...prettierOptions, parser: 'typescript' })
            );
            return name;
          })
        );
        const indexTemplate = await readFile(
          join(plopTemplatesFolder, 'index.hbs'),
          'utf-8'
        );
        const indexData = {
          iconNames: iconNames.map((icon) => toKebab(icon)),
        };
        const index = plop.renderString(indexTemplate, indexData);
        await writeFile(
          join(iconsFolder, 'index.ts'),
          format(index, { ...prettierOptions, parser: 'typescript' })
        );

        const templateStories = await readFile(
          join(plopTemplatesFolder, 'icons.stories.hbs'),
          'utf-8'
        );

        const storiesData = {
          iconNames,
          icons: iconNames,
        };

        const stories = plop.renderString(templateStories, storiesData);
        await writeFile(
          join(srcFolder, 'icons.stories.tsx'),
          format(stories, { ...prettierOptions, parser: 'typescript' })
        );
        console.timeEnd('icons');
      },
    ],
  });
}

import { colors } from './colors';
import { fontSizes } from './fontSizes';
import { spacings } from './spacings';

const ENTITIES = ['colors', 'sizes', 'space'] as const;
type ThemeEntity = typeof ENTITIES[number];

const entitiesComposition = {
  colors,
  sizes: fontSizes,
  space: spacings,
};

const defaultValues = {
  colors: 'black',
  sizes: '16',
  space: '4',
};

type AvailableKeys =
  | keyof typeof colors
  | keyof typeof fontSizes
  | keyof typeof spacings;

interface Formatted<T extends AvailableKeys> {
  unFormatted: Partial<Record<T, string>>;
  full: Partial<Record<T, string>>;
  short: Partial<Record<T, string>>;
}

interface ReturnFormatted {
  colors: Formatted<keyof typeof colors>;
  sizes: Formatted<keyof typeof fontSizes>;
  space: Formatted<keyof typeof spacings>;
}

const generateFormattedEntity = (
  entity: ThemeEntity,
  resource: Partial<Record<AvailableKeys, string>>
) => {
  const defaultResult: Formatted<keyof typeof resource> = {
    unFormatted: {
      [defaultValues[entity]]: defaultValues[entity],
    },
    full: {
      [defaultValues[entity]]: `$${entity}$${defaultValues[entity]}`,
    },
    short: {
      [defaultValues[entity]]: `$${defaultValues[entity]}`,
    },
  };

  return Object.keys(resource).reduce<Formatted<keyof typeof resource>>(
    (acc, key) => {
      acc['unFormatted'][key as AvailableKeys] = key;
      acc['full'][key as AvailableKeys] = `$${entity}$${key}`;
      acc['short'][key as AvailableKeys] = `$${key}`;
      return acc;
    },
    defaultResult
  );
};

export const {
  colors: formattedColors,
  sizes: formattedSizes,
  space: formattedSpaces,
} = ENTITIES.reduce<ReturnFormatted>((acc, entity) => {
  acc[entity] = generateFormattedEntity(entity, entitiesComposition[entity]);
  return acc;
}, {} as ReturnFormatted);

import { Paragraph, ParagraphProps } from '@events-components/typography';

type ParagraphSize = ParagraphProps['size'] extends infer R
  ? R extends string
    ? R
    : never
  : never;

// auto generated with code action "Add missing properties"
const sizesObj: Record<ParagraphSize, null> = {
  12: null,
  14: null,
  16: null,
  18: null,
  21: null,
  24: null,
  28: null,
};
const sizes = Object.keys(sizesObj).filter((x) =>
  Object.hasOwn(sizesObj, x)
) as ParagraphSize[];

const weights = ['regular', 'medium', 'semibold'] as const;

export default {
  title: 'Typography/Paragraph',
  component: Paragraph,
  args: {
    children: 'Paragraph',
  },
  argTypes: {
    size: { control: 'select', options: sizes },
    weight: { control: 'select', options: weights },
  },
};

export { Paragraph };

export const Variants = () => {
  return sizes.map((size) =>
    weights.map((weight) => (
      <Paragraph key={`${size}-${weight}`} size={size} weight={weight}>
        Paragraph {size}px weight {weight}
      </Paragraph>
    ))
  );
};

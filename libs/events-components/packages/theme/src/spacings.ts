export const spacings = {
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  32: '32px',
  40: '40px',
  48: '48px',
  56: '56px',
  64: '64px',
  72: '72px',
  80: '80px',
  96: '96px',
  120: '120px',
};

export const spacingPresets = {
  sm: spacings[12],
  md: spacings[16],
  lg: spacings[24],
};

export const space = {
  ...spacings,
  ...spacingPresets,
};

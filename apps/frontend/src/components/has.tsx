import { HasProps, Has as AamHas } from '@aam/react';

export const Has = (props: HasProps<'Admin' | 'User'>) => <AamHas {...props} />;

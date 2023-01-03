import { Switch } from '@events-components/switch';

export default {
  title: 'Controls/Switch',
  component: Switch,
};

export const Sizes = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Switch size="small" disabled checked />
      <Switch size="medium" />
      <Switch size="large" />
    </div>
  );
};

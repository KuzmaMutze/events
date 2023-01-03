import {
  NavigationProvider,
  useNavigation,
  useNavigationItem,
} from '@events-components/use-navigation';

export default {
  title: 'Hooks/useNavigation',
};

const NavigationItem = (props: { index: number }) => {
  const { highlight, isHighlighted } = useNavigationItem({
    itemIndex: props.index,
  });

  return (
    <div
      style={{
        backgroundColor: isHighlighted ? 'gray' : undefined,
        padding: '10px 20px',
      }}
      onClick={highlight}
    >
      {props.index}
    </div>
  );
};

export const Basic = () => {
  const state = useNavigation();

  return (
    <>
      <button onClick={state.prev}>☝</button>
      <button onClick={state.next}>👇</button>
      <button onClick={state.first}>☝☝</button>
      <button onClick={state.last}>👇👇</button>
      <button onClick={state.reset}>🔃</button>
      <NavigationProvider {...state}>
        <NavigationItem index={0} />
        <NavigationItem index={1} />
        <NavigationItem index={2} />
        <NavigationItem index={3} />
        <NavigationItem index={4} />
        <NavigationItem index={5} />
      </NavigationProvider>
    </>
  );
};

export const Cycle = () => {
  const state = useNavigation({ cycle: true });

  return (
    <>
      <button onClick={state.prev}>☝</button>
      <button onClick={state.next}>👇</button>
      <button onClick={state.first}>☝☝</button>
      <button onClick={state.last}>👇👇</button>
      <button onClick={state.reset}>🔃</button>
      <NavigationProvider {...state}>
        <NavigationItem index={0} />
        <NavigationItem index={1} />
        <NavigationItem index={2} />
        <NavigationItem index={3} />
        <NavigationItem index={4} />
        <NavigationItem index={5} />
      </NavigationProvider>
    </>
  );
};

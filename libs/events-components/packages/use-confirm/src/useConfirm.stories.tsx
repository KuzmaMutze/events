import { Button } from '@events-components/button';
import {
  ConfirmOptions,
  ConfirmProvider,
  useConfirm,
} from '@events-components/use-confirm';

export default {
  title: 'Hooks/useConfirm',
};

export const Basic = () => {
  const Child = () => {
    const confirm = useConfirm();

    return (
      <Button
        colorScheme="green"
        onClick={() =>
          confirm({
            title: 'Do something?',
            description:
              'Are you sure you want to do something, this action cannot be undone?',
          })
        }
      >
        Open
      </Button>
    );
  };

  return (
    <ConfirmProvider>
      <Child />
    </ConfirmProvider>
  );
};

export const CustomButtons = () => {
  const Child = () => {
    const confirm = useConfirm();

    const description =
      'Delivers straightforward defense-in-depth against complex and advanced threats with no additional overheads. Automation features ensure that incidents are dealt with swiftly and simplified root cause analysis helps reveal the true scope of the threat so you can act accordingly, all with an easy-to-use toolkit.';
    const title = 'Your Quote has been sucessfully ordered';

    const confirmOpts: ConfirmOptions = {
      title,
      description,
      confirmButtonText: 'Agree',
      cancelButtonText: 'Disagree',
      confirmButtonProps: { style: { background: 'orange' } },
      cancelButtonProps: { style: { background: 'gray' } },
      onCancel: () => {
        alert('You clicked disagree');
      },
      onConfirm: () => {
        alert('You clicked agree');
      },
    };

    return (
      <Button colorScheme="green" onClick={() => confirm(confirmOpts)}>
        Open
      </Button>
    );
  };

  return (
    <ConfirmProvider>
      <Child />
    </ConfirmProvider>
  );
};

export const Multiple = () => {
  const Child = () => {
    const confirm = useConfirm();

    return (
      <Button
        colorScheme="green"
        onClick={() => {
          confirm({
            title: 'Do something?',
            description:
              'Are you sure you want to do something, this action cannot be undone?',
          });
          confirm({
            title: 'Do something more?',
            description:
              'Are you sure you want to do something, this action cannot be undone?',
          });
        }}
      >
        Open
      </Button>
    );
  };

  return (
    <ConfirmProvider>
      <Child />
    </ConfirmProvider>
  );
};

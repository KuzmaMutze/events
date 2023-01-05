import { useCallback } from 'react';
import { fullProfileAtom } from '@/atoms/atoms';
import { Button } from '@events-components/button';
import { Group } from '@events-components/group';
import { useConfirm } from '@events-components/use-confirm';
import { useResetProfileToDefault } from '@ngi/react';
import { useNavigate } from 'react-router-dom';

export const ButtonsGroup = () => {
  const resetProfile = useResetProfileToDefault(fullProfileAtom);

  const navigate = useNavigate();

  const confirm = useConfirm();
  const confirmAndReset = useCallback(() => {
    confirm({
      title: 'Confirmation Title',
      description: 'Action Confirmation Helper Text',
      onConfirm: () => {
        resetProfile();
      },
    });
  }, []);

  return (
    <Group>
      <Button onClick={() => navigate(-1)} colorScheme="blue">
        Close
      </Button>
      <Button onClick={confirmAndReset} colorScheme="red">
        Reset settings
      </Button>
    </Group>
  );
};

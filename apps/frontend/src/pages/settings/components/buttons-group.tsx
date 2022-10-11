import { useConfirm, ButtonGroup, Button } from '@events/events-ui';
import { fullProfileAtom } from '@/atoms/atoms';
import { useResetProfileToDefault } from '@ngi/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const ButtonsGroup = () => {
  const resetProfile = useResetProfileToDefault(fullProfileAtom);

  const navigate = useNavigate();

  const confirm = useConfirm();
  const confirmAndReset = useCallback(() => {
    confirm({
      title: 'Confirmation Title',
      message: 'Action Confirmation Helper Text',
      onConfirm: () => {
        resetProfile();
      },
    });
  }, []);

  return (
    <ButtonGroup>
      <Button onClick={() => navigate(-1)} colorScheme="telegram">
        Close
      </Button>
      <Button onClick={confirmAndReset} colorScheme="orange">
        Reset settings
      </Button>
    </ButtonGroup>
  );
};

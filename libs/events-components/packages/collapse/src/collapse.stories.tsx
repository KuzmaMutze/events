import { useState } from 'react';
import { Button } from '@events-components/button';
import { Collapse } from '@events-components/collapse';
import { styled } from '@events-components/theme';

export default {
  title: 'Layout/Collapse',
  component: Collapse,
};

const Container = styled('div', {
  width: '500px',
  margin: '$16',
});

const CollapseButton = styled(Button, {
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  width: '100%',
});

export const CollapseContainer = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Container>
      <Collapse startingHeight={200} isOpen={open}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt,
        dolores magni! Recusandae tempore dicta rerum corrupti nemo libero
        reiciendis quisquam esse commodi consequuntur. Unde neque maxime, quo
        expedita doloribus sequi! Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Nesciunt, dolores magni! Recusandae tempore dicta
        rerum corrupti nemo libero reiciendis quisquam esse commodi
        consequuntur. Unde neque maxime, quo expedita doloribus sequi! Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, dolores
        magni! Recusandae tempore dicta rerum corrupti nemo libero reiciendis
        quisquam esse commodi consequuntur. Unde neque maxime, quo expedita
        doloribus sequi! Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Nesciunt, dolores magni! Recusandae tempore dicta rerum corrupti
        nemo libero reiciendis quisquam esse commodi consequuntur. Unde neque
        maxime, quo expedita doloribus sequi! Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Nesciunt, dolores magni! Recusandae
        tempore dicta rerum corrupti nemo libero reiciendis quisquam esse
        commodi consequuntur. Unde neque maxime, quo expedita doloribus sequi!
        doloribus sequi! Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Nesciunt, dolores magni! Recusandae tempore dicta rerum corrupti
        nemo libero reiciendis quisquam esse commodi consequuntur. Unde neque
        maxime, quo expedita doloribus sequi! Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Nesciunt, dolores magni! Recusandae
        tempore dicta rerum corrupti nemo libero reiciendis quisquam esse
        commodi consequuntur. Unde neque maxime, quo expedita doloribus sequi!
      </Collapse>
      <CollapseButton onClick={toggleOpen}>Open</CollapseButton>
    </Container>
  );
};

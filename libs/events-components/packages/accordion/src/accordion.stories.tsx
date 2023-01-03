import { styled } from '@stitches/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@events-components/accordion';
import { RightMiniIcon } from '@events-components/icons';

export default {
  title: 'Layout/Accordion',
  component: Accordion,
};

const Container = styled('div', {
  maxWidth: 300,
  margin: '24px',
});

export const Basic = () => {
  return (
    <Container>
      <Accordion>
        <AccordionSummary>Accordion 2</AccordionSummary>
        <AccordionDetails>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
            deserunt corporis debitis ipsam placeat voluptate eveniet officiis
            fugit ratione, aspernatur enim qui, dolorem iure! Omnis, iure optio.
            Saepe, ab suscipit.
          </p>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export const Divider = () => {
  return (
    <Container>
      <Accordion>
        <AccordionSummary divider>Accordion 2</AccordionSummary>
        <AccordionDetails>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
            deserunt corporis debitis ipsam placeat voluptate eveniet officiis
            fugit ratione, aspernatur enim qui, dolorem iure! Omnis, iure optio.
            Saepe, ab suscipit.
          </p>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export const IconPosition = () => {
  return (
    <>
      <Container>
        <Accordion>
          <AccordionSummary iconSide="left">Accordion 2</AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              deserunt corporis debitis ipsam placeat voluptate eveniet officiis
              fugit ratione, aspernatur enim qui, dolorem iure! Omnis, iure
              optio. Saepe, ab suscipit.
            </p>
          </AccordionDetails>
        </Accordion>
      </Container>
      <Container>
        <Accordion>
          <AccordionSummary iconSide="right">Accordion 2</AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              deserunt corporis debitis ipsam placeat voluptate eveniet officiis
              fugit ratione, aspernatur enim qui, dolorem iure! Omnis, iure
              optio. Saepe, ab suscipit.
            </p>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
};

export const IconCustom = () => {
  return (
    <Container>
      <Accordion>
        <AccordionSummary
          closeIcon={<RightMiniIcon />}
          openIcon={<RightMiniIcon style={{ transform: 'rotate(90deg)' }} />}
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
            deserunt corporis debitis ipsam placeat voluptate eveniet officiis
            fugit ratione, aspernatur enim qui, dolorem iure! Omnis, iure optio.
            Saepe, ab suscipit.
          </p>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export const ColorsSchemes = () => {
  return (
    <>
      <Container>
        <Accordion colorScheme="gray">
          <AccordionSummary>Gray</AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              deserunt corporis debitis ipsam placeat voluptate eveniet officiis
              fugit ratione, aspernatur enim qui, dolorem iure! Omnis, iure
              optio. Saepe, ab suscipit.
            </p>
          </AccordionDetails>
        </Accordion>
      </Container>
      <Container>
        <Accordion colorScheme="white">
          <AccordionSummary>white</AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              deserunt corporis debitis ipsam placeat voluptate eveniet officiis
              fugit ratione, aspernatur enim qui, dolorem iure! Omnis, iure
              optio. Saepe, ab suscipit.
            </p>
          </AccordionDetails>
        </Accordion>
      </Container>
      <Container>
        <Accordion colorScheme="transparent">
          <AccordionSummary>transparent</AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              deserunt corporis debitis ipsam placeat voluptate eveniet officiis
              fugit ratione, aspernatur enim qui, dolorem iure! Omnis, iure
              optio. Saepe, ab suscipit.
            </p>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
};

export const DefaultOpened = () => {
  return (
    <Container>
      <Accordion defaultIsOpen color="transparent">
        <AccordionSummary iconSide="left">Accordion 1</AccordionSummary>
        <AccordionDetails>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
            deserunt corporis debitis ipsam placeat voluptate eveniet officiis
            fugit ratione, aspernatur enim qui, dolorem iure! Omnis, iure optio.
            Saepe, ab suscipit.
          </p>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

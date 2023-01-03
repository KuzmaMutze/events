import { CSS, styled } from './theme';

export default {
  title: 'Misc/Theme',
};

const ColorCardBox = styled('div', {
  width: '100px',
  height: '100px',
  borderRadius: '40px',
  border: '1px solid rgba(29, 54, 83, 0.17)',
});

const ColorCardContainer = styled('div', {
  display: 'grid',
  justifyItems: 'center',
  gridAutoFlow: 'row',
  padding: '$16',
});

const ColorCardText = styled('p', {
  wordWrap: 'break-word',
  padding: '$4',
  textAlign: 'center',
  fontWeight: '$semibold',
});

const ColorCard = (props: {
  color?: CSS['color'];
  shadow?: CSS['boxShadow'];
  gradient?: CSS['color'];
  title: string;
}) => {
  return (
    <ColorCardContainer>
      <ColorCardBox
        css={{
          backgroundColor: props.color,
          boxShadow: props.shadow,
          background: props.gradient,
        }}
      ></ColorCardBox>
      <ColorCardText>{props.title}</ColorCardText>
    </ColorCardContainer>
  );
};

const Row = styled('div', {
  display: 'flex',
  gap: '$12',
});
const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '200vh',
});

export const Colors = () => {
  return (
    <>
      <Row>
        <ColorCard color="$green" title="Green" />
        <ColorCard color="$darkGreen" title="Darn Green" />
        <ColorCard color="$teal" title="Teal" />
        <ColorCard color="$energyGreen" title="Energy Green" />
        <ColorCard color="$black" title="Black" />
        <ColorCard color="$white" title="White" />
      </Row>
      <Row>
        <ColorCard color="$gray1" title="Gray 1" />
        <ColorCard color="$gray2" title="Gray 2" />
        <ColorCard color="$gray3" title="Gray 3" />
        <ColorCard color="$gray4" title="Gray 4" />
        <ColorCard color="$gray5" title="Gray 5" />
        <ColorCard color="$gray6" title="Gray 6" />
        <ColorCard color="$gray7" title="Gray 7" />
        <ColorCard color="$gray8" title="Gray 8" />
      </Row>
      <Row>
        <ColorCard color="$energyRed" title="Energy Red" />
        <ColorCard color="$eneryRedHover" title="Energy Red Hover" />
        <ColorCard color="$precisionSalmon" title="Precision Salmon" />
        <ColorCard color="$energyYellow" title="Energy Yellow" />
        <ColorCard color="$precisionYellow" title="Precision Yellow" />
        <ColorCard color="$lightBlue" title="Light Blue" />
        <ColorCard color="$precisionLightBlue" title="Precision Light Blue" />
      </Row>
      <Row>
        <ColorCard
          gradient="$gradientEnergyGreen"
          title="gradientEnergyGreen"
        />
        <ColorCard gradient="$gradientYellow" title="gradientYellow" />
        <ColorCard gradient="$gradientGreen" title="gradientGreen" />
        <ColorCard gradient="$gradientRed" title="gradientRed" />
        <ColorCard gradient="$gradientDartGreen" title="gradientDartGreen" />
      </Row>
      <Row>
        <ColorCard gradient="$gradient1" title="gradient1" />
        <ColorCard gradient="$gradient2" title="gradient2" />
        <ColorCard gradient="$gradient3" title="gradient3" />
        <ColorCard gradient="$gradient4" title="gradient4" />
        <ColorCard gradient="$gradient5" title="gradient5" />
      </Row>
    </>
  );
};

export const Shadow = () => {
  return (
    <>
      <Row>
        <ColorCard shadow="$100" title="100" />
        <ColorCard shadow="$300" title="300" />
        <ColorCard shadow="$500" title="500" />
        <ColorCard shadow="$700" title="700" />
        <ColorCard shadow="$buttonDark" title="Button Dark" />
        <ColorCard shadow="$buttonDarkHover" title="Button Dark Hover" />
      </Row>
      <Row>
        <ColorCard shadow="$gray" title="Gray" />
        <ColorCard shadow="$grayHover" title="Gray Hover" />
        <ColorCard shadow="$grayLight" title="Gray Light" />
        <ColorCard shadow="$menu" title="Menu" />
      </Row>
    </>
  );
};

export const Scrollbar = () => {
  return (
    <>
      <Column>
        <ColorCard shadow="$gray" title="Gray" />
      </Column>
    </>
  );
};

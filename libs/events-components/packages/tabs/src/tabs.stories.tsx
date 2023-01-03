import { useRef, useState } from 'react';
import { Button } from '@events-components/button';
import { Group } from '@events-components/group';
import { Input } from '@events-components/input';
import { Popup } from '@events-components/popup';
import {
  AddTabButton,
  TabButton,
  TabPanel,
  TabPanels,
  Tabs,
  TabsList,
} from '@events-components/tabs';
import { styled } from '@events-components/theme';

export default {
  title: 'Controls/Tabs',
  component: Tabs,
};

export const Basic = () => {
  return (
    <Tabs>
      <TabsList>
        <TabButton>First</TabButton>
        <TabButton>Second</TabButton>
        <TabButton>Third</TabButton>
        <AddTabButton newTabText="New Tab" />
      </TabsList>
      <TabPanels>
        <TabPanel>First content</TabPanel>
        <TabPanel>Second content</TabPanel>
        <TabPanel>Third content</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const LongTabName = () => {
  return (
    <Tabs>
      <TabsList>
        <TabButton>Lorem ipsum dolor sit amet.</TabButton>
        <TabButton>
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </TabButton>
        <TabButton>Third</TabButton>
        <AddTabButton newTabText="New Tab" />
      </TabsList>
      <TabPanels>
        <TabPanel>First content</TabPanel>
        <TabPanel>Second content</TabPanel>
        <TabPanel>Third content</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const KeepMounted = () => {
  return (
    <Tabs keepMounted>
      <TabsList>
        <TabButton>First</TabButton>
        <TabButton>Second</TabButton>
        <TabButton>Third</TabButton>
      </TabsList>
      <TabPanels>
        <TabPanel>First content</TabPanel>
        <TabPanel>Second content</TabPanel>
        <TabPanel>Third content</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const Controlled = () => {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <button onClick={() => setSelected((s) => (s > 0 ? s - 1 : s))}>
        👈
      </button>
      <button onClick={() => setSelected((s) => (s < 2 ? s + 1 : s))}>
        👉
      </button>
      <Tabs activeTabIndex={selected} onTabChange={setSelected}>
        <TabsList>
          <TabButton>First</TabButton>
          <TabButton>Second</TabButton>
          <TabButton>Third</TabButton>
        </TabsList>
        <TabPanels>
          <TabPanel>First content</TabPanel>
          <TabPanel>Second content</TabPanel>
          <TabPanel>Third content</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

const CustomTabButton = styled(TabButton, {
  background: '$darkGreen',
  color: '$white',
});

const CustomTabPanel = styled(TabPanel, {
  background: '$green',
  color: '$white',
  padding: '$32',
});

export const Custom = () => {
  return (
    <Tabs>
      <TabsList>
        <CustomTabButton>First</CustomTabButton>
        <CustomTabButton>Second</CustomTabButton>
        <CustomTabButton>Third</CustomTabButton>
      </TabsList>
      <TabPanels>
        <CustomTabPanel>First content</CustomTabPanel>
        <CustomTabPanel>Second content</CustomTabPanel>
        <CustomTabPanel>Third content</CustomTabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const Edit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toggle = () => {
    setIsOpen((p) => !p);
  };
  return (
    <Tabs>
      <TabsList>
        <TabButton>First</TabButton>
        <TabButton>Second</TabButton>
        <TabButton onEdit={toggle} ref={buttonRef}>
          Third
          <Popup
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            anchorRef={buttonRef}
            placement="bottom-end"
          >
            <Input />
            <Group>
              <Button>Button 1</Button>
              <Button>Button 2</Button>
            </Group>
          </Popup>
        </TabButton>
        <AddTabButton newTabText="New Tab" />
      </TabsList>
      <TabPanels>
        <TabPanel>First content</TabPanel>
        <TabPanel>Second content</TabPanel>
        <TabPanel>Third content</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { Text } from 'react-native';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot />
      <TabList>
        <TabTrigger name="home" href="/">
          <Text>Inicio</Text>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

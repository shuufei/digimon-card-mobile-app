import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';
import { LogBox } from 'react-native';
export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

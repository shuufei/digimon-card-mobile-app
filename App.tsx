import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

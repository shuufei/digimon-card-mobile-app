import Amplify from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { AWSConfig } from './src/aws-exports';
import { Navigation } from './src/navigation';
import { store } from './src/store';

Amplify.configure(AWSConfig);

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

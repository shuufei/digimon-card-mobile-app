import { View, Text, Input, Button } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { Auth, API } from 'aws-amplify';
import { useEffect, useState } from 'react';

export const SignInScreen = () => {
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const checkSignedIn = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setSignedIn(true);
      } catch (error) {
        setSignedIn(false);
      }
    };
    checkSignedIn();
  }, []);

  const { control, getValues, setValue } = useForm<{
    username: string;
    password: string;
  }>();

  return (
    <View>
      <Text>Sign In</Text>
      <Text>{isSignedIn ? 'サインイン済み' : '未サインイン'}</Text>
      <View p="3">
        <Controller
          control={control}
          name="username"
          defaultValue=""
          render={({ field }) => {
            return (
              <>
                <Input
                  w="100%"
                  placeholder="ユーザ名"
                  fontSize={16}
                  fontWeight="semibold"
                  backgroundColor="white"
                  _focus={{ borderColor: 'gray.500' }}
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
              </>
            );
          }}
        />
        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ field }) => {
            return (
              <>
                <Input
                  w="100%"
                  placeholder="パスワード"
                  fontSize={16}
                  fontWeight="semibold"
                  backgroundColor="white"
                  _focus={{ borderColor: 'gray.500' }}
                  mt="2"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
              </>
            );
          }}
        />
      </View>
      <View px="3" mt="4">
        <Button
          onPress={async () => {
            const username = getValues('username');
            const password = getValues('password');
            const res = await Auth.signIn(username, password);
            setSignedIn(true);
            console.log('--- sign in res: ', res);
          }}
        >
          SignIn
        </Button>
        <Button
          mt="2"
          onPress={async () => {
            Auth.signOut();
            setSignedIn(false);
            console.log('--- sign out');
          }}
        >
          SignOut
        </Button>
        <Button
          mt="3"
          onPress={async () => {
            const creds = await Auth.currentAuthenticatedUser();
            console.log('--- creds: ', creds, typeof creds);
          }}
        >
          Confirm Current User
        </Button>
        <Button
          mt="3"
          onPress={async () => {
            try {
              const res = await API.get('v1', '/v1/credentials', {});
              console.log('--- qs: ', res);
            } catch (error) {
              console.log('--- error: ', error);
            }
          }}
        >
          Get QueryStrings
        </Button>
      </View>
    </View>
  );
};

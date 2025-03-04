import {
  useAuthenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react-native';
import { FlashList } from '@shopify/flash-list';
import { Amplify } from 'aws-amplify';
import React from 'react';
import { format } from 'timeago.js';

import { useUsers } from '@/api';
import { Button, FocusAwareStatusBar, Text, View } from '@/components/ui';

import outputs from '../../amplify_outputs.json';
Amplify.configure(outputs);

function Admin() {
  // const router = useRouter();
  const { data, isPending, isError } = useUsers();
  // const signIn = useAuth.use.signIn();
  const { signOut } = useAuthenticator();

  console.log('data', data);
  console.log('pending, ', isPending, isError);

  const stringValue = isPending ? 'Loading...' : data?.length;
  const onSubmit = () => {
    signOut();
    // router.push('/');
  };
  return (
    <>
      <FocusAwareStatusBar />

      <FlashList
        ListHeaderComponent={
          <Text
            className="p-3 pl-2 text-3xl"
            children={`Total Registrations: ${stringValue}`}
          ></Text>
        }
        data={data}
        ItemSeparatorComponent={() => (
          <View className="h-[.5px] bg-slate-300" />
        )}
        renderItem={({ item }) => {
          return (
            <View className="border-2-white p-2">
              <Text children={item.email} />
              <Text children={item.country} />
              <Text children={item.zip} />
              <Text children={format(new Date(item.createdAt ?? ''))} />
            </View>
          );
        }}
        ListEmptyComponent={<Text children={'No one has registered yet'} />}
        ListFooterComponent={() => (
          <View className="p-3">
            <Button label="Logout" className="max-w-md" onPress={onSubmit} />
          </View>
        )}
      />
    </>
  );
}

export default withAuthenticator(Admin, {
  components: { SignUp: () => null },
});

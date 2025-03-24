import { type Schema } from 'amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

import { Text, View } from '@/components/ui';
import { translate, useSelectedLanguage } from '@/lib';

type ConfirmationState = {
  status: 'loading' | 'success' | 'error';
  message: string;
};

// eslint-disable-next-line max-lines-per-function
export function ConfirmScreen() {
  const { code } = useLocalSearchParams();
  const router = useRouter();
  const { language } = useSelectedLanguage();
  const client = generateClient<Schema>();
  const [state, setState] = React.useState<ConfirmationState>({
    status: 'loading',
    message: translate('confirm.loading'),
  });

  React.useEffect(() => {
    const confirmSubscription = async () => {
      if (!code || typeof code !== 'string') {
        setState({
          status: 'error',
          message: translate('confirm.invalidCode'),
        });
        return;
      }

      try {
        const result = await client.mutations.confirmNewsletter({
          confirmationCode: code,
        });

        console.log('result', JSON.stringify(result, null, 2));
        if (result.data?.success) {
          setState({
            status: 'success',
            message: translate('confirm.success'),
          });
          // Redirect to home after 3 seconds
          setTimeout(() => {
            router.replace('/');
          }, 3000);
        } else {
          setState({
            status: 'error',
            message: result.data?.message || translate('confirm.error'),
          });
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        setState({
          status: 'error',
          message: translate('confirm.error'),
        });
      }
    };

    confirmSubscription();
  }, [code, client, router]);

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <View className="w-full max-w-md rounded-lg bg-neutral-100 p-6 shadow-lg">
        <Text
          className={`text-center text-lg ${
            state.status === 'error'
              ? 'text-red-600'
              : state.status === 'success'
                ? 'text-green-600'
                : 'text-neutral-800'
          }`}
        >
          {state.message}
        </Text>
      </View>
    </View>
  );
}

export default ConfirmScreen;

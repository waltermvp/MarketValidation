import { type Schema } from 'amplify/data/resource';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { Text, View } from '@/components/ui';
import { translate } from '@/lib';

import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs);
type ConfirmationState = 'loading' | 'success' | 'error';

// eslint-disable-next-line max-lines-per-function
export function ConfirmScreen() {
  const { code } = useLocalSearchParams();
  const client = generateClient<Schema>();
  const [state, setState] = React.useState<ConfirmationState>('loading');
  const [message, setMessage] = React.useState<string>(
    translate('confirm.loading')
  );

  React.useEffect(() => {
    const confirmSubscription = async () => {
      if (!code || typeof code !== 'string') {
        setState('error');
        setMessage(translate('confirm.invalidCode'));
        return;
      }

      try {
        const result = await client.mutations.confirmNewsletter({
          confirmationCode: code,
        });

        console.log('result', JSON.stringify(result, null, 2));
        if (result.data?.success) {
          setState('success');
          setMessage(translate('confirm.success'));
        } else {
          setState('error');
          setMessage(result.data?.message || translate('confirm.error'));
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        setState('error');
        setMessage(translate('confirm.error'));
      }
    };

    confirmSubscription();
  }, [code, client]);

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <View className="w-full max-w-md rounded-lg bg-neutral-100 p-6 shadow-lg">
        <Text
          className={`text-center text-lg ${
            state === 'error'
              ? 'text-red-600'
              : state === 'success'
                ? 'text-green-600'
                : 'text-neutral-800'
          }`}
        >
          {message}
        </Text>
      </View>
    </View>
  );
}

export default ConfirmScreen;

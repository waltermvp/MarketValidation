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
  const hasConfirmed = React.useRef(false);

  React.useEffect(() => {
    const confirmSubscription = async () => {
      // Prevent multiple confirmation attempts
      if (hasConfirmed.current) {
        return;
      }

      if (!code || typeof code !== 'string') {
        console.log('Invalid code detected:', code);
        setState('error');
        setMessage(translate('confirm.invalidCode'));
        return;
      }

      try {
        console.log('Making confirmation request for code:', code);
        const result = await client.mutations.confirmNewsletter({
          confirmationCode: code,
        });
        console.log('Confirmation response:', result);

        if (result.data?.success) {
          console.log('Setting success state');
          hasConfirmed.current = true; // Mark as confirmed
          setState('success');
          setMessage(translate('confirm.success'));
        } else {
          console.log('Setting error state from unsuccessful response');
          setState('error');
          setMessage(result.data?.message || translate('confirm.error'));
        }
      } catch (error) {
        console.log('Error caught during confirmation:', error);
        setState('error');
        setMessage(translate('confirm.error'));
      }
    };

    confirmSubscription();
  }, [code, client]);

  console.log('Rendering with state:', state, 'message:', message);

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

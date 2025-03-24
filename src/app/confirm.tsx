import { type Schema } from 'amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { translate, useSelectedLanguage } from '@/lib';

export default function ConfirmScreen() {
  const { code } = useLocalSearchParams();
  const router = useRouter();
  const { language } = useSelectedLanguage();
  const client = generateClient<Schema>();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmSubscription = async () => {
      if (!code || typeof code !== 'string') {
        setStatus('error');
        setMessage(translate('confirm.invalidCode'));
        return;
      }

      try {
        const result = await client.mutations.confirmNewsletter({
          confirmationCode: code,
        });

        if (result.data?.success) {
          setStatus('success');
          setMessage(translate('confirm.success'));
          // Redirect to home after 3 seconds
          setTimeout(() => {
            router.replace('/');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(result.data?.message || translate('confirm.error'));
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        setStatus('error');
        setMessage(translate('confirm.error'));
      }
    };

    confirmSubscription();
  }, [code, client, router]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {status === 'loading' && (
          <Text style={styles.message}>{translate('confirm.loading')}</Text>
        )}
        {status === 'success' && <Text style={styles.message}>{message}</Text>}
        {status === 'error' && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
});

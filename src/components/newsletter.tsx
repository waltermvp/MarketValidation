import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Button, Input, Text } from '@/components/ui';

// eslint-disable-next-line max-lines-per-function
export const Newsletter = ({
  title,
  subtitle,
  callBack,
  placeholder,
  buttonText,
  successMessage,
  errorMessage,
}: {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
  errorMessage: string;
  callBack: (email: string) => Promise<void>;
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('newsletterSubscribed') === 'true';
    }
    return false;
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await callBack(email);
      setSuccess(true);
      localStorage.setItem('newsletterSubscribed', 'true');
    } catch (error) {
      // Handle error if needed
    }
    setLoading(false);
  };

  return (
    <View className="w-full px-6 py-12">
      <View className="mx-auto max-w-2xl text-center">
        <Text className="text-4xl font-bold tracking-tight text-white ">
          {title}
        </Text>
        <Text className="mt-4 text-lg leading-8 text-white">{subtitle}</Text>

        <View className="mt-6 flex flex-row space-x-2">
          {success ? (
            <Animated.View
              entering={FadeIn.duration(400)}
              className="flex-1 flex-row items-center justify-center space-x-2"
            >
              <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
              <Text className="text-green-500">{successMessage}</Text>
            </Animated.View>
          ) : (
            <>
              <Input
                error={errorMessage}
                errorClassName="text-neutral-200 dark:text-neutral-200"
                className="flex-1 rounded-md border border-neutral-700 bg-neutral-800 p-3 text-white"
                placeholder={placeholder}
                autoComplete="email"
                keyboardType="email-address"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                onSubmitEditing={handleSubmit}
              />
              <Button
                label={buttonText}
                loading={loading}
                onPress={handleSubmit}
                className="bg-neutral-200 !text-white"
                textClassName="text-primary-main"
                // activityIndicatorColor={colors.primary[500]}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

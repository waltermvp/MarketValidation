import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Button, Input, Text } from '@/components/ui';
import { translate } from '@/lib';

const height = 44;
// eslint-disable-next-line max-lines-per-function
export const Newsletter = ({
  title,
  subtitle,
  callBack,
  placeholder,
  zipPlaceholder,
  buttonText,
  successMessage,
  errorMessage: initialErrorMessage,
}: {
  title: string;
  subtitle: string;
  placeholder: string;
  zipPlaceholder: string;
  buttonText: string;
  successMessage: string;
  errorMessage: string | null;
  callBack: (email: string, country?: string, zip?: string) => Promise<void>;
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const localState = localStorage.getItem('newsletterSubscribed');
      if (localState) {
        console.log(localState, 'localState');

        return localState === 'true';
      }
    }
    return false;
  });
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(
    initialErrorMessage
  );
  const countries = ['USA', 'Canada', 'UK', 'Australia'];

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage(translate('home.invalidEmail'));
      setLoading(false);
      return;
    }

    try {
      await callBack(email, country, zipCode);
      setSuccess(true);
      localStorage.setItem('newsletterSubscribed', 'true');
    } catch (error) {
      // Handle error if needed
    }
    setLoading(false);
  };

  console.log(window.innerWidth, 'innerWdiths');
  return (
    <View className={` border border-red-500`}>
      <View className=" border border-blue-500 px-2 pt-14">
        <Text
          children={title}
          className="px-16 text-center text-3xl font-bold text-white "
        />
        <Text
          className="mt-4 px-20 text-center text-2xl text-white"
          children={subtitle}
        />
        {success ? (
          <Animated.View
            entering={FadeIn.duration(1000)}
            // className=" flex-row items-center justify-center space-x-2"
            className={`flex ${window.innerWidth < 640 ? 'mt-5 flex-col' : 'flex-row'} space-x-2, w-full items-center justify-center self-center border border-green-500`}
          >
            <Ionicons name="checkmark-circle" size={48} color="#22c55e" />
            <Text className="font-semibold text-white">
              {successMessage ? successMessage : translate('home.success')}
            </Text>
          </Animated.View>
        ) : (
          <View
            className={`${window.innerWidth < 640 ? 'flex-col' : 'flex-row'} h-48 items-center justify-center  border border-yellow-500  align-middle`}
          >
            <View
              className={`${window.innerWidth < 640 ? `flex-col` : `flex-row`} mr-2 items-center justify-evenly border border-yellow-500`}
            >
              <Input
                error={errorMessage}
                // errorClassName="text-neutral-200 dark:text-neutral-200"
                className=" rounded-md border border-neutral-700 bg-neutral-800 p-3 text-white"
                placeholder={placeholder}
                autoComplete="email"
                keyboardType="email-address"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                onSubmitEditing={handleSubmit}
              />
              <Picker
                style={{
                  marginTop: -8,
                  padding: window.innerWidth >= 640 ? 12 : undefined,
                }}
                selectedValue={country}
                onValueChange={(itemValue) => setCountry(itemValue)}
                className="rounded-md border border-neutral-700 bg-neutral-800 text-white"
              >
                <Picker.Item label={translate('home.selectCountry')} value="" />
                {countries.map((country) => (
                  <Picker.Item key={country} label={country} value={country} />
                ))}
              </Picker>
              <Input
                className="rounded-md border border-neutral-700 bg-neutral-800 p-3 text-white"
                placeholder={zipPlaceholder}
                value={zipCode}
                onChangeText={setZipCode}
                style={{ height }} // Set a fixed height
                keyboardType="numeric"
              />
            </View>
            <Button
              label={buttonText}
              loading={loading}
              onPress={handleSubmit}
              className="max-w-ss7  mt-0 h-[44px] self-center !bg-danger-999"
            >
              <Text className="text-lg font-bold text-white">{buttonText}</Text>
              <Ionicons
                size={28}
                name="chevron-forward-sharp"
                color={'white'}
              />
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

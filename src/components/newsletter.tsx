import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Button, colors, Input, Text } from '@/components/ui';
import { translate } from '@/lib';

const height = 44;
const breakpoint = 784;
// eslint-disable-next-line max-lines-per-function
export const Newsletter = ({
  title,
  // subtitle,
  callBack,
  placeholder,
  zipPlaceholder,
  buttonText,
  successMessage,
  errorMessage: initialErrorMessage,
}: {
  title: string;
  // subtitle: string;
  placeholder: string;
  zipPlaceholder: string;
  buttonText: string;
  successMessage: string;
  errorMessage: string | null;
  callBack: (email: string, country?: string, zip?: string) => Promise<void>;
}) => {
  const { width } = useWindowDimensions();
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

  return (
    <View className={`mt-4 flex-1 xs:mt-12`}>
      <View className="my-14 px-2">
        <Text
          children={title}
          className="px-16 text-center font-netflix-bold text-3xl !text-primary-500 md:text-4xl"
        />
        <Text className="mt-4 max-w-7xl self-center px-20 text-center text-lg text-white">
          <Text className=" font-netflix-light text-lg text-white">
            {translate('home.CTA1')}
          </Text>
          <Text className="font-netflix-bold text-lg text-primary-500">
            {translate('appname')}
          </Text>
          <Text className="font-netflix-light text-lg text-white">
            {translate('home.CTA2')}
          </Text>
        </Text>

        {success ? (
          <Animated.View
            entering={FadeIn.duration(1000)}
            // className=" flex-row items-center justify-center space-x-2"
            className={`flex ${width < breakpoint ? 'mt-5 flex-col' : 'flex-row'} space-x-2, mt-8 w-full items-center justify-center self-center`}
          >
            <Ionicons
              name="checkmark-circle"
              size={48}
              color={colors.primary[550]}
            />
            <Text className="ml-4 font-netflix-regular text-2xl text-white">
              {successMessage ? successMessage : translate('home.success')}
            </Text>
          </Animated.View>
        ) : (
          <View
            className={`${width < breakpoint ? 'mt-4 flex-col' : 'flex-row'} h-48 items-center justify-center align-middle`}
          >
            <View
              className={`${width < breakpoint ? `mt-8 flex-col gap-4` : `flex-row gap-4`} mr-2 items-center justify-evenly`}
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
                  // padding: 200, //width >= breakpoint ? 120 : 100,
                  height: width >= breakpoint ? 44 : 44,
                  width: 200,
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
              className="max-w-ss7  mt-0 h-[44px] self-center !bg-primary-550"
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

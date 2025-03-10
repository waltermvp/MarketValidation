import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Button, colors, Input, Text } from '@/components/ui';
import { translate } from '@/lib';

import countries from '../../assets/countries.json';

// Update the Country type to match the JSON structure
type Country = {
  name: {
    common: string;
    official: string;
  };
  cca2: string; // This is the country code in the JSON
};

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
  callBack: (email: string, country: string, zip: string) => Promise<void>;
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

  // Sort countries alphabetically by name
  const sortedCountries = countries.sort((a: Country, b: Country) =>
    a.name.common.localeCompare(b.name.common)
  );

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage(translate('home.invalidEmail'));
      setLoading(false);
      return;
    }

    // Add validation for country and zip
    if (!country) {
      setErrorMessage(translate('home.selectCountry'));
      setLoading(false);
      return;
    }

    if (!zipCode) {
      setErrorMessage(translate('home.enterZipCode'));
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
    <View className={`mt-4 flex-1 items-center xs:mt-12`}>
      <View className="my-14 max-w-5xl px-2">
        <Text
          children={title}
          className="px-16 text-center font-netflix-bold text-4xl !text-primary-500 sm:text-5xl"
        />
        <Text className="mt-4  self-center px-20 text-center text-xl text-white">
          <Text className=" font-netflix-light text-xl text-white">
            {translate('home.CTA1')}
          </Text>
          <Text className="font-netflix-bold text-xl text-primary-500">
            {translate('appName')}
          </Text>
          <Text className="font-netflix-light text-xl text-white">
            {translate('home.CTA2')}
          </Text>
        </Text>

        {success ? (
          <Animated.View
            entering={FadeIn.duration(1000)}
            // className=" flex-row items-center justify-center space-x-2"
            className={`flex ${width < breakpoint ? 'mt-5 flex-col-reverse' : 'flex-row'} space-x-2, mt-8 w-full items-center justify-center self-center`}
          >
            <Ionicons
              name="checkmark-circle"
              size={48}
              color={colors.primary[550]}
            />
            <Text className="ml-4 font-netflix-regular text-3xl text-white">
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
                {sortedCountries.map((country: Country) => (
                  <Picker.Item
                    key={country.cca2}
                    label={country.name.common}
                    value={country.cca2}
                  />
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
              className="max-w-ss7 mt-0  h-[44px]  self-center !bg-primary-550"
            >
              <Text className="text-xl font-bold text-white">{buttonText}</Text>
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

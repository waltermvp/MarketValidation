import React from 'react';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/ui';
import { type Language } from '@/lib/i18n/resources';

interface LanguageSelectorProps {
  currentLang: Language;
  onChangeLang: (lang: Language) => void;
}

export const LanguageSelector = ({
  currentLang,
  onChangeLang,
}: LanguageSelectorProps) => {
  return (
    <View className="right-4 top-4 z-50 flex-row gap-1 rounded-full bg-primary-500 p-1 shadow-lg backdrop-blur-sm">
      <Pressable
        onPress={() => onChangeLang('en')}
        className={`aspect-square rounded-full p-1 transition-all ${
          currentLang === 'en'
            ? 'bg-neutral-200 shadow-sm'
            : 'opacity-50 hover:opacity-75'
        }`}
      >
        <Text
          className={`-mt-0.5  aspect-square self-center bg-transparent text-center font-netflix-regular text-lg ${
            currentLang === 'en' ? '!text-primary-500' : '!text-white'
          }`}
        >
          En
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChangeLang('fr')}
        className={`aspect-square  rounded-full p-1  transition-all ${
          currentLang === 'fr'
            ? 'bg-neutral-200 shadow-sm'
            : 'opacity-50 hover:opacity-75'
        }`}
      >
        <Text
          className={` -mt-0.5 aspect-square self-center bg-transparent  text-center font-netflix-regular text-lg ${
            currentLang === 'fr' ? '!text-primary-500' : '!text-white'
          }`}
        >
          Fr
        </Text>
      </Pressable>
    </View>
  );
};

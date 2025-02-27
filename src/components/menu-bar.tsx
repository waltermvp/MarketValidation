import React from 'react';
import Animated from 'react-native-reanimated';

import { Text, View } from '@/components/ui';
import { type Language } from '@/lib/i18n/resources';

import { LanguageSelector } from './language-selector';

type MenuBarProps = {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
};

export function MenuBar({ lang, onLanguageChange }: MenuBarProps) {
  return (
    <View className="align-center z-50 w-full flex-row items-center justify-between px-4  md:px-6">
      <Animated.View className={'left-4 top-4'}>
        <Text className="font-netflix-bold text-2xl !text-primary-500 sm:text-3xl">
          MapYourHealth
        </Text>
      </Animated.View>
      <LanguageSelector currentLang={lang} onChangeLang={onLanguageChange} />
    </View>
  );
}

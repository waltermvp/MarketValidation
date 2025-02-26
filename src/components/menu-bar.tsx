import React from 'react';
import Animated from 'react-native-reanimated';

import { LanguageSelector } from '@/components/language-selector';
import { Text, View } from '@/components/ui';
import { type Language } from '@/lib/i18n/resources';

type MenuBarProps = {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
};

export function MenuBar({ lang, onLanguageChange }: MenuBarProps) {
  return (
    <View className="align-center z-50 w-full flex-row items-center justify-between px-4  md:px-6">
      <Animated.View className={'left-4 top-4'}>
        <Text className="text-lg font-bold !text-primary-500 xs:text-3xl  sm:text-4xl md:text-5xl">
          MapYourHealth
        </Text>
      </Animated.View>
      <LanguageSelector currentLang={lang} onChangeLang={onLanguageChange} />
    </View>
  );
}

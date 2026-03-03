import React from 'react';
import { Linking, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { LanguageSelector } from '@/components/language-selector';
import { Text, View } from '@/components/ui';
import { type Language } from '@/lib/i18n/resources';

type MenuBarProps = {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
};

export function MenuBar({ lang, onLanguageChange }: MenuBarProps) {
  const handleLaunchApp = () => {
    Linking.openURL('https://app.mapyourhealth.info');
  };

  return (
    <View className="align-center z-50 w-full flex-row items-center justify-between px-4 md:px-6">
      <Animated.View className={'left-4 top-4'}>
        <Text className="font-netflix-bold text-2xl !text-primary-500 sm:text-3xl">
          MapYourHealth
        </Text>
      </Animated.View>

      <View className="flex-row items-center space-x-4">
        <Pressable
          onPress={handleLaunchApp}
          className="rounded-lg bg-primary-550 px-4 py-2"
        >
          <Text className="font-netflix-bold text-base text-white">
            Launch App
          </Text>
        </Pressable>
        <LanguageSelector currentLang={lang} onChangeLang={onLanguageChange} />
      </View>
    </View>
  );
}

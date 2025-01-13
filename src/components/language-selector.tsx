import React from 'react';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/ui';

interface LanguageSelectorProps {
  currentLang: string;
  onChangeLang: (lang: string) => void;
}

export const LanguageSelector = ({
  currentLang,
  onChangeLang,
}: LanguageSelectorProps) => {
  return (
    <View className="right-4 top-4 z-50 flex-row gap-2 rounded-full bg-white/80 p-1 shadow-lg backdrop-blur-sm">
      <Pressable
        onPress={() => onChangeLang('en')}
        className={`rounded-full p-2 transition-all ${
          currentLang === 'en'
            ? 'bg-primary-main/10 shadow-sm'
            : 'opacity-50 hover:opacity-75'
        }`}
      >
        <Text className="text-lg">🇺🇸</Text>
      </Pressable>
      <Pressable
        onPress={() => onChangeLang('es')}
        className={`rounded-full p-2 transition-all ${
          currentLang === 'es'
            ? 'bg-primary-main/10 shadow-sm'
            : 'opacity-50 hover:opacity-75'
        }`}
      >
        <Text className="text-lg">🇪🇸</Text>
      </Pressable>
    </View>
  );
};

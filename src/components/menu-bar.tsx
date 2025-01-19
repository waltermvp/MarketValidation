import React from 'react';
import Animated from 'react-native-reanimated';

import { LanguageSelector } from '@/components/language-selector';
import { Image, View } from '@/components/ui';
import { type Language } from '@/lib/i18n/resources';

type MenuBarProps = {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  animatedStyle?: any;
};

export function MenuBar({
  lang,
  onLanguageChange,

  animatedStyle,
}: MenuBarProps) {
  return (
    <View className="align-center z-50 w-full flex-row justify-between px-6">
      <Animated.View style={animatedStyle} className={'left-4 top-4'}>
        <Image
          className=" left-0.5 top-0.5 size-12"
          source={
            'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=400&q=80'
          }
        />
      </Animated.View>
      <LanguageSelector currentLang={lang} onChangeLang={onLanguageChange} />
    </View>
  );
}

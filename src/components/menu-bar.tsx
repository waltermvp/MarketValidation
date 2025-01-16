import React from 'react';
import Animated from 'react-native-reanimated';

// import { CartCount } from '@/components/cart-count';
import { LanguageSelector } from '@/components/language-selector';
import { View } from '@/components/ui';

type MenuBarProps = {
  lang: string;
  onLanguageChange: (newLang: string) => void;
  // cartQuantity: number;
  // onCartPress: () => void;
  // isAuthenticated: boolean;
  animatedStyle?: any;
  t?: any;
};

export function MenuBar({
  lang,
  onLanguageChange,
  // cartQuantity,
  // onCartPress,
  // isAuthenticated,
  animatedStyle,
}: MenuBarProps) {
  return (
    <View className="align-center w-full flex-row justify-between px-6">
      <Animated.View style={animatedStyle} className={'left-4 top-4'}>
        {/* <Icon /> */}
        {/* <Image
          className=" left-4 top-4 size-48"
          // style={{ width: 150, height: 75 }}
          // className="size-7 rounded-full bg-gray-300 p-4"
          source={
            'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=400&q=80'
          }
        /> */}
      </Animated.View>
      <Animated.View style={animatedStyle} className={'h-full '}>
        <LanguageSelector currentLang={lang} onChangeLang={onLanguageChange} />
      </Animated.View>
    </View>
  );
}

import React from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

// import { CartCount } from '@/components/cart-count';
import { LanguageSelector } from '@/components/language-selector';
import { Text, View } from '@/components/ui';

type MenuBarProps = {
  lang: string;
  onLanguageChange: (newLang: string) => void;
  // cartQuantity: number;
  // onCartPress: () => void;
  // isAuthenticated: boolean;
  animatedStyle: any;
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
    <View className="px-6">
      <View className="align-center w-full flex-row justify-between">
        <View className="h-full flex-row">
          <LanguageSelector
            currentLang={lang}
            onChangeLang={onLanguageChange}
          />
          {/* <Animated.View style={animatedStyle}>
            <Pressable
              onPress={onCartPress}
              className="top-4 flex h-full flex-row items-center space-x-2 rounded-full bg-primary-main px-4 py-2 dark:bg-primary-dark"
            >
              <Text className="font-bold text-white">
                {cartQuantity} {t.cart.items}
              </Text>
              <CartCount
                cartQuantity={cartQuantity}
                lang={lang}
                className="h-full"
              />
            </Pressable>
          </Animated.View> */}
        </View>
        <Animated.View style={animatedStyle} className={'h-full '}>
          <Pressable
            // onPress={onCartPress}
            className="bg-primary-main dark:bg-primary-dark top-4 flex h-full flex-row items-center justify-center space-x-2 rounded-full px-4 py-2"
          >
            <Text className="font-bold text-white">
              {/* {cartQuantity} {t.cart.items} */}
            </Text>
            {/* <CartCount
              cartQuantity={cartQuantity}
              lang={lang}
              className="h-full"
            /> */}
          </Pressable>
        </Animated.View>

        {/* <Animated.View className="aspect-square">
          <Pressable
            onPress={() =>
              isAuthenticated
                ? router.push('/auth/profile')
                : router.push('/login?mode=signup')
            }
            className="top-4 flex aspect-square flex-row items-center space-x-2 rounded-full bg-primary-main px-4 py-2 dark:bg-primary-dark"
          >
            <Ionicons name="person-outline" size={24} color="white" />
          </Pressable>
        </Animated.View> */}
      </View>
    </View>
  );
}

import { type Schema } from 'amplify/data/resource';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';

import { Text, View } from '@/components/ui';
import { translate } from '@/lib';

import outputs from '../../../amplify_outputs.json';

const mobileLandscape960 = require('../../../assets/hero-background/mobile_landscape_960x600.jpg');
const mobilePortrait375 = require('../../../assets/hero-background/mobile_portrait_375x667.jpg');
const mobilePortrait480 = require('../../../assets/hero-background/mobile_portrait_480x800.jpg');
const tabletLandscape = require('../../../assets/hero-background/tablet_landscape_1024x640.jpg');
const tabletPortrait800 = require('../../../assets/hero-background/tablet_portrait_800x1000.jpg');
const tabletPortrait900 = require('../../../assets/hero-background/tablet_portrait_900x1200.jpg');
const mobileLandscape800 = require('../../../assets/hero-background/mobile_landscape_800x500.jpg');
const largeDesktop1440 = require('../../../assets/hero-background/large_desktop_1440x810.jpg');
const largeDesktop1920 = require('../../../assets/hero-background/large_desktop_1920x800.jpg');
const standardDesktop1280 = require('../../../assets/hero-background/standard_desktop_1280x720.jpg');
const standardDesktop1366 = require('../../../assets/hero-background/standard_desktop_1366x768.jpg');

Amplify.configure(outputs);
type ConfirmationState = 'loading' | 'success' | 'error';

// eslint-disable-next-line max-lines-per-function
export function ConfirmScreen() {
  const { code } = useLocalSearchParams();
  const client = generateClient<Schema>();
  const [state, setState] = React.useState<ConfirmationState>('loading');
  const [message, setMessage] = React.useState<string>(
    translate('confirm.loading')
  );
  const hasConfirmed = React.useRef(false);
  const { width, height } = useWindowDimensions();

  // Reuse the same background image logic from index.tsx
  const getBackgroundImage = () => {
    const isPortrait = height > width;
    if (isPortrait) {
      if (width <= 375) return mobilePortrait375;
      if (width <= 480) return mobilePortrait480;
      if (width <= 768) return tabletPortrait800;
      if (width <= 1024) return tabletPortrait900;
      return tabletPortrait900;
    } else {
      if (width <= 667) return mobileLandscape800;
      if (width <= 960) return mobileLandscape960;
      if (width <= 1024) return tabletLandscape;
      if (width <= 1280) return standardDesktop1280;
      if (width <= 1366) return standardDesktop1366;
      if (width <= 1440) return largeDesktop1440;
      return largeDesktop1920;
    }
  };

  React.useEffect(() => {
    const confirmSubscription = async () => {
      // Prevent multiple confirmation attempts
      if (hasConfirmed.current) {
        return;
      }

      if (!code || typeof code !== 'string') {
        console.log('Invalid code detected:', code);
        setState('error');
        setMessage(translate('confirm.invalidCode'));
        return;
      }

      try {
        console.log('Making confirmation request for code:', code);
        const result = await client.mutations.confirmNewsletter({
          confirmationCode: code,
        });
        console.log('Confirmation response:', result);

        if (result.data?.success) {
          console.log('Setting success state');
          hasConfirmed.current = true; // Mark as confirmed
          setState('success');
          setMessage(translate('confirm.success'));
        } else {
          console.log('Setting error state from unsuccessful response');
          setState('error');
          setMessage(result.data?.message || translate('confirm.error'));
        }
      } catch (error) {
        console.log('Error caught during confirmation:', error);
        setState('error');
        setMessage(translate('confirm.error'));
      }
    };

    confirmSubscription();
  }, [code, client]);

  console.log('Rendering with state:', state, 'message:', message);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={getBackgroundImage()}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View className="flex-1 items-center justify-center p-4">
          <View className="w-full max-w-md rounded-lg bg-neutral-900/80 p-8 shadow-lg backdrop-blur-sm">
            <Text
              className={`text-center font-netflix-medium text-2xl ${
                state === 'error'
                  ? 'text-red-500'
                  : state === 'success'
                    ? 'text-primary-500'
                    : 'text-white'
              }`}
            >
              {message}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default ConfirmScreen;

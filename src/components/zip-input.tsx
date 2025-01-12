import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import React, { useEffect, useState } from 'react';
import Animated, { Layout, withSpring } from 'react-native-reanimated';

import { useIsFirstTime } from '@/lib';
import { translate,  } from '@/lib';
import { Button, Input, Text, View } from '@/components/ui';

import { type Schema } from '../../amplify/data/resource';
import outputs from '../../amplify_outputs.json';
import { Title } from './title';
import { t } from 'i18next';

const ZIP_STORAGE_KEY = 'zipCode';
Amplify.configure(outputs);

export type ZipInputProps = {
  callBack: ({ success }: { success: boolean; zip?: string }) => void;
  className?: string;
  lang: string;
};
interface ZipData {
  zip: string;
  city: string;
  name: string;
}

// eslint-disable-next-line max-lines-per-function
export const ZipInput = ({ callBack, className, lang }: ZipInputProps) => {
  const [isFirstTime, setIsFirstTime] = useIsFirstTime();


  const amplifyClient = generateClient<Schema>();
  const [zipCode, setZipcode] = React.useState<string | undefined>();
  const [zipCodeResult, setZipCodeResult] = React.useState<ZipData | undefined>(
    JSON.parse(localStorage.getItem('zipCode') || 'null') ?? undefined,
  );
  const [error, setError] = useState<undefined | string>();
  const [checkingZip, setCheckingZip] = useState(false);
  const buttonEnabled = error ? true : false;

  const entering = withSpring(
    {
      opacity: 1,
      transform: [{ scale: 1 }],
    },
    {
      damping: 12,
      mass: 1,
      stiffness: 100,
      velocity: 1,
    },
  );

  const exiting = withSpring(
    {
      opacity: 0,
      transform: [{ scale: 0.8 }],
    },
    {
      damping: 12,
      mass: 1,
      stiffness: 100,
      velocity: 1,
    },
  );

  async function checkZipOnServer() {
    if (!zipCode) {
      return;
    }
    setCheckingZip(true);
    try {
      // const result = await amplifyClient.queries.validate({
      //   zipCode,
      // });
      // const success = result.data?.success ?? false;

      // if (!success) {
      //   setError(t.zipInput.notDeliverable);
      //   callBack({ success });
      //   clearZip();
      // } else {
      //   const zipData = result.data as ZipData;
      //   setZip(zipData);
      //   callBack({ success, zip: zipCode });
      // }
      setCheckingZip(false);
    } catch (error) {
      // setError(t.zipInput.notDeliverable);
      setCheckingZip(false);
    }
  }

  const clearZip = () => {
    localStorage.removeItem(ZIP_STORAGE_KEY);
    setZipCodeResult(undefined);
    callBack({ success: false, zip: undefined });
  };

  function setZip(data: ZipData) {
    localStorage.setItem(ZIP_STORAGE_KEY, JSON.stringify(data));
    setZipCodeResult(data);
    setError(undefined);
  }

  useEffect(() => {
    function validateZipCodeThenUpdateError() {
      if (zipCode?.length === 5) {
        setError(undefined);
        return true;
      } else {
        setError('please enter a valid Zip code');
        return false;
      }
    }
    if (isFirstTime) {
      setIsFirstTime(false);
      return;
    }

    console.log('will call validateZipCodeThenUpdateError');
    validateZipCodeThenUpdateError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipCode, setError]);

  useEffect(() => {
    function updatecall() {
      const cachedZip: ZipData = JSON.parse(
        localStorage.getItem(ZIP_STORAGE_KEY) || 'null',
      );
      setZipCodeResult(cachedZip);
      if (cachedZip) {
        callBack({ success: true, zip: cachedZip.zip });
      } else {
        callBack({ success: false });
      }
    }
    updatecall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className={className}>
      {!zipCodeResult ? (
        <Animated.View layout entering={entering} exiting={exiting}>
          <Title text={translate('settings.title')} color="white" />
          <View>
            <Input
              label={translate('settings.title')}
              placeholder={translate('settings.title')}
              keyboardType="number-pad"
              autoComplete="postal-code"
              error={error}
              className="rounded border border-primary-main  bg-red-100/10 px-2 py-1 text-lg font-medium text-primary-dark"
              // placeholderClassName="text-primary-main text-sm"
              errorClassName="text-lg text-primary-dark"
              onChangeText={setZipcode}
              onSubmitEditing={checkZipOnServer}
              returnKeyType="done"
            />
            <Button
              variant="default"
              className="bg-primary-dark dark:bg-primary-dark"
              textClassName="text-white dark:text-white"
              // label={t.zipInput.checkZipButton}
              disabled={buttonEnabled}
              loading={checkingZip}
              // loadingClassName=""
              onPress={checkZipOnServer}
            />
          </View>
        </Animated.View>
      ) : (
        <Animated.View
          layout
          entering={entering}
          exiting={exiting}
          className="relative rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 backdrop-blur-sm"
        >
          <Text
            onPress={clearZip}
            className="absolute -right-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-center text-lg font-bold text-white shadow-lg"
          >
            x
          </Text>

          <Text className="my-3 px-3 text-center text-3xl font-bold text-white">
            {/* {t.zipInput.deliveryAvailable} */}
          </Text>
          <Text className="text-center text-2xl text-emerald-300">
            {zipCodeResult?.city}, {zipCodeResult?.name}
          </Text>
          <Text className="mt-3 text-center text-emerald-200 underline">
            {/* {t.zipInput.orderBelow} */}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

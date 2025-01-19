import type TranslateOptions from 'i18next';
import i18n from 'i18next';
import { useCallback } from 'react';
import { I18nManager, NativeModules, Platform } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';

import { storage } from '../storage';
import type { Language, resources } from './resources';
import type { RecursiveKeyOf } from './types';

type DefaultLocale = typeof resources.en.translation;
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

export const LOCAL = 'local';

export const getLanguage = () => storage.getString(LOCAL); // 'Marc' getItem<Language | undefined>(LOCAL);

export const translate = (key: TxKeyPath, options = undefined) =>
  i18n.t(key, options) as unknown as string;
(key: TxKeyPath, options: typeof TranslateOptions) =>
  options ? key + JSON.stringify(options) : key;

const DEFAULT_LANGUAGE: Language = 'en'; // Set your default language here

export const changeLanguage = (lang: Language) => {
  const validLang = lang || DEFAULT_LANGUAGE; // Use default if lang is invalid
  i18n.changeLanguage(validLang);
  if (validLang === 'ar') {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    if (__DEV__) NativeModules.DevSettings.reload();
    // else RNRestart.restart();
  } else if (Platform.OS === 'web') {
    // window.location.reload();
  }
};

export const useSelectedLanguage = () => {
  const [language, setLang] = useMMKVString(LOCAL);
  const validLang = language || DEFAULT_LANGUAGE; // Use default if lang is invalid

  const setLanguage = useCallback(
    (lang: Language) => {
      setLang(lang);
      if (lang !== undefined) changeLanguage(lang as Language);
    },
    [setLang]
  );

  return { language: validLang as Language, setLanguage };
};

import { type Schema } from 'amplify/data/resource';
import { Amplify } from 'aws-amplify';
import { configureAutoTrack } from 'aws-amplify/analytics';
import { generateClient } from 'aws-amplify/api'; // import { EnvEnv } from 'env';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import CardComponent from '@/components/card-component';
import { FAQ } from '@/components/faq';
import { MenuBar } from '@/components/menu-bar';
import { Newsletter } from '@/components/newsletter';
import { Text } from '@/components/ui/text';
import { translate, useSelectedLanguage } from '@/lib';

import outputs from '../../amplify_outputs.json';
const mobileLandscape960 = require('../../assets/hero-background/mobile_landscape_960x600.jpg');
const mobilePortrait375 = require('../../assets/hero-background/mobile_portrait_375x667.jpg');
const mobilePortrait480 = require('../../assets/hero-background/mobile_portrait_480x800.jpg');
const tabletLandscape = require('../../assets/hero-background/tablet_landscape_1024x640.jpg');
const tabletPortrait800 = require('../../assets/hero-background/tablet_portrait_800x1000.jpg');
const tabletPortrait900 = require('../../assets/hero-background/tablet_portrait_900x1200.jpg');
const mobileLandscape800 = require('../../assets/hero-background/mobile_landscape_800x500.jpg');
const largeDesktop1440 = require('../../assets/hero-background/large_desktop_1440x810.jpg');
const largeDesktop1920 = require('../../assets/hero-background/large_desktop_1920x800.jpg');
const standardDesktop1280 = require('../../assets/hero-background/standard_desktop_1280x720.jpg');
const standardDesktop1366 = require('../../assets/hero-background/standard_desktop_1366x768.jpg');

Amplify.configure(outputs);
// localStorage.clear(); //TODO: remove

configureAutoTrack({
  // REQUIRED, turn on/off the auto tracking
  enable: true,
  // REQUIRED, the event type, it's one of 'event', 'pageView' or 'session'
  type: 'pageView',
  // OPTIONAL, additional options for the tracked event.
  options: {
    // OPTIONAL, the attributes of the event
    attributes: {
      customizableField: 'attr',
    },

    // OPTIONAL, the event name. By default, this is 'pageView'
    eventName: 'pageView',

    // OPTIONAL, the type of app under tracking. By default, this is 'multiPageApp'.
    // You will need to change it to 'singlePage' if your app is a single-page app like React
    appType: 'singlePage',

    // OPTIONAL, provide the URL for the event.
    urlProvider: () => {
      // the default function
      return window.location.origin + window.location.pathname;
    },
  },
});

// eslint-disable-next-line max-lines-per-function
const Home = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const client = generateClient<Schema>();
  const { language, setLanguage } = useSelectedLanguage();
  const [newsletterProps, setNewsletterProps] = useState({
    title: translate('home.title'),
    subtitle: translate('home.subtitle'),
    placeholder: translate('home.enterEmail'),
    buttonText: translate('home.signUp'),
    successMessage: successMessage,
    errorMessage: null,
    zipPlaceholder: translate('home.zipCode'),
  });

  const { width, height } = useWindowDimensions();

  // Replace the direct items and faqData declarations with memoized versions
  const items = useMemo(
    () => [
      {
        title: translate('home.benefits.title1'),
        content: translate('home.benefits.content1'),
        image: require('../../assets/pollution.png'),
      },
      {
        title: translate('home.benefits.title2'),
        content: translate('home.benefits.content2'),
        image: require('../../assets/monitor.png'),
      },
      {
        title: translate('home.benefits.title3'),
        content: translate('home.benefits.content3'),
        image: require('../../assets/protect.png'),
      },
      {
        title: translate('home.benefits.title4'),
        content: translate('home.benefits.content4'),
        image: require('../../assets/relocation.png'),
      },
    ],
    []
  );

  const faqData = useMemo(
    () => [
      {
        question: translate('home.faq.question1'),
        answer: translate('home.faq.answer1'),
        image: '../../assets/monitor.png',
      },
      {
        question: translate('home.faq.question2'),
        answer: translate('home.faq.answer2'),
        image: '../../assets/monitor.png',
      },
      {
        question: translate('home.faq.question3'),
        answer: translate('home.faq.answer3'),
      },
      {
        question: translate('home.faq.question4'),
        answer: translate('home.faq.answer4'),
      },
      {
        question: translate('home.faq.question5'),
        answer: translate('home.faq.answer5'),
      },
      {
        question: translate('home.faq.question6'),
        answer: translate('home.faq.answer6'),
      },
    ],
    []
  );

  const [cardProps, setCardProps] = useState({
    title: translate('home.benefitsTitle'),
    items: items,
  });

  const [faqProps, setFaqProps] = useState({
    faqItems: faqData,
    title: translate('home.faqTitle'),
  });

  // Update cardProps and faqProps when language changes
  useEffect(() => {
    // lets repopulate newsletterProps here
    setNewsletterProps({
      title: translate('home.title'),
      subtitle: translate('home.subtitle'),
      placeholder: translate('home.enterEmail'),
      buttonText: translate('home.signUp'),
      successMessage: successMessage,
      errorMessage: null,
      zipPlaceholder: translate('home.zipCode'),
    });

    // Update cardProps and faqProps when language changes
    setCardProps({
      title: translate('home.benefitsTitle'),
      items: items,
    });

    setFaqProps({
      faqItems: faqData,
      title: translate('home.faqTitle'),
    });
  }, [
    language,
    setNewsletterProps,
    successMessage,
    setCardProps,
    setFaqProps,
    items,
    faqData,
  ]);

  const handleNewsletterCallback = async (
    email: string,
    country?: string,
    zip?: string
  ) => {
    try {
      const result = await client.queries.signUpNewsletter({
        email,
        country: country ? country : undefined,
        zip: zip ? zip : undefined,
        lang: language,
      });
      console.log('result', result);
      if (!result.data?.success) {
        console.log(result.data?.message);
        setSuccessMessage(translate('home.successAlreadyRegistered'));
        //@ts-ignore
        setNewsletterProps((prevProps) => ({
          ...prevProps,
          errorMessage: translate('home.errorMessage'),
        }));
      } else {
        setSuccessMessage(translate('home.success'));
        setNewsletterProps((prevProps) => ({
          ...prevProps,
          errorMessage: null,
        }));
      }
    } catch (error) {
      console.log('error', error);
      //@ts-ignore
      setNewsletterProps((prevProps) => ({
        ...prevProps,
        errorMessage: translate('home.errorMessage'),
      }));
    }
  };

  // Add this function to determine which background to use
  const getBackgroundImage = () => {
    const isPortrait = height > width;
    console.log(`Screen: ${width}x${height}, isPortrait: ${isPortrait}`); // Debug info

    if (isPortrait) {
      // Portrait mode breakpoints
      if (width <= 375) return mobilePortrait375; // iPhone SE, small phones
      if (width <= 480) return mobilePortrait480; // Larger phones
      if (width <= 768) return tabletPortrait800; // Small tablets
      if (width <= 1024) return tabletPortrait900; // Large tablets
      return tabletPortrait900; // Default portrait
    } else {
      // Landscape mode breakpoints
      if (width <= 667) return mobileLandscape800; // Phone landscape
      if (width <= 960) return mobileLandscape960; // Large phone landscape
      if (width <= 1024) return tabletLandscape; // Tablet landscape
      if (width <= 1280) return standardDesktop1280; // Small desktop/laptop
      if (width <= 1366) return standardDesktop1366; // Standard laptop
      if (width <= 1440) return largeDesktop1440; // Large laptop
      return largeDesktop1920; // 4K+ displays
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={getBackgroundImage()}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <MenuBar
          lang={language}
          onLanguageChange={(lang) => {
            setLanguage(lang);
          }}
        />
        <Newsletter callBack={handleNewsletterCallback} {...newsletterProps} />
      </ImageBackground>
      <View className="mx-12 mb-12 justify-center align-middle">
        <CardComponent title={cardProps.title} items={cardProps.items} />

        <View className="h-12  md:h-24" />
        <FAQ faqItems={faqProps.faqItems} title={faqProps.title} />
      </View>
      <View className="h-44 overflow-hidden">
        <ImageBackground
          source={getBackgroundImage()}
          // style={styles.headerBackground}
          // className="items-center "
          imageStyle={{
            height: 176 * 5, // Make the image 5x taller than the container
            width: width,
            top: -176 * 4, // Move the image up by 80% of its height (4x container height)
          }}
          resizeMode="cover"
        >
          <View style={[styles.overlay, { bottom: -200 }]} />
          <Text className="mt-20 self-center font-netflix-regular !text-primary-500">
            &copy; 2025 - {translate('appName')}
          </Text>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    // ,
    backgroundColor: '#000',
    // padding: 20,
  },
  headerBackground: {
    height: 'auto',
    width: '100%',
    // marginBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  faq: {
    marginBottom: 40,
  },
  faqTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  faqItem: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 5,
  },
  footer: {
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default Home;

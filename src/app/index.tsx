import { type Schema } from 'amplify/data/resource';
import { Amplify } from 'aws-amplify';
import { configureAutoTrack } from 'aws-amplify/analytics';
import { generateClient } from 'aws-amplify/api'; // import { EnvEnv } from 'env';
import React, { useEffect, useMemo, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';

import CardComponent from '@/components/card-component';
import { FAQ } from '@/components/faq';
import { MenuBar } from '@/components/menu-bar';
import { Newsletter } from '@/components/newsletter';
import { translate, useSelectedLanguage } from '@/lib';

import outputs from '../../amplify_outputs.json';

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
    [language]
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
    [language]
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
      });
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
      //@ts-ignore
      setNewsletterProps((prevProps) => ({
        ...prevProps,
        errorMessage: translate('home.errorMessage'),
      }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../assets/background.jpg')}
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
      <CardComponent title={cardProps.title} items={cardProps.items} />

      <View className="justify-center p-4 align-middle">
        <FAQ faqItems={faqProps.faqItems} title={faqProps.title} />
        {/* <View style={styles.footer}></View> */}
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

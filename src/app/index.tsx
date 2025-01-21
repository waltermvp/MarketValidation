import { type Schema } from 'amplify/data/resource';
import { Amplify } from 'aws-amplify';
import { configureAutoTrack } from 'aws-amplify/analytics';
import { generateClient } from 'aws-amplify/api'; // import { EnvEnv } from 'env';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
        // callbackURL: Env.API_URL,
      });
      if (!result.data?.success) {
        console.log(result.data?.message);
        setSuccessMessage(translate('home.successAlreadyRegistered'));
      } else {
        setSuccessMessage(translate('home.success'));
      }
    } catch (error) {
      console.log(error, null, 2);
    }
  };

  //Localization

  const { language, setLanguage } = useSelectedLanguage();
  const [newsletterProps, setNewsletterProps] = useState({
    title: translate('home.title'),
    subtitle: translate('home.subtitle'),
    placeholder: translate('home.enterEmail'),
    buttonText: translate('home.signUp'),
    successMessage: successMessage,
    errorMessage: translate('home.errorMessage'),
    zipPlaceholder: translate('home.zipCode'),
  });

  // Add useEffect to refresh translations when language changes
  useEffect(() => {
    // lets repopulate newsletterProps here
    setNewsletterProps({
      title: translate('home.title'),
      subtitle: translate('home.subtitle'),
      placeholder: translate('home.enterEmail'),
      buttonText: translate('home.signUp'),
      successMessage: successMessage,
      errorMessage: translate('home.errorMessage'),
      zipPlaceholder: translate('home.zipCode'),
    });
  }, [language, setNewsletterProps, successMessage]); // Dependency array includes language

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../assets/background.jpeg')}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <MenuBar
          lang={language}
          onLanguageChange={(lang) => {
            setLanguage(lang);
          }}
        />
        <View style={styles.overlay} />
        <View style={styles.header}>
          <Newsletter
            callBack={handleNewsletterCallback}
            {...newsletterProps}
          />
        </View>
      </ImageBackground>

      <View className="p-4">
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enjoy on your TV.</Text>
          <Text style={styles.sectionText}>
            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Download your shows to watch offline.
          </Text>
          <Text style={styles.sectionText}>
            Save your favorites easily and always have something to watch.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Watch everywhere.</Text>
          <Text style={styles.sectionText}>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV without paying more.
          </Text>
        </View>
        <FAQ />
        {/* <View style={styles.footer}></View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // flex: 1,
    backgroundColor: '#000',
    // padding: 20,
  },
  headerBackground: {
    height: 500,
    width: '100%',
    // marginBottom: 40,
  },
  header: {
    // paddingTop: 20,
    paddingHorizontal: 10,
    // alignItems: 'center',
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Home;

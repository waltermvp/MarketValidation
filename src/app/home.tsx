import { type Schema } from 'amplify/data/resource';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api'; // import { EnvEnv } from 'env';
import React from 'react';
import {
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Newsletter } from '@/components/newsletter';
import { colors } from '@/components/ui';

import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);
// eslint-disable-next-line max-lines-per-function
const Home = () => {
  const client = generateClient<Schema>();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1515386474292-47555758ef2e?auto=format&fit=crop&w=800&q=80',
        }}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.header}>
          <Text className="text-4xl text-white">
            Unlimited movies, TV shows, and more.
          </Text>
          <Text style={styles.subtitle} className="text-3xl text-white">
            Watch anywhere. Cancel anytime.
          </Text>
          {/* <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#999"
          /> */}
          <Newsletter
            title="Sign Up"
            subtitle='"Register for updates'
            callBack={async (email) => {
              console.log(email);

              try {
                const result = await client.queries.signUpNewsletter({
                  email,
                  // callbackURL: Env.API_URL,
                });
                console.log('email', email, result);
              } catch (error) {
                console.log(error);
              }
            }}
            placeholder="Enter your email"
            buttonText="Sign Up"
            successMessage="Thank you for singing up"
            errorMessage="Whoops"
          />
          <Button title="GET STARTED" onPress={() => {}} color="#e50914" />
        </View>
      </ImageBackground>

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

      <View style={styles.faq}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        <Text style={styles.faqItem}>What is Netflix?</Text>
        <Text style={styles.faqItem}>How much does Netflix cost?</Text>
        <Text style={styles.faqItem}>Where can I watch?</Text>
        <Text style={styles.faqItem}>How do I cancel?</Text>
        <Text style={styles.faqItem}>What can I watch on Netflix?</Text>
      </View>

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#999"
        />
        <Button title="GET STARTED" onPress={() => {}} color="#e50914" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    // padding: 20,
  },
  headerBackground: {
    marginBottom: 40,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
    color: '#fff',
    backgroundColor: colors.neutral[100],
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

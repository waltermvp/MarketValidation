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

import { colors } from '@/components/ui';
import { ZipInput } from '@/components/zip-input';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1515386474292-47555758ef2e?auto=format&fit=crop&w=800&q=80',
        }}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            Unlimited movies, TV shows, and more.
          </Text>
          <Text style={styles.subtitle}>Watch anywhere. Cancel anytime.</Text>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#999"
          />
          <ZipInput />
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
    padding: 20,
  },
  headerBackground: {
    padding: 20,
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
});

export default Home;

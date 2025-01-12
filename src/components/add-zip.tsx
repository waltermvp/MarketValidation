import { generateClient } from 'aws-amplify/api';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

import { Button, Input, Text, View } from '@/components/ui';

import { type Schema } from '../../amplify/data/resource';

// eslint-disable-next-line max-lines-per-function
export function AddZip() {
  const client = generateClient<Schema>();
  const [zipCodes, setZipCodes] = useState<Schema['User'][]>([]);
  const [newZipCode, setNewZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const fetchZipCodes = async () => {
    try {
      // const { data } = await client.models.AllowedZipCode.list({
      //   authMode: 'userPool',
      // });
      // setZipCodes(data);
    } catch (error) {
      console.error('Error fetching zip codes:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch zip codes',
      });
    }
  };

  const addZipCode = async () => {
    if (!newZipCode) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a zip code',
      });
      return;
    }

    try {
      // await client.models.AllowedZipCode.create({
      //   zipCode: newZipCode,
      //   city,
      //   state,
      // });
      // setNewZipCode('');
      // setCity('');
      // setState('');
      // fetchZipCodes();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Zip code added successfully',
      });
    } catch (error) {
      console.error('Error adding zip code:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add zip code',
      });
    }
  };

  const removeZipCode = async (zipCode: string) => {
    try {
      // await client.models.AllowedZipCode.delete({ zipCode });
      // fetchZipCodes();
      // Toast.show({
      //   type: 'success',
      //   text1: 'Success',
      //   text2: 'Zip code removed successfully',
      // });
    } catch (error) {
      console.error('Error removing zip code:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to remove zip code',
      });
    }
  };

  return (
    <View className="mt-12 border-t-2 border-gray-200 bg-neutral-200 pt-6">
      <Text className="mb-6 text-2xl font-bold">Delivery Zone Management</Text>
      <View className="mb-6 flex flex-row space-x-4">
        <Input
          value={newZipCode}
          onChangeText={setNewZipCode}
          placeholder="Zip Code"
          className="flex-1"
        />
        <Input
          value={city}
          onChangeText={setCity}
          placeholder="City"
          className="flex-1"
        />
        <Input
          value={state}
          onChangeText={setState}
          placeholder="State"
          className="flex-1"
        />
        <Button onPress={addZipCode} label="Add Zip Code" />
      </View>

      <View className="rounded-lg border border-gray-200">
        <View className="grid grid-cols-4 gap-4 border-b border-gray-200 bg-gray-50 p-4">
          <Text className="font-semibold">Zip Code</Text>
          <Text className="font-semibold">City</Text>
          <Text className="font-semibold">State</Text>
          <Text className="font-semibold">Actions</Text>
        </View>
        {/* {zipCodes.map((zip) => (
          <View
            key={zip.zipCode}
            className="grid grid-cols-4 gap-4 border-b border-gray-200 p-4 last:border-b-0"
          >
            <Text>{zip.zipCode}</Text>
            <Text>{zip.city}</Text>
            <Text>{zip.state}</Text>
            <Button
              onPress={() => removeZipCode(zip.zipCode)}
              label="Remove"
              variant="danger"
            />
          </View>
        ))} */}
      </View>
    </View>
  );
}

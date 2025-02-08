import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  content: z
    .string({
      required_error: 'Describe your project in detail',
    })
    .min(6, 'Describe your project in detail'),
});

export type FormType = z.infer<typeof schema>;

export type RequestQuoteFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const RequestQuoteForm = ({
  onSubmit = () => {},
}: RequestQuoteFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardAvoidingView
      className="rounded-lg bg-white shadow-md"
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <View className="items-center justify-center">
          <Text
            testID="form-title"
            className="pb-6 text-center text-4xl font-bold !text-black"
          >
            Request a Quote
          </Text>

          <Text className="mb-6 max-w-xs text-center !text-black text-gray-500">
            Please fill out the form below to request a quote.
          </Text>
        </View>

        <ControlledInput
          // className="!text-black"
          // placeholderClassName="text-white"
          testID="name"
          control={control}
          name="name"
          label="Name"
        />

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
        />
        <ControlledInput
          testID="content"
          control={control}
          name="content"
          label="Describe your project"
          placeholder="Describe your project"
          numberOfLines={4}
          className="mt-0 h-40 rounded-xl border-[0.5px] border-neutral-300 bg-neutral-100 px-4 py-3 font-inter text-base  font-medium leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          // secureTextEntry={true}
        />
        <Button
          className="bg-black dark:bg-black"
          textClassName="text-white dark:text-white"
          testID="login-button"
          label="Get a Quote"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

import { defineFunction } from '@aws-amplify/backend';

export const requestQuote = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'request-quote',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
});

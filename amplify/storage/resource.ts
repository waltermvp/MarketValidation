import { defineStorage } from '@aws-amplify/backend';
import { signUpNewsletter } from '../functions/signUp-newsletter/resource';
export const storage = defineStorage({
  name: 'mapyourhealth-images',
  access: (allow) => ({
    'profile-pictures/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
    'picture-submissions/*': [
      allow.authenticated.to(['read', 'write']),
      allow.guest.to(['read', 'write']),
    ],
    'email-images/*': [
      allow.resource(signUpNewsletter).to(['read', 'write']),
      allow.authenticated.to(['read', 'write']),
      allow.guest.to(['read']),
    ],
  }),
});

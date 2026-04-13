import { defineAuth, secret } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    /*
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['email', 'profile', 'openid']
      },
      facebook: {
        clientId: secret('FACEBOOK_CLIENT_ID'),
        clientSecret: secret('FACEBOOK_CLIENT_SECRET'),
        scopes: ['email', 'public_profile', 'openid']
      },
      oidc: [{
        name: 'Microsoft',
        clientId: secret('MICROSOFT_CLIENT_ID'),
        clientSecret: secret('MICROSOFT_CLIENT_SECRET'),
        issuerUrl: 'https://login.microsoftonline.com/common/v2.0',
        scopes: ['email', 'profile', 'openid']
      }],
      callbackUrls: ['http://localhost:5173/'],
      logoutUrls: ['http://localhost:5173/'],
    }
    */
  },
  multifactor: {
    mode: 'OPTIONAL',
    sms: true,
  },
  userAttributes: {
    "custom:is_super_admin": {
      dataType: "Boolean",
      mutable: true,
    }
  },
  groups: ["Admins"]
});
import { AuthenticationContext, adalGetToken, adalFetch } from 'react-adal';
 
export const adalConfig = {
  tenant: '85c997b9-f494-46b3-a11d-772983cf6f11',
  clientId: '47a53002-0b02-4526-bd8b-7cec45909305',
  postLogOutRedirectUri:'https://localhost:3000/#/',
  redirectUri: window.location.origin,
  cacheLocation: 'localStorage',
};
 
export const authContext = new AuthenticationContext(adalConfig);
 
export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);
 
 
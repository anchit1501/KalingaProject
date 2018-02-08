import AuthenticationContext from 'adal-angular';

const config = {
  instance: 'https://login.microsoftonline.com/',
  tenant: '85c997b9-f494-46b3-a11d-772983cf6f11',
  clientId: '47a53002-0b02-4526-bd8b-7cec45909305',
  postLogoutRedirectUri: window.location.origin,
  cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost
  endpoints: {
    graphApiUri: "https://graph.microsoft.com"
  }
};

export const authContext = new AuthenticationContext(config);

const isCallback = authContext.isCallback(window.location.hash);

authContext.handleWindowCallback();	

if (isCallback && !authContext.getLoginError()) {
  console.log('Check Login');
  window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
}
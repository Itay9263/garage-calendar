// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBSkGSYrgXblLJ5VC0Gu3qKuyAcDg83Bu0",
    authDomain: "garage-calendar-1601035515139.firebaseapp.com",
    databaseURL: "https://garage-calendar-1601035515139.firebaseio.com",
    projectId: "garage-calendar-1601035515139",
    storageBucket: "garage-calendar-1601035515139.appspot.com",
    messagingSenderId: "956207454480",
    appId: "1:956207454480:web:37abbc56414e883af0ad95"
  },
  gapi: {
    apiKey: 'AIzaSyBSkGSYrgXblLJ5VC0Gu3qKuyAcDg83Bu0',
    clientId: '956207454480-glj8pcsols51v17rtbeo55i5pqjaulb3.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scope: 'https://www.googleapis.com/auth/calendar'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

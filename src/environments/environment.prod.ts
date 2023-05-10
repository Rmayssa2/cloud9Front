// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";

export const environment = {
    production: true,
    apiUrl: "",
    firebase : {
        apiKey: "AIzaSyBOuiiKaLxwzxZkJnwlF8OEGYoA0ZLVVH0",
        authDomain: "tobeeb-aa37d.firebaseapp.com",
        projectId: "tobeeb-aa37d",
        storageBucket: "tobeeb-aa37d.appspot.com",
        messagingSenderId: "434279337998",
        appId: "1:434279337998:web:3ea34e043949f0ff2a6c5f",
        measurementId: "G-CT0Q673B1R"
    }
};

  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
import React from 'react';
import classes from './Layout.module.scss';
import Header from '../Header/Header';
import axios from 'axios';
import { useGoogleApi } from 'react-gapi';

// https://www.googleapis.com/auth/contacts

const Layout = (props) => {
  React.useEffect(() => {
    const SCOPES = 'https://www.googleapis.com/auth/contacts';

    let tokenClient;

    const gapiLoaded = () => {
      window.gapi.load('client', intializeGapiClient);
    };

    const intializeGapiClient = () => {
      window.gapi.client.init({
        apiKey: 'AIzaSyAkMirwzdSwU-0Ng1D11l5rpFaMxCf780k',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/people/v1/rest',
        ],
      });

      console.log('Google loaded');
    };

    const gisLoaded = () => {
      window.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id:
          '958715875500-tk35h4ihh34inunpkd7l67cn110nt1ge.apps.googleusercontent.com',
        scope: SCOPES,
        callback: '', // defined later
      });
    };
    const script1 = document.createElement('script');
    script1.src = 'https://apis.google.com/js/api.js';
    script1.async = true;
    script1.defer = true;
    script1.onload = gapiLoaded;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://accounts.google.com/gsi/client';
    script2.async = true;
    script2.defer = true;
    script2.onload = gisLoaded;
    document.body.appendChild(script2);
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  });

  return (
    <div className={classes.Layout}>
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;

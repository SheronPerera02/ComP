import React from 'react';
import classes from './Layout.module.scss';
import Header from '../Header/Header';
import axios from 'axios';

const Layout = (props) => {
  React.useEffect(() => {
    const SCOPE = 'https://www.googleapis.com/auth/contacts	';
    const handleClientLoad = () => window.gapi.load('client:auth2', initClient);

    const initClient = () => {
      const discoveryUrl = 'TODO: your discoveryUrl here';
      window.gapi.client.init({
        clientId: '958715875500-tk35h4ihh34inunpkd7l67cn110nt1ge.apps.googleusercontent.com',
        // discoveryDocs: [discoveryUrl],
        scope: SCOPE,
      });
      console.log('Google loaded');
    };

    const script = document.createElement('script');

    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = handleClientLoad;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
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

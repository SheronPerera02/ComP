import Head from 'next/head';
import classes from './Profile.module.scss';
import ProfileCard from './ProfileCard/ProfileCard';
import { GoogleApiProvider, useGoogleApi } from 'react-gapi';

const ProfilePage = (props) => {
  const firstName = props.profileData?.find(
    (data) => data.name === 'First Name'
  ).value;

  const lastName = props.profileData?.find(
    (data) => data.name === 'Last Name'
  ).value;

  const gapi = useGoogleApi({
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    ],
    scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
  });

  return (
    <div className={classes.Profile}>
      <Head>
        <link rel="icon" href="/static/images/commercial_prime_logo.png" />
        <title>
          {firstName} {lastName}&apos;
          {lastName && lastName.charAt(lastName.length - 1) === 's'
            ? ''
            : 's'}{' '}
          Commercial Prime Profile
        </title>
        <meta name="theme-color" content="#2d2d2d" />
      </Head>
      <GoogleApiProvider
        clientId={
          '958715875500-tk35h4ihh34inunpkd7l67cn110nt1ge.apps.googleusercontent.com'
        }
      >
        <ProfileCard profileData={props.profileData} />
      </GoogleApiProvider>
    </div>
  );
};

export default ProfilePage;

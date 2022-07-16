import Head from 'next/head';
import classes from './Profile.module.scss';
import ProfileCard from './ProfileCard/ProfileCard';

const ProfilePage = (props) => {
  let firstName = '';

  let lastName = '';

  if (props.profileData && props.profileData.length > 0) {
    firstName = props.profileData?.find(
      (data) => data.name === 'First Name'
    ).value;

    lastName = props.profileData?.find(
      (data) => data.name === 'Last Name'
    ).value;
  }

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

      <ProfileCard profileData={props.profileData} />
    </div>
  );
};

export default ProfilePage;

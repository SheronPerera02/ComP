import Head from 'next/head';
import classes from './Profile.module.scss';
import ProfileCard from './ProfileCard/ProfileCard';

const ProfilePage = (props) => {
  const firstName = props.profileData?.find(
    (data) => data.name === 'First Name'
  ).value;

  const lastName = props.profileData?.find(
    (data) => data.name === 'Last Name'
  ).value;

  return (
    <div className={classes.Profile}>
      <Head>
        <link rel="icon" href="/static/images/commercial_prime_logo.png" />
        <title>
          {firstName} {lastName}&apos;
          {lastName && lastName.charAt(lastName.length - 1) === 's' ? '' : 's'}{' '}
          Commercial Prime Profile
        </title>
      </Head>
      <ProfileCard profileData={props.profileData} />
    </div>
  );
};

export default ProfilePage;

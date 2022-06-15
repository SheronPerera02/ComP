import classes from './Profile.module.scss';

import ProfileCard from './ProfileCard/ProfileCard';

const ProfilePage = (props) => {
  return (
    <div className={classes.Profile}>
      <ProfileCard profileData={props.profileData} />
    </div>
  );
};

export default ProfilePage;

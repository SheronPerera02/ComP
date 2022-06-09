import classes from "./Profile.module.scss";

import ProfileCard from "./ProfileCard/ProfileCard";

const ProfilePage = () => {
  return (
    <div className={classes.Profile}>
      <ProfileCard />
    </div>
  );
};

export default ProfilePage;

import classes from './Header.module.scss';

import Image from 'next/image';

const Header = () => {
  return (
    <div className={classes.Header}>
      <div className={classes.HeaderContainer}>
        <div className={classes.Logo}>
          <div>
            <Image
              src="/static/images/commercial_prime_logo.png"
              alt="Commercial Prime"
              layout="fill"
            />
          </div>
        </div>
        <button
          className={classes.BtnShare}
          onClick={() => {
            if (!navigator.share) return;
            navigator.share({
              url: 'https://www.youtube.com/',
            });
          }}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default Header;

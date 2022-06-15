import classes from './Layout.module.scss';
import Header from '../Header/Header';

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;

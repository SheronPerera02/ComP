import Profile from '../components/Profile/Profile';
import axios from '../axios';

const HomePage = (props) => {
  return <Profile profileData={props.data} />;
};

export const getServerSideProps = async (ctx) => {
  try {
    const res = await axios.post('vcard-service/get-contact-info', null, {
      params: { link: 'qanq' },
    });

    return {
      props: {
        data: res.data.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        data: null,
      },
    };
  }
};

export default HomePage;

import React from 'react';
import Image from 'next/image';
import classes from './ProfileCard.module.scss';
import { MdOutlineLocalPhone, MdOutlineEmail } from 'react-icons/md';
import { IoIosAdd, IoLogoGoogle } from 'react-icons/io';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';
import VCard from 'vcard-creator';

const ProfileCard = (props) => {
  const onAddToContactHandler = () => {
    // const myVCard = new VCard();
    // myVCard
    //   // Add personal data
    //   .addName('Stuart', 'Thomas')
    //   // Add work data
    //   .addCompany('Billable')
    //   .addJobtitle('UI/UX Designer')
    //   .addEmail('thomas@stuart.com')
    //   .addPhoneNumber('0771231234')
    //   .setFilename('StuartThomas');
    // const data = myVCard.buildVCard();
    // window.open('data:text/x-vcard;urlencoded,' + data);
  };

  const firstName = props.profileData?.find(
    (data) => data.name === 'First Name'
  ).value;

  const lastName = props.profileData?.find(
    (data) => data.name === 'Last Name'
  ).value;

  const designation = props.profileData?.find(
    (data) => data.name === 'Designation'
  ).value;

  const contactNo = props.profileData?.find(
    (data) => data.name === 'Contact Number'
  ).value;

  const leaveOutFields = [
    'First Name',
    'Last Name',
    'Designation',
    'Contact Number',
  ];

  const otherData = props.profileData?.filter((data) => {
    let addField = true;

    leaveOutFields.forEach((field) => {
      if (field === data.name) {
        addField = false;
      }
    });

    return addField;
  });

  return (
    <div className={classes.ProfileCard}>
      <div className={classes.Header}>
        <div className={classes.Profile}>
          <div className={classes.ProfileImage}>
            <span>
              <div>
                <Image
                  src="/static/images/sample_image.jpg"
                  alt="profileimage"
                  layout="fill"
                />
              </div>
            </span>
          </div>
          <p>
            {firstName} {lastName}
          </p>
          <span className={classes.Designation}>{designation}</span>
        </div>
        <div className={classes.SocialLinkContainer}>
          <span className={classes.SocialIconContainer}>
            <FaFacebookF />
          </span>
          <span className={classes.SocialIconContainer}>
            <FaInstagram />
          </span>
          <span className={classes.SocialIconContainer}>
            <FaTwitter />
          </span>
          <span className={classes.SocialIconContainer}>
            <FaLinkedinIn />
          </span>
        </div>
      </div>
      <div className={classes.ButtonContainer}>
        <button onClick={onAddToContactHandler}>
          <IoIosAdd />
          Add to Contacts
        </button>

        <button onClick={onAddToContactHandler}>
          <IoLogoGoogle />
          Add to Google
        </button>
      </div>
      <div className={classes.Body}>
        <div className={classes.ContactInfo}>
          <span>
            <MdOutlineLocalPhone /> Contact No
          </span>
          <p>{contactNo}</p>
        </div>
        {otherData.map((data) => {
          return (
            <div className={classes.ContactInfo}>
              <span>
                <MdOutlineLocalPhone /> {data.name}
              </span>
              <p>{data.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileCard;

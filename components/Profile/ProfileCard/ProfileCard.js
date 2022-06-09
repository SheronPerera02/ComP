import React from "react";
import Image from "next/image";
import classes from "./ProfileCard.module.scss";
import { MdOutlineLocalPhone, MdOutlineEmail } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import VCard from "vcard-creator";

const ProfileCard = () => {
  const onAddToContactHandler = () => {
    const myVCard = new VCard();
    myVCard
      // Add personal data
      .addName("Stuart", "Thomas")
      // Add work data
      .addCompany("Billable")
      .addJobtitle("UI/UX Designer")
      .addEmail("thomas@stuart.com")
      .addPhoneNumber("0771231234")
      .setFilename("StuartThomas");
    const data = myVCard.buildVCard();
    window.open("data:text/x-vcard;urlencoded," + data);
  };

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
          <p>Thomas Stuart</p>
          <span className={classes.Designation}>UI/UX Designer</span>
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
          {" "}
          <IoIosAdd />
          Add to Contact
        </button>
      </div>
      <div className={classes.Body}>
        <div className={classes.ContactInfo}>
          <span>
            <MdOutlineLocalPhone /> Contact No
          </span>
          <p>+94 77 442 6677</p>
        </div>
        <div className={classes.ContactInfo}>
          <span>
            <MdOutlineEmail /> Email
          </span>
          <p>johash@commercialtp.com</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

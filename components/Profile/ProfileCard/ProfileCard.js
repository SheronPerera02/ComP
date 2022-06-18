import React from 'react';
import Image from 'next/image';
import classes from './ProfileCard.module.scss';
import {
  MdOutlineLocalPhone,
  MdOutlineEmail,
  MdOutlineStore,
  MdOutlineLink,
  MdOutlineLabel,
} from 'react-icons/md';
import { IoIosAdd, IoLogoGoogle } from 'react-icons/io';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import VCard from 'vcard-creator';
import axios from 'axios';

const ProfileCard = (props) => {
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

  const website = props.profileData?.find(
    (data) => data.name === 'Website Link'
  ).value;

  const email = props.profileData?.find((data) => data.name === 'Email').value;

  const company = props.profileData?.find(
    (data) => data.name === 'Company'
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

  const onAddToContactHandler = () => {
    const myVCard = new VCard();

    myVCard
      .addName(lastName, firstName)
      .addCompany(company)
      .addJobtitle(designation)
      .addEmail(email, 'Email')
      .addPhoneNumber(contactNo, 'CELL')
      .addURL(website)
      .setFilename(firstName + lastName);

    const data = myVCard.buildVCard();

    // window.open('data:text/x-vcard;urlencoded,' + data);

    var url = 'data:text/x-vcard;charset=utf-8,' + encodeURIComponent(data);

    // document.location.href = url;

    var downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${firstName}_${lastName}.vcf`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const composeEmail = (value) => {
    const emailServiceProvider = value.split('@')[1].split('.')[0];

    if (emailServiceProvider === 'gmail') {
      window.open(
        'https://mail.google.com/mail/?view=cm&fs=1&to=' + value,
        '_blank'
      );
    } else if (emailServiceProvider === 'yahoo') {
      window.open('https://compose.mail.yahoo.com/?to=' + value, '_blank');
    } else {
      toast('Cannot open custom email!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: classes.CustomToast,
      });
    }
  };

  const openWebsiteLink = (value) => {
    const url =
      value.slice(0, 4) !== 'http' && value.slice(0, 4) !== 'https'
        ? 'https://' + value
        : value;

    window.open(url, '_blank');
  };

  const addToGoogle = () => {
    window.tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }

      listConnectionNames();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };

  const listConnectionNames = async () => {
    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.people.people.connections.list({
        resourceName: 'people/me',
        pageSize: 10,
        // personFields: 'names,emailAddresses',
      });
    } catch (err) {
      return;
    }
    const connections = response.result.connections;
    if (!connections || connections.length == 0) {
      console.log('No connections found');
      return;
    }
    // Flatten to string to display
    const output = connections.reduce((str, person) => {
      if (!person.names || person.names.length === 0) {
        return `${str}Missing display name\n`;
      }
      return `${str}${person.names[0].displayName}\n`;
    }, 'Connections:\n');
    console.log(output);
  };

  const create = () => {
    window.gapi.client.request({
      method: 'POST',
      path: 'https://people.googleapis.com/v1/people:createContact',
      datatype: 'jsonp',
      parent: 'me',
      body: {
        names: [
          {
            givenName: 'Jo#',
          },
        ],
        emailAddresses: [
          {
            value: 'johashfiscal@gmail.com',
          },
        ],
        phoneNumbers: [
          {
            value: '0774426677',
          },
        ],
      },
    });
  };

  return (
    <div className={classes.ProfileCard}>
      <ToastContainer />
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

        <button onClick={addToGoogle}>
          <IoLogoGoogle />
          Add to Google
        </button>
      </div>
      <div className={classes.Body}>
        <div
          className={classes.ContactInfo}
          onClick={() => {
            window.open('tel:' + contactNo);
          }}
        >
          <span>
            <MdOutlineLocalPhone /> Contact No
          </span>
          <p>{contactNo}</p>
        </div>
        {otherData.map((data, index) => {
          let clickHandler = null;
          let Icon = MdOutlineLabel;

          if (data.name === 'Company') {
            Icon = MdOutlineStore;
          }

          if (data.name === 'Email') {
            clickHandler = composeEmail;
            Icon = MdOutlineEmail;
          }

          if (data.name === 'Website Link') {
            clickHandler = openWebsiteLink;
            Icon = MdOutlineLink;
          }

          if (
            data.value.slice(0, 4) === 'http' ||
            data.value.slice(0, 4) === 'https'
          ) {
            clickHandler = openWebsiteLink;
          }

          return (
            <div
              className={classes.ContactInfo}
              key={index}
              onClick={() => {
                if (clickHandler) {
                  clickHandler(data.value);
                }
              }}
            >
              <span>
                <Icon />
                {data.name}
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

    
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import './contact.css'



export interface Contact {
  id: string;
  name: string;
  surname?: string;
  picture?: string;
  phoneNumbers: { type: string; number: string }[];
  metadata?: {
    email: string;
    address: string;
    website: string;
    birthdate: string;
    notes: string | undefined;
  };
  user_username: string;
}

async function fetchContacts(): Promise<Contact[]> {
  const response = await fetch('http://localhost:3000/contacts');
  if (!response.ok) {
    throw new Error(`Error fetching contacts: ${response.statusText}`);
  }
  const data = await response.json();
  return data as Contact[]; 
}

console.log(fetchContacts());

const contact : Contact = {
    id: "123",
    name: "Ivan",
    surname: "Petrov",
    picture: "resource/pic2.jpg",
    phoneNumbers: [
      {
        type: "Home",
        number: "+1 (555) 234-567-8901"
      },
      {
        type: "Mobile",
        number: "+1 (555) 555-3434"
      },
      {
        type: "Work",
        number: "+1 (555) 552325-3434"
      }
    ],
    metadata: {
      email: "petrov@gmail.com",
      address: "Sofia Bulgaria Square 1.",
      website: "https://www.facebook.com/profile.php?id=7999876875",
      birthdate: "2001-03-21",
      notes: "To call ivancho today. Or maybe later. Or maybe not call him ."
    },
    user_username: "Brother"
  };



function PhoneNumbers() {
    return  <div className="phone-numbers">
    {contact.phoneNumbers.map((phoneNumber, index) => (
      <div key={index} className="phone-number">
        <span className='text-box-label' text-box>{phoneNumber.type}</span> 
        <div className="text-box">{phoneNumber.number}
        <div className="phoneIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" viewBox="0 0 32 32" height="32" fill="none" className="svg-icon"><path stroke-width="2" stroke-linecap="round" stroke="#fff" fill-rule="evenodd" d="m24.8868 19.1288c-1.0274-.1308-2.036-.3815-3.0052-.7467-.7878-.29-1.6724-.1034-2.276.48-.797.8075-2.0493.9936-2.9664.3258-1.4484-1.055-2.7233-2.3295-3.7783-3.7776-.6681-.9168-.4819-2.1691.3255-2.9659.5728-.6019.7584-1.4748.4802-2.2577-.3987-.98875-.6792-2.02109-.8358-3.07557-.2043-1.03534-1.1138-1.7807-2.1694-1.77778h-3.18289c-.60654-.00074-1.18614.25037-1.60035.69334-.40152.44503-.59539 1.03943-.53345 1.63555.344 3.31056 1.47164 6.49166 3.28961 9.27986 1.64878 2.5904 3.84608 4.7872 6.43688 6.4356 2.7927 1.797 5.9636 2.9227 9.2644 3.289h.1778c.5409.0036 1.0626-.2 1.4581-.569.444-.406.6957-.9806.6935-1.5822v-3.1821c.0429-1.0763-.7171-2.0185-1.7782-2.2046z" clip-rule="evenodd"></path></svg>
          </div>  
        </div>
      </div>
    ))}
  </div>
};

function PosibleLongerText(props: { maxChars: number; text: string; }){
  const maxChars = props.maxChars; 
  const currentText = props.text; 
  const LongText = useRef(null);


  function truncateText(text: string, maxLength: number) {
    if (text && text.length > maxLength)
      return text.slice(0, maxLength) + '...';
    return text;
  }

  function handleEnter() {
    if (!LongText.current) return;
    const currentElement = LongText.current as HTMLElement;
    currentElement.style.transition = "all 0.1s";
    currentElement.classList.add("text__pop-up");
    currentElement.textContent = currentText;
  }

  function handleLeave() {
    if (!LongText.current) return "";
    const currentElement = LongText.current as HTMLElement;
    currentElement.classList.add("text__pop-up");
    currentElement.textContent = truncateText(currentText, maxChars);
  }

  return  <span ref={LongText} onMouseEnter={handleEnter} onMouseLeave={handleLeave} >
        {truncateText(currentText, maxChars)}
        </span>
}


function NavBar(contact){
  return  <div className='navBar'>
            <button className="button-back">
              <div className="button-box">
                <span className="button-elem">
                  <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                    ></path>
                  </svg>
                </span>
                <span className="button-elem">
                  <svg viewBox="0 0 46 40">
                    <path
                      d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                    ></path>
                  </svg>
                </span>
              </div>
            </button>
              <button className="edit-btn">
                <svg className="svg-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="#0b932d" stroke-linecap="round" stroke-width="2"><path d="m20 20h-16"></path>
                  <path
                    clip-rule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fill-rule="evenodd"></path></g></svg>
                <span className="lable-back">Edit</span>
              </button>
          </div>
}

function ContactHeader(contact){
    return  <div className='contact-header'>
      <div className="profile-name">{contact.user_username}</div>
      <div className="profileImage">
          <img src={contact.picture} alt="Contact" className="circular-image" />
      </div>
    </div>
}

function ContactDetails(contact) {
  return (
    <div className="card">
      <NavBar/>
      <ContactHeader/>
      <div className="contact-info">
        <div className='full-Name'>
          <span className='text-box-label' text-box>Name </span>
          <div className="text-box">{contact.name} {contact.surname} </div>
        </div>
          <PhoneNumbers/>
          <div className='metadata'>
            <label className="notes-label">Notes</label>
            <div className="text-notes">{contact?.metadata?.notes}</div>
            <span className='text-box-label' text-box>Email </span>
            <div className="text-box"><PosibleLongerText text={contact?.metadata?.email} maxChars= {25} /> <i className="gg-mail"></i></div>
            <span className='text-box-label' text-box>Adress </span>
            <div className="text-box"><PosibleLongerText text={contact?.metadata?.address} maxChars={25}/> <i className='adressIcon'></i></div>
            <span className='text-box-label' text-box>Website </span>
            <div className="text-box"><PosibleLongerText text={contact?.metadata?.website} maxChars={25}/> <i className="gg-website"></i></div>
            <span className='text-box-label' text-box>Birth date </span>
            <div className="text-box">{contact?.metadata?.birthdate} <i className="gg-menu-cake"></i></div>
          </div>
      </div>
    </div>
  );

};

export default ContactDetails;


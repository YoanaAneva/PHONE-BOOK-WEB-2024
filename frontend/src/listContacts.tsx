import React, { useState, useEffect } from 'react';
import './listContacts.css'
import {Contact} from './Contact';



const contacts = [
  { id: "1", name: "John", surname: "Doe", picture: "resource/pic0.png", user_username: "Friend", phone: "123-456-7890" },
  { id: "2", name: "Ivan", surname: "Petrov", picture: "resource/pic2.jpg", user_username: "Brother", phone: "234-567-8901" },
  { id: "3", name: "Bob", surname: "Johnson", picture: "resource/pic3.jpg", user_username: "Schoolmate", phone: "345-678-9012" },
  { id: "4", name: "Emily", surname: "Davis", picture: "resource/pic4.jpg", user_username: "Work colleague", phone: "456-789-0123" },
  { id: "5", name: "Michael", surname: "Wilson", picture: "resource/pic5.jpg", user_username: "Neighbor", phone: "567-890-1234" },
  { id: "6", name: "Sophia", surname: "Martinez", picture: "resource/pic6.jpg", user_username: "Teammate", phone: "678-901-2345" },
  { id: "7", name: "James", surname: "Anderson", picture: "resource/pic7.jpg", user_username: "Business", phone: "789-012-3456" },
  { id: "8", name: "Olivia", surname: "Taylor", picture: "resource/pic8.jpg", user_username: "Classmate", phone: "890-123-4567" },
  { id: "9", name: "William", surname: "Brown", picture: "resource/pic0.png", user_username: "Friend", phone: "901-234-5678" },
  { id: "10", name: "Emma", surname: "Lee", picture: "resource/pic10.jpg", user_username: "Neighbor", phone: "012-345-6789" },
  { id: "11", name: "Liam", surname: "Johnson", picture: "resource/pic0.png", user_username: "Friend", phone: "123-456-7890" }
]


// async function fetchContacts(): Promise<Contact[]> {
//   const response = await fetch('https://api.example.com/contacts');
//   if (!response.ok) {
//     throw new Error(`Error fetching contacts: ${response.statusText}`);
//   }
//   const contacts = await response.json();
//   return contacts as Contact[]; 
// }

function LastContactsList() {
  const LastContacts = contacts.reverse().slice(3, 7);

  return (
    <ul className='ul-top3-contacts'>
      {LastContacts.map(contact => (
        <li key={contact.id} className='list-box'>
          <img className='contact-list-picture' src={contact.picture} alt={`${contact.name} ${contact.surname}`} />
        </li>
      ))}
    </ul>
  );
}

function Search(){
  return <div className="group">
  <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
    <g>
      <path
        d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
      ></path>
    </g>
  </svg>

  <input
    id="query"
    className="input"
    type="search"
    placeholder="Search..."
    name="searchbar"
  />
</div>

}

function AddButton() {
  return (
    <button className="add-button">
      <span>+</span>
    </button>
  );
}

function SettingsButton() {
  return (
    <button className="settings-button">
    <span className="icon">⚙️</span>
    <span className="text">Settings</span>
  </button>
  );
}



function ContactBox(props) {
  return  <li key={props.contact.id} className='list-box' >
            <img className='contact-list-picture' src={props.contact.picture} alt={`${props.contact.name} ${props.contact.surname}`} />
            <div className='contact-text'>
            <div className='name-contact'> {props.contact.name}  {props.contact.surname} </div>
            <div className='phone-number'> {props.contact.phone} </div>
            </div>
            <div> <span className='text-span'> {props.user_username} </span> </div>
          </li>
}

function ContactList()  {
  return (
    <div className='contact-list-card' >
      <div className='navbar'>
        <SettingsButton/>
      <AddButton/>
      </div>
    <Search/>
    <section>
    <span className='head-text'> Favorite </span>
    <LastContactsList/>
    <span className='head-text'>  All Contacts</span>
    <ul className='ul-contacts'>
      {contacts.map(contact => (
        <ContactBox contact={contact}/>
      ))}
    </ul>
    </section>
  </div>);
};

export default ContactList;

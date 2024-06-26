import React, { useState, useEffect } from 'react';
import './listContacts.css'
import {Contact} from './Contact';
import { useNavigate } from 'react-router-dom';

export async function fetchContacts(): Promise<Contact[]> {
  const response = await fetch('http://localhost:3000/contacts');
  if (!response.ok) {
    throw new Error(`Error fetching contacts: ${response.statusText}`);
  }
  const data = await response.json();
  return data as Contact[]; 
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
  const navigate = useNavigate();

  const navigateToCreateContact = () => {
    navigate('/create-contect')
  }

  return (
    <button className="add-button" onClick={navigateToCreateContact}>
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
  const navigate = useNavigate();

  const handleContactClick = (id) => {
    navigate(`/contact-details/${id}`);
  }

  return  <li key={props.contact._id} className='list-box' onClick={() => handleContactClick(props.contact._id)}>
            <img className='contact-list-picture' src={props.contact.picture} alt={`${props.contact.name} ${props.contact.surname}`} />
            <div className='contact-text'>
              <div className='name-contact'> {props.contact.name}  {props.contact.surname} </div>
              <div className='phone-number'> {props.contact.phone} </div>
            </div>
            <div> <span className='text-span'> {props.user_username} </span> </div>
          </li>
}

function ContactList()  {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    async function loadContacts() {
      try {
        const data = await fetchContacts();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    loadContacts();
  }, []);

  return (
    <div className='contact-list-card' >
      <div className='navbar'>
        <SettingsButton/>
      <AddButton/>
      </div>
    <Search/>
    <section>
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

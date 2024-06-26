import React, { useState, useEffect } from 'react';
import { Contact } from './Contact';
import { useNavigate } from "react-router-dom";
import './MergeContacts.css'

async function fetchContacts(): Promise<Contact[]> {
    const response = await fetch('http://localhost:3000/contacts');
    if (!response.ok) {
      throw new Error(`Error fetching contacts: ${response.statusText}`);
    }
    const data = await response.json();
    return data as Contact[]; 
}

async function updateContact(contact) {
    const { _id, ...contactData } = contact;
    const requestBody = JSON.stringify(contactData);
    const response = await fetch(`http://localhost:3000/contacts/${contact._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: requestBody});

    if (!response.ok) {
      throw new Error(`Error merging contacts: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

async function deleteContact(contactId: string) {
    const response = await fetch(`http://localhost:3000/contacts/${contactId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting the contact: ${response.statusText}`);
    }
    return response;
}

const removeEmptyFields = (obj: any) => {
    const newObj = Array.isArray(obj) ? [] : {};
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const nested = removeEmptyFields(obj[key]);
        if (Object.keys(nested).length > 0 || Array.isArray(obj[key])) {
          newObj[key] = nested;
        }
      } else if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  };

export function MergeContacts(props) {
    const navigate = useNavigate();

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [secondaryContact, setSecondaryContact] = useState<Contact>({} as Contact);

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

    const handleMerging = async () => {
        console.log("primary", props.primaryContact)
        console.log("secondary",secondaryContact)
        const mergedContact: Contact = {
            _id: props.primaryContact._id,
            name: props.primaryContact.name,
            surname: props.primaryContact.surname || secondaryContact.surname || '',
            picture: props.primaryContact.picture,
            phoneNumbers: [...props.primaryContact.phoneNumbers, ...secondaryContact.phoneNumbers],
            metadata: {
              email: props.primaryContact.metadata?.email || secondaryContact.metadata?.email || '',
              address: props.primaryContact.metadata?.address || secondaryContact.metadata?.address || '',
              website: props.primaryContact.metadata?.website || secondaryContact.metadata?.website || '',
              birthdate: props.primaryContact.metadata?.birthdate || secondaryContact.metadata?.birthdate || '',
              notes: props.primaryContact.metadata?.notes || secondaryContact.metadata?.notes || '',
            },
            user_username: props.primaryContact.user_username,
        };


        let contactToSend = removeEmptyFields(mergedContact);
        console.log("merged", contactToSend)

        try {
          const data = await updateContact(contactToSend);
          
        } 
        catch(error) {
          console.log('Error merging contacts:', error);
        }
        try {
            await deleteContact(secondaryContact._id);
        } 
        catch(error) {
            console.error('Error deleting contact:', error);
        }
        navigate('/');
    }
  
    return (
    <div className="contacts-list">
        <div className="contacts-container">
          {contacts
            .filter((contact) => contact._id !== props.primaryContact._id)
            .map((contact) => (
                <label key={contact._id} className="contact-wrapper">
                  <input type="radio"
                    name="secondary-contact"
                    onChange={() => setSecondaryContact(contact)}
                  />
                  <img
                    className="contact-picture"
                    src={contact.picture}
                    alt={`${contact.name} ${contact.surname}`}
                  />
                  <div className="name-contact">
                    {contact.name} {contact.surname}
                  </div>
                </label>
            ))}
        </div>
        <button onClick={handleMerging}>Merge</button>
    </div>);
};
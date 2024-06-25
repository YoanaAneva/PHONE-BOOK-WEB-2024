import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import './CreateContact.css';

async function addContact(contact) {
    const requestBody = JSON.stringify(contact);
    const response = await fetch('http://localhost:3000/contacts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: requestBody});

    if (!response.ok) {
      throw new Error(`Error creating a contact: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

function isContactValid(contact) {
  if (contact.metadata) {
    if (contact.metadata.email && !isEmailValid(contact.metadata.email)) {
      return false;
    }  

    for (let phoneNumber of contact.phoneNumbers) {
      if (!isPhoneNumberValid(phoneNumber.number)) {
        return false;
      }
    }
  }
  return true;  
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


function isEmailValid(email: string) {
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validEmail.test(email) || !email;
}

function isPhoneNumberValid(phoneNumber: string) {
  const validphone = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/;
  return validphone.test(phoneNumber) || !phoneNumber;
}

export function CreateContact() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contact, setContact] = useState({
      name: '',
      surname: '',
      picture: {} as File | string,
      phoneNumbers: [{ type: 'MOBILE', number: '' }],
      metadata: {
          email: '',
          address: '',
          website: '',
          birthdate: '',
          notes: ''
      },
      user_username: user?.username || 'defaultUsername',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setContact({ ...contact, [name]: value, });
    } 

    const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setContact({ ...contact, metadata: { ...contact.metadata, [name]: value, }});
    } 

    const handlePhoneNumberChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const newPhoneNumbers = contact.phoneNumbers.map((phoneNumber, i) => {
        if (i === index) {
          return { ...phoneNumber, [name]: value };
        }
        return phoneNumber;
      });
      setContact({ ...contact, phoneNumbers: newPhoneNumbers });
    };

    const addPhoneNumber = () => {
      setContact({...contact, phoneNumbers: [...contact.phoneNumbers, { number: '', type: 'MOBILE' }], });
    };

    const removePhoneNumber = (index: number) => {
      const newPhoneNumbers = contact.phoneNumbers.filter((_, i) => i !== index);
      setContact({ ...contact, phoneNumbers: newPhoneNumbers });
    };

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setContact({ ...contact, picture: file });
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitted(true);

      contact.user_username = user!.username;
      contact.picture = ' '; // TODO handle pictures
      
      if(!isContactValid(contact)) { 
        return;
      }

      const contactToSend = removeEmptyFields(contact);
      try {
        const data = await addContact(contactToSend);
        
      } catch (error) {
        console.log('Error creating contact:', contactToSend, error);
      }
      navigate('/');
    }
         
    return (
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-section">
            <label>Name</label>
            <input type="text" name="name" value={contact.name} onChange={handleChange} required />
          </div>
          <div className="input-section">
            <label>Surname</label>
            <input type="text" name="surname" value={contact.surname} onChange={handleChange} />  
          </div>
          <div className="input-section">
            <label>Phone Numbers</label>
            {contact.phoneNumbers.map((phoneNumber, index) => (
              <div key={index} className="phone-number-section">
                <input className="number-part" type="text" name="number" value={phoneNumber.number} onChange={(e) => handlePhoneNumberChange(index, e)} placeholder="Phone Number" required />
                <select className="number-part" name="type" value={phoneNumber.type} onChange={(e) => handlePhoneNumberChange(index, e)}>
                  <option value="MOBILE">MOBILE</option>
                  <option value="WORK">WORK</option>
                  <option value="HOME">HOME</option>
                </select>
                {isSubmitted && !isPhoneNumberValid(phoneNumber.number) && <p className="error-msg">Invalid phone number</p>}
                <button className="number-part" type="button" onClick={() => removePhoneNumber(index)}>Remove</button>
              </div>
            ))}
            <button className="add-number-btn" type="button" onClick={addPhoneNumber}>Add Phone Number</button>
          </div>
          <div className="input-section">
            <label>Email</label>
            <input type="text" name="email" value={contact.metadata.email} onChange={handleMetadataChange}/>
            {isSubmitted && !isEmailValid(contact.metadata.email) && <p className="error-msg">Invalid email format!</p>}
          </div>
          <div className="input-section">
            <label>Address</label>
            <input type="text" name="address" value={contact.metadata.address} onChange={handleMetadataChange} />
          </div>
          <div className="input-section">
            <label>Website</label>
            <input type="text" name="website" value={contact.metadata.website} onChange={handleMetadataChange} />
          </div>
          <div className="input-section birthday-box">
            <label>Birthdate</label>
            <input className="birthday-input" type="date" name="birthdate" value={contact.metadata.birthdate} onChange={handleMetadataChange} read-only />          </div>
          <div className="input-section">
            <label>Notes</label>
            <input type="text" name="notes" value={contact.metadata.notes} onChange={handleMetadataChange} />
          </div>
          <div className="input-section">
            <label>Choose a picture</label>
            <input className="picture-input" type="file" name="picture" accept="image/png, image/jpeg, image/jpg" onChange={handlePictureChange} />
          </div>
          <button className="add-contact-btn" type="submit">Add Contact</button>
        </form>
      </div>)
}
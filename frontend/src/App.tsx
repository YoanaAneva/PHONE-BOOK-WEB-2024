import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactsList from './listContacts';
import ContactDetails from './Contact';
import ContactList from './listContacts';


function App() {
  return  <Router>
            <Routes>
            <Route path="/" element={<ContactList/>} />
            <Route path="/contact-details/:id" element={<ContactDetails/>} /> 
            </Routes>
          </Router>
}


export default App;
import React from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('contacts')) {
      const localStorageState = JSON.parse(localStorage.getItem('contacts'));
      if (localStorageState.length) {
        setContacts(localStorageState);
      }
    }
  }, []);

  useEffect(() => {
    if (!contacts.length) {
      console.log('return');
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const submitHandler = newContact => {
    const ContactExist = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (ContactExist) {
      alert(newContact.name + 'is already in contacts.');
      return;
    }
    setContacts([...contacts, newContact]);
  };

  const generateContactList = () => {
    let contactList;

    if (filter) {
      contactList = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      contactList = contacts;
    }
    return contactList;
  };

  const deleteContact = contactID => {
    const newArray = contacts.filter(contact => contact.id !== contactID);
    setContacts(newArray);
  };

  return (
    <div
      style={{
        height: '100vh',
        color: '#010101',
      }}
    >
      <Section title={'Phonebook'}>
        <ContactForm onSubmit={contact => submitHandler(contact)} />
      </Section>

      <Section title={'Contacts'}>
        <Filter onChange={value => setFilter(value)} />
        <ContactList
          contacts={generateContactList()}
          onClickDelete={contactID => deleteContact(contactID)}
        />
      </Section>
    </div>
  );
};

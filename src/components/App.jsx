import React from 'react';
import { Component } from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevState) {
    if (prevState.contact !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  submitHandler = newContact => {
    const ContactExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (ContactExist) {
      alert(newContact.name + 'is already in contacts.');
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterHandler = value => {
    this.setState({
      filter: value,
    });
  };

  generateContactList = () => {
    const { contacts, filter } = this.state;
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

  deleteContact = contactID => {
    const newArray = this.state.contacts.filter(
      contact => contact.id !== contactID
    );
    this.setState({
      contacts: newArray,
    });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          color: '#010101',
        }}
      >
        <Section title={'Phonebook'}>
          <ContactForm onSubmit={contact => this.submitHandler(contact)} />
        </Section>

        <Section title={'Contacts'}>
          <Filter onChange={value => this.filterHandler(value)} />
          <ContactList
            contacts={this.generateContactList()}
            onClickDelete={contactID => this.deleteContact(contactID)}
          />
        </Section>
      </div>
    );
  }
}

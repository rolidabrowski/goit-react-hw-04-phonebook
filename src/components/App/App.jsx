import css from './App.module.css';
import { useState } from 'react';
import { ContactForm } from '../ContactForm';
import { ContactList } from '../ContactList';
import { Filter } from '../Filter';
import { useLocalStorage } from '../hooks';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const saveContact = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const contact = {
      id: nanoid(),
      name: form.elements.name.value,
      number: form.elements.number.value,
    };

    if (
      contacts.find(
        item => item.name === contact.name || item.number === contact.number
      )
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    setContacts([...contacts, contact]);
    form.reset();
  };

  const handleSearch = event => {
    setFilter(event.currentTarget.value.toLowerCase());
  };

  const showContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onRemove = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  };

  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={saveContact} />
      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChange={handleSearch} />
      <ContactList contacts={showContacts()} onRemove={onRemove} />
    </div>
  );
};

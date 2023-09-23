import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const handleFormSubmit = newContact => {
    const isNameExist = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isNameExist) return alert(`${isNameExist.name} is already in contacts`);

    const contact = {
      id: nanoid(),
      ...newContact,
    };

    setContacts(prev => [contact, ...prev]);
  };

  const handleDeleteButton = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();
  return (
    <div>
      <Section title="Phonebook">
        <ContactForm handleFormSubmit={handleFormSubmit} />
      </Section>
      {contacts.length >= 1 && (
        <Section title="Contacts">
          <Filter name={filter} handleFilterChange={handleFilterChange} />
          <ContactList
            contacts={filteredContacts}
            handleDeleteButton={handleDeleteButton}
          />
        </Section>
      )}
    </div>
  );
};

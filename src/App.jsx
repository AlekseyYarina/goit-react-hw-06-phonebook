import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  removeContact,
  setFilter,
} from './redux/contacts/contactsReducer';
import { ContactForm, ContactList, Filter } from 'components';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);
  const filter = useSelector(store => store.contacts.filter);

  const handleAddContact = formData => {
    const hasDuplicates = contacts.some(
      contact => contact.name === formData.name
    );
    if (hasDuplicates) {
      alert(`${formData.name} is already in contact.`);
      return;
    }

    const finalContact = { id: nanoid(), ...formData };
    const action = addContact(finalContact);
    dispatch(action);
  };

  const handleDeleteContact = contactId => {
    const action = removeContact(contactId);
    dispatch(action);
  };

  const handleChangeFilter = e => {
    const value = e.target.value;
    const action = setFilter(value);
    dispatch(action);
  };

  const filteredContacts = () => {
    const filterValue = filter || '';
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.trim().toLowerCase())
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        contacts={filteredContacts()}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

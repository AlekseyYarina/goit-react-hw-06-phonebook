import { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  // const [contacts, setContacts] = useState(
  //   JSON.parse(localStorage.getItem('contacts')) ?? []
  // );
  // const [filter, setFilter] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);
  const filter = useSelector(store => store.contacts.filter);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = formData => {
    const hasDuplicates = contacts.some(
      contact => contact.name === formData.name
    );
    if (hasDuplicates) {
      alert(`${formData.name} is already in contact.`);
      return;
    }

    const finalContact = { id: nanoid(), ...formData };
    // setContacts(prevState => [...prevState, finalContact]);
    const action = {
      type: 'contacts/addContact',
      payload: finalContact,
    };
    dispatch(action);
  };

  const handleDeleteContact = contactId => {
    const action = {
      type: 'contacts/removeContact',
      payload: contactId,
    };
    dispatch(action);

    // setContacts(prevContacts =>
    //   prevContacts.filter(contact => contact.id !== contactId)
    // );
  };

  const handleChangeFilter = e => {
    const value = e.target.value;
    const action = {
      type: 'contacts/setFilter',
      payload: value,
    };
    dispatch(action);

    // setFilter(value);
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

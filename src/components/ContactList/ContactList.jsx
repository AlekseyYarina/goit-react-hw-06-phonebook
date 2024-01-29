import { useSelector } from 'react-redux';
import { ContactElement } from 'components';
import css from './ContactList.module.css';
import { selectContacts, selectFilter } from 'redux-state/contacts/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const getFilteredContacts = () => {
    const filterValue = filter || '';
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.trim().toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <ul className={css.contacts}>
      {filteredContacts.map(contact => (
        <ContactElement
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
        />
      ))}
    </ul>
  );
};

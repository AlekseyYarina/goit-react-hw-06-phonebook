import { ContactElement } from 'components';
import css from './ContactList.module.css';
// import { useSelector } from 'react-redux';

export const ContactList = ({ contacts, handleDeleteContact }) => {
  // const state = useSelector(store => store);
  // console.log('state', state);

  return (
    <ul className={css.contacts}>
      {contacts.map(contact => (
        <ContactElement
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          handleDeleteContact={handleDeleteContact}
        />
      ))}
    </ul>
  );
};

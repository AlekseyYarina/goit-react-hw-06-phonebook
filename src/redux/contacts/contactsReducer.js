const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],
  filter: '',
};

export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'contacts/addContact': {
      return { ...state, contacts: [...state.contacts, action.payload] };
    }
    case 'contacts/removeContact': {
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
      };
    }
    case 'contacts/setFilter': {
      return { ...state, filter: action.payload };
    }
    default:
      return state;
  }
};

import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux-state/contacts/contactsReducer';
import { selectFilter } from 'redux-state/contacts/selectors';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChangeFilter = e => {
    const value = e.target.value;
    const action = setFilter(value);
    dispatch(action);
  };

  return (
    <div className={css.filter}>
      <p>Find contact by name:</p>
      <input
        value={filter}
        onChange={handleChangeFilter}
        type="text"
        name="keyword"
        placeholder="Ivan..."
      />
    </div>
  );
};

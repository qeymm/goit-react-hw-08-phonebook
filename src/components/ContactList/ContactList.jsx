import { ContactListItem } from '../ContactListItem/ContactListItem';
import { Loader } from '../Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredContacts,
  selectError,
  selectIsLoading,
} from '../../redux/selectors';
import { fetchContacts } from '../../redux/operations';
import css from './ContactList.module.css';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <ul className={css.status}>
        {/* If loading and not error, show Loader */}
        {isLoading && !error && (
          <li className={css.loaderRow}>
            <Loader />
          </li>
        )}

        {/* If not loading, not error, and filtered contacts is empty, show warning */}
        {!isLoading && !error && filteredContacts.length === 0 && (
          <p>No contacts found.</p>
        )}

        {/* If not loading, not error and have atleast 1 fitlered contact, show ContactListItem component */}
        {!isLoading &&
          !error &&
          filteredContacts.length > 0 &&
          filteredContacts.map(filteredContact => (
            <ContactListItem
              key={filteredContact.id}
              filteredContact={filteredContact}
            />
          ))}
      </ul>
    </>
  );
};

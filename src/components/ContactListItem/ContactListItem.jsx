import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';

export const ContactListItem = ({ filteredContact }) => {
  const dispatch = useDispatch();

  // Handle Delete
  const handleDelete = () => {
    dispatch(deleteContact(filteredContact.id));
  };

  return (
    <>
      <li className={css.list_item}>
        <p>{filteredContact.name}:</p>
        <p>{filteredContact.number}</p>
        <button className={css.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
      </li>
    </>
  );
};

ContactListItem.propTypes = {
  filteredContact: PropTypes.object.isRequired,
};

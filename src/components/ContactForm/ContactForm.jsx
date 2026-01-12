import { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';
import { selectContacts } from '../../redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // If name and number is empty it will not submit
    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    // If existing contact exist it will not submit
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    // dispatch(addContact({ name: name, number: number }));
    dispatch(addContact({ name, number }));

    // Reset form
    setName('');
    setNumber('');
  };

  return (
    <>
      <form className={css.form_container} onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            // Should always be paired (value and onChange)
            value={name}
            onChange={handleNameChange}
          />
        </label>

        <label>
          <p>Number</p>
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            // Should always be paired (value and onChange)
            value={number}
            onChange={handleNumberChange}
          />
        </label>

        <button className={css.submitBtn} type="submit">
          Add Contact
        </button>
      </form>
    </>
  );
};

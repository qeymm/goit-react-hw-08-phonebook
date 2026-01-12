import { ContactForm } from '../../components/ContactForm/ContactForm';
import { ContactList } from '../../components/ContactList/ContactList';
import { Filter } from '../../components/Filter/Filter';
import css from './ContactsPage.module.css';

export const ContactsPage = () => {
  return (
    <div className={css.container}>
      <div className={css.content}>
        <h1 className={css.heading}>Phonebook</h1>
        <ContactForm />
        <h2 className={css.subheading}>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </div>
  );
};

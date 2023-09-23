import { useState } from 'react';
import css from './ContactForm.module.css';

export const ContactForm = ({ handleFormSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    handleFormSubmit({ name, number });
    cleanFormData();
  };

  const cleanFormData = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.inputWrap}>
        <label htmlFor="exampleInputName1" className={css.formLabel}>
          Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          className="formInput"
          id="exampleInputName1"
          aria-describedby="emailHelp"
          onChange={handleChange}
        />
      </div>
      <div className={css.inputWrap}>
        <label htmlFor="exampleInputNumber1" className={css.formLabel}>
          Number
        </label>
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          className="formInput"
          id="exampleInputNumber1"
          aria-describedby="emailHelp"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={css.btnSubmit}>
        Add contact
      </button>
    </form>
  );
};

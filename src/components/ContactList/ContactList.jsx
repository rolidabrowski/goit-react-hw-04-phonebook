import Proptypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onRemove }) => {
  return (
    <section className={css.list}>
      <ul>
        {contacts.map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            <span className={css.text}>{name}</span>
            <span className={css.text}>{number}</span>
            <button
              type="button"
              className={css.button}
              onClick={() => onRemove(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

ContactList.propTypes = {
  contacts: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      name: Proptypes.string.isRequired,
      number: Proptypes.string.isRequired,
    })
  ).isRequired,
  onRemove: Proptypes.func.isRequired,
};

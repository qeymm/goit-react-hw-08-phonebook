import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { selectFilter } from '../../redux/selectors';
import { DebounceInput } from 'react-debounce-input';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value.trim()));
  };

  return (
    <>
      <p className={css.label}>Find Contacts by Name</p>
      <DebounceInput
        className={css.searchBox}
        type="text"
        name="filter"
        placeholder="Search by name"
        value={filter}
        onChange={handleFilterChange}
        debounceTimeout={500}
      />
    </>
  );
};

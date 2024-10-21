const Filter = ({ value, setFilter }) => {
  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <div>
      filter shown with <input value={value} onChange={onFilterChange} />
    </div>
  );
};

export default Filter;

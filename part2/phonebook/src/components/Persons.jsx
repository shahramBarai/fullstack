import personsService from "../services/persons";

const Person = ({ person, setPersons }) => {
  const openDeleteAlertWindow = () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .remove(person.id)
        .then((deletedPerson) => {
          setPersons((persons) =>
            persons.filter((person) => person.id !== deletedPerson.id)
          );
        })
        .catch(() => {
          alert(`${person.name} was already removed from server`);
          setPersons((persons) => persons.filter((p) => p.id !== person.id));
        });
    }
  };
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={openDeleteAlertWindow}>Delete</button>
    </div>
  );
};

const Persons = ({ persons, setPersons, filter }) => {
  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <Person key={person.id} person={person} setPersons={setPersons} />
          );
        }
      })}
    </div>
  );
};

export default Persons;

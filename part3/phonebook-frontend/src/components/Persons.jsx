import personsService from "../services/persons";

const Person = ({ person, setPersons, setNotificationsTimeout }) => {
  const openDeleteAlertWindow = () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .remove(person.id)
        .then((deletedPerson) => {
          setNotificationsTimeout(`Deleted ${person.name}`);
          setPersons((persons) => persons.filter((p) => p.id !== person.id));
        })
        .catch(() => {
          setNotificationsTimeout(
            `${person.name} was already removed from server`,
            true
          );
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

const Persons = ({ persons, setPersons, filter, setNotificationsTimeout }) => {
  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <Person
              key={person.id}
              person={person}
              setPersons={setPersons}
              setNotificationsTimeout={setNotificationsTimeout}
            />
          );
        }
      })}
    </div>
  );
};

export default Persons;

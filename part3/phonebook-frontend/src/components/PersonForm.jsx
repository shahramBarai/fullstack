import { useState } from "react";
import personsService from "../services/persons";

const PersonForm = ({ persons, setPersons, setNotificationsTimeout }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const createPerson = (newPerson) => {
    personsService
      .create(newPerson)
      .then((newPerson) => {
        setNotificationsTimeout(`Added ${newPerson.name}`);
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          const existing_person = error.response.data.person;
          if (
            window.confirm(
              `${existing_person.name} is already added to the phonebook, replace the old number (${existing_person.number}) with a new one?`
            )
          ) {
            const changedPerson = {
              ...existing_person,
              number: newPerson.number,
            };
            updatePerson(existing_person.id, changedPerson);
          }
        } else {
          setNotificationsTimeout(error.response.data.error, true);
        }
      });
  };

  const updatePerson = (person_id, changedPerson) => {
    personsService
      .update(person_id, changedPerson)
      .then((returnedPerson) => {
        setPersons((persons) =>
          persons.map((p) => (p.id !== person_id ? p : returnedPerson))
        );
        setNotificationsTimeout(`Updated ${returnedPerson.name}`);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setNotificationsTimeout("Error updating person", true);
        personsService.getAll().then((persons) => {
          setPersons(persons);
        });
        console.error(error);
      });
  };

  const onAddClick = (event) => {
    event.preventDefault();
    if (newName === "" || newNumber === "") {
      setNotificationsTimeout("Name and number are required", true);
      return;
    }
    if (persons.find((person) => person.number === newNumber)) {
      setNotificationsTimeout(
        `${newNumber} is already occupied by another person`,
        true
      );
      return;
    }
    createPerson({ name: newName, number: newNumber });
    // if (persons.find((person) => person.name === newName)) {
    //   if (
    //     window.confirm(
    //       `${newName} is already added to the phonebook, replace the old number with a new one?`
    //     )
    //   ) {
    //     const person = persons.find((person) => person.name === newName);
    //     const changedPerson = { ...person, number: newNumber };
    //     updatePerson(person, changedPerson);
    //   }
    // } else {

    // }
  };

  return (
    <form>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onAddClick}>
          Add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;

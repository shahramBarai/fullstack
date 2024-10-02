import { useState } from "react";
import personsService from "../services/persons";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const createPerson = (newPerson) => {
    personsService.create(newPerson).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const updatePerson = (person, changedPerson) => {
    personsService
      .update(person.id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== returnedPerson.id ? person : returnedPerson
          )
        );
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          if (
            window.confirm(
              `${person.name} was already removed from server. Do you want to add this person?`
            )
          ) {
            personsService
              .create({
                name: changedPerson.name,
                number: changedPerson.number,
              })
              .then((newPerson) => {
                setPersons((persons) =>
                  persons.map((p) => (p.id !== person.id ? p : newPerson))
                );
              });
          } else {
            setPersons((persons) => persons.filter((p) => p.id !== person.id));
          }
          setNewName("");
          setNewNumber("");
        } else {
          alert(`Error: ${error.response.data.error}`);
        }
      });
  };

  const onAddClick = (event) => {
    event.preventDefault();
    if (newName === "" || newNumber === "") {
      alert("Please enter name and number");
      return;
    }
    if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} is already occupied by another person`);
      return;
    }
    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };
        updatePerson(person, changedPerson);
      }
    } else {
      createPerson({ name: newName, number: newNumber });
    }
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

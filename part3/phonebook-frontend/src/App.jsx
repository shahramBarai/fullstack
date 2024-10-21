import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const setNotificationsTimeout = (message, error = false) => {
    setNotifications((oldNotifications) => [
      ...oldNotifications,
      { message, error },
    ]);
    setTimeout(() => {
      setNotifications((oldNotifications) =>
        oldNotifications.filter((n) => n.message !== message)
      );
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          message={notification.message}
          error={notification.error}
        />
      ))}
      <Filter value={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotificationsTimeout={setNotificationsTimeout}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={filter}
        setNotificationsTimeout={setNotificationsTimeout}
      />
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countryNames, setCountryNames] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const names = response.data.map((country) => country.name.common);
        setCountryNames(names);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (countryNames === null) {
    return <div>loading...</div>;
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <div>
        find countryNames <input value={filter} onChange={handleFilterChange} />
      </div>
      <Countries
        countryNames={countryNames}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default App;

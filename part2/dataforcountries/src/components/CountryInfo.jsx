import { useEffect, useState } from "react";
import axios from "axios";

const CountryInfo = ({ countryName }) => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`
      )
      .then((response) => {
        setCountryData(response.data);
      });
  }, []);

  if (countryData === null) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <div>capital {countryData.capital[0]}</div>
      <div>area {countryData.area}</div>
      <div>population {countryData.population}</div>
      <h2>languages</h2>
      <ul>
        {Object.values(countryData.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={countryData.flags.png}
        alt={countryData.name.common}
        width="200"
      />
    </div>
  );
};

export default CountryInfo;

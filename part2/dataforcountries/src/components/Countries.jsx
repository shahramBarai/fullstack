import { useEffect, useState } from "react";
import CountryInfo from "./CountryInfo";

const Countries = ({ countryNames, filter }) => {
  const [showCountryNames, setShowCountryNames] = useState([]);

  useEffect(() => {
    if (countryNames !== null) {
      const filteredNames = countryNames.filter((name) =>
        name.toLowerCase().includes(filter.toLowerCase())
      );
      setShowCountryNames(filteredNames);
    }
  }, [filter, countryNames]);

  return (
    <div>
      {showCountryNames.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : showCountryNames.length === 1 ? (
        <CountryInfo countryName={showCountryNames[0]} />
      ) : (
        showCountryNames.map((name) => <div key={name}>{name}</div>)
      )}
    </div>
  );
};

export default Countries;

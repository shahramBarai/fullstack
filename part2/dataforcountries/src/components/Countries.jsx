import { useEffect, useState } from "react";
import CountryInfo from "./CountryInfo";

const Country = ({ countryName, onShowClick }) => {
  return (
    <div>
      {countryName}
      <button onClick={() => onShowClick(countryName)}>Show</button>
    </div>
  );
};

const Countries = ({ countryNames, filter, setFilter }) => {
  const [showCountryNames, setShowCountryNames] = useState([]);

  useEffect(() => {
    if (countryNames !== null) {
      const filteredNames = countryNames.filter((name) =>
        name.toLowerCase().includes(filter.toLowerCase())
      );
      setShowCountryNames(filteredNames);
    }
  }, [filter, countryNames]);

  const handleShowClick = (name) => {
    setFilter(name);
  };

  return (
    <div>
      {showCountryNames.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : showCountryNames.length === 1 ? (
        <CountryInfo countryName={showCountryNames[0]} />
      ) : (
        showCountryNames.map((name) => (
          <Country
            key={name}
            countryName={name}
            onShowClick={handleShowClick}
          />
        ))
      )}
    </div>
  );
};

export default Countries;

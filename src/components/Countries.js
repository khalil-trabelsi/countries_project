import axios from "axios";
import React, { useState, useEffect } from "react";
import Cards from "./Cards";

const Countries = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [rangeValue, setrangeValue] = useState(40);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "Europe", "Asia", "America", "Oceania"];

  useEffect(() => {
    if (playOnce) {
      axios.get("https://restcountries.com/v2/all").then((res) => {
        setData(res.data);
        setPlayOnce(false);
      });
    }

    const sortedCountry = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj.sort((a, b) => {
        return b.population - a.population;
      });
      sortedArray.length = rangeValue;
      setSortedData(sortedArray);
    };
    sortedCountry();
  }, [data, playOnce, rangeValue]);

  return (
    <div className="countries">
      <div className="sort-container">
        <input
          type="range"
          min="10"
          max="250"
          value={rangeValue}
          onChange={(e) => {
            setrangeValue(e.target.value);
          }}
        />
        <ul>
          {radios.map((e) => {
            return (
              <li key={e}>
                <input
                  type="radio"
                  value={e}
                  id={e}
                  checked={e === selectedRadio}
                  onChange={(evt) => {
                    setSelectedRadio(evt.target.value);
                  }}
                />
                <label htmlFor={e}>{e}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cancel">
        {selectedRadio && <h5 onClick={() => setSelectedRadio("")}>Cancel</h5>}
      </div>
      <ul className="countries-list">
        {sortedData
          .filter((country) => country.region.includes(selectedRadio))
          .map((elt) => (
            //   <li key={elt.alpha2Code}>{elt.name}</li>
            <Cards country={elt} key={elt.alpha2Code} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;

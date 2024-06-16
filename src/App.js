import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import { TreeMap } from "./components/TreeMap";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import CheckBtn from "./components/CheckBtn/CheckBtn";
import Loading from "./components/Loading/Loading";
import { getCovidCases } from "./api";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const [showMap, setShowMap] = useState(false); // Default to false (show Map initially)
  const [covidCases, setCovidCases] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("personConfirmed");
  const [selectedColor, setSelectedColor] = useState("personConfirmedColor");
  const [selectedDate, setSelectedDate] = useState("2021-01-03");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCovidCases(selectedFilter, selectedDate);
        setCovidCases(data.value);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedFilter, selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <Provider store={store}>
        <div className="App">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min="2021-01-03"
            max="2022-02-22"
          />
          {!showMap ? (
            <Map
              covidCases={covidCases}
              selectedFilter={selectedFilter}
              selectedColor={selectedColor}
            />
          ) : (
            <TreeMap covidCases={covidCases} selectedFilter={selectedFilter} />
          )}
          <FilterButtons
            setCovidCases={setCovidCases}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setSelectedColor={setSelectedColor}
            selectedDate={selectedDate} // Thêm dòng này
          />
          <CheckBtn showMap={showMap} setShowMap={setShowMap} />
        </div>

        {isLoading && <Loading />}
      </Provider>
    </>
  );
}

export default App;

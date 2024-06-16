import React, { useEffect } from 'react';
import { getCovidCases } from '../../api';
import './FilterButtons.css';

function FilterButtons({ setCovidCases, selectedFilter, setSelectedFilter, setSelectedColor, selectedDate }) { // Thêm selectedDate
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        setSelectedColor(filter.concat("Color"));
    };

   

    return (
        <div className="data-filter">
          <button onClick={() => handleFilterChange('personConfirmed')}>Confirmed</button>
          <button onClick={() => handleFilterChange('personDeath')}>Deaths</button>
          <button onClick={() => handleFilterChange('personRecovered')}>Recovered</button>
          <button onClick={() => handleFilterChange('personActive')}>Active</button>
        </div>
    );
}

export default FilterButtons;

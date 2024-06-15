import React from 'react';
import './CheckBtn.css';
function CheckBtn({showMap, setShowMap}){

    return (      
    <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={showMap} onChange={() => setShowMap(!showMap)}></input>
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">TreeMap</label>
    </div>
    );

}

export default CheckBtn;
 
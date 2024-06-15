// import React, { useState, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { createGeoJSONFromCovidCases } from '../util';

// function Map({ covidCases, selectedFilter, selectedColor }) {
//   const [map, setMap] = useState(null);
//   const [zoom, setZoom] = useState(6); // Thêm state để lưu trữ giá trị zoom

//   useEffect(() => {
//     // Initialize Mapbox map
//     mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN; // Replace with your token
//     const mapInstance = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/standard',
//       center: [0, 0],
//       zoom: 6
//     });
//     setMap(mapInstance);

//     // Data processing (assuming you have a function to convert covidCases to GeoJSON)
//     const geojsonData = createGeoJSONFromCovidCases(covidCases);

//     // Add a layer to the map for the GeoJSON data
//     mapInstance.on('load', () => {
//       mapInstance.addSource('covid-data', {
//         type: 'geojson',
//         data: geojsonData
//       });
//       mapInstance.addLayer({
//         id: 'covid-cases',
//         type: 'circle',
//         source: 'covid-data',
//         paint: {
//           'circle-color': [
//             'match',
//             ['get', selectedColor],
//             'personConfirmedColor', '#0079F0', // Blue for confirmed
//             'personDeathColor', '#f01b0c', // Red for deaths
//             'personRecoveredColor', '#0cddf0', // Gray for recovered
//             'personActiveColor', '#0cf017', // Light blue for active
//             '#ccc' // Default color if no match
//           ],
//             'circle-radius': [
//             'interpolate',
//             ['linear'],
//             ['get', selectedFilter],
//             0, 3, 
//             100, 6,
//             1000, 9,
//             10000, 12,
//             100000, 15,
//             1000000, 18 // Adjust these values for larger circles
//           ], // Dynamic circle radius based on case count
//           'circle-opacity': 0.7,
//           'circle-stroke-color': '#000', // Black stroke
//           'circle-stroke-width': 1
//         }
//       });
//     });

//     return () => {
//       if (mapInstance) mapInstance.remove();
//     }; // Cleanup function to remove the map instance
//   }, [covidCases]);

//   return (
//     <div id="map" style={{ width: '100%', height: '800px' }}></div>
//   );
// }

// export default Map;



import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createGeoJSONFromCovidCases } from '../util';

function Map({ covidCases, selectedFilter, selectedColor }) {
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(6); // Thêm state để lưu trữ giá trị zoom

  useEffect(() => {
    // Initialize Mapbox map
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN; // Replace with your token
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/standard',
      center: [0, 0],
      zoom: 6
    });
    setMap(mapInstance);

    // Data processing (assuming you have a function to convert covidCases to GeoJSON)
    const geojsonData = createGeoJSONFromCovidCases(covidCases);

    // Add a layer to the map for the GeoJSON data
    mapInstance.on('load', () => {
      mapInstance.addSource('covid-data', {
        type: 'geojson',
        data: geojsonData
      });
      mapInstance.addLayer({
        id: 'covid-cases',
        type: 'circle',
        source: 'covid-data',
        paint: {
          'circle-color': [
            'match',
            ['get', selectedColor],
            'personConfirmedColor', '#0079F0', // Blue for confirmed
            'personDeathColor', '#f01b0c', // Red for deaths
            'personRecoveredColor', '#0cddf0', // Gray for recovered
            'personActiveColor', '#0cf017', // Light blue for active
            '#ccc' // Default color if no match
          ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', selectedFilter],
            0, 3, 
            100, 6,
            1000, 9,
            10000, 12,
            100000, 15,
            1000000, 18 // Adjust these values for larger circles
          ], // Dynamic circle radius based on case count
          'circle-opacity': 0.7,
          'circle-stroke-color': '#000', // Black stroke
          'circle-stroke-width': 1
        }
      });
    });

    // Cập nhật giá trị zoom khi zoom thay đổi
    mapInstance.on('zoom', () => {
      setZoom(mapInstance.getZoom());
    });
      
    return () => {
      if (mapInstance) mapInstance.remove();
    }; // Cleanup function to remove the map instance
  }, [covidCases, selectedColor, selectedFilter]);
    console.log(zoom);
  return (
      <div id="map" style={{ width: '100%', height: '800px' }}></div>

  );
}

export default Map;

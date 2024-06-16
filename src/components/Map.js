import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useGetCovidCasesQuery } from "./covidApiSlice"; // Import hook từ RTK Query

function Map({ selectedFilter, selectedDate, selectedColor }) {
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(6);

  // Sử dụng hook useGetCovidCasesQuery để lấy dữ liệu
  const { data: covidCases, isLoading } = useGetCovidCasesQuery({
    selectedFilter,
    selectedDate,
  });

  useEffect(() => {
    if (!covidCases || isLoading) return; // Đợi cho đến khi có dữ liệu

    // Initialize Mapbox map
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/standard",
      center: [0, 0],
      zoom: 6,
    });
    setMap(mapInstance);

    // Thêm dữ liệu GeoJSON vào bản đồ
    mapInstance.on("load", () => {
      mapInstance.addSource("covid-data", {
        type: "geojson",
        data: covidCases,
      });
      mapInstance.addLayer({
        id: "covid-cases",
        type: "circle",
        source: "covid-data",
        paint: {
          "circle-color": [
            "match",
            ["get", selectedColor],
            "personConfirmedColor",
            "#0079F0",
            "personDeathColor",
            "#f01b0c",
            "personRecoveredColor",
            "#0cddf0",
            "personActiveColor",
            "#0cf017",
            "#ccc",
          ],
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", selectedFilter],
            0,
            3,
            100,
            6,
            1000,
            9,
            10000,
            12,
            100000,
            15,
            1000000,
            18,
          ],
          "circle-opacity": 0.7,
          "circle-stroke-color": "#000",
          "circle-stroke-width": 1,
        },
      });
    });

    // Cập nhật giá trị zoom khi zoom thay đổi
    mapInstance.on("zoom", () => {
      setZoom(mapInstance.getZoom());
    });

    return () => {
      if (mapInstance) mapInstance.remove();
    };
  }, [covidCases, isLoading, selectedColor, selectedFilter]);

  console.log(zoom);

  return <div id="map" style={{ width: "100%", height: "800px" }}></div>;
}

export default Map;

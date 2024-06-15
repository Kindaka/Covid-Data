import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

export const TreeMap = ({ covidCases, selectedFilter }) => {
  useEffect(() => {
    const uniqueCountries = [...new Set(covidCases.map((item) => item.CountryRegion.countryName))];
    let chartDatas = uniqueCountries.map((country) => {
      const totalConfirmed = covidCases
        .filter((item) => item.CountryRegion.countryName === country)
        .reduce((sum, item) => sum + (item[selectedFilter] || 0), 0);

      return {
        x: country,
        y: totalConfirmed,
      };
    });

    // Sort the data from high to low
    chartDatas = chartDatas.sort((a, b) => b.y - a.y);

    const options = {
      series: [
        {
          data: chartDatas
        }
      ],
      legend: {
        show: false
      },
      chart: {
        height: 800,
        type: 'treemap'
      },
      title: {
        text: 'Distributed Treemap (different color for each cell)',
        align: 'center'
      },
      colors: [
        '#FF5733', // Bright Orange
        '#33FF57', // Bright Green
        '#3357FF', // Bright Blue
        '#FF33A8', // Bright Pink
        '#33FFF2', // Bright Cyan
        '#FFBD33', // Bright Yellow
        '#D433FF', // Bright Purple
        '#A8FF33', // Bright Lime
        '#FF3333', // Bright Red
        '#33FFBD', // Bright Mint
        '#5733FF', // Bright Indigo
        '#33A8FF'  // Bright Sky Blue
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    return () => chart.destroy();
  }, [covidCases, selectedFilter]); // Add selectedFilter as dependency

  return (
    <div className="container">
      <div id='chart'></div>
    </div>
  );
}

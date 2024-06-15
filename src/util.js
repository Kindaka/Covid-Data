export const createGeoJSONFromCovidCases = (covidCases) => {
    const features = covidCases.map(caseData => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [caseData.CountryRegion.longitude, caseData.CountryRegion.latitude] 
        },
        properties: {
          id: caseData.id,
          day: caseData.day,
          personConfirmed: caseData.personConfirmed,
          personDeath: caseData.personDeath,
          personRecovered: caseData.personRecovered,
          personActive: caseData.personActive,
          personConfirmedColor: "personConfirmedColor",
          personDeathColor: "personDeathColor",
          personRecoveredColor: "personRecoveredColor",
          personActiveColor: "personActiveColor"
        }
      }));
    
      return {
        type: 'FeatureCollection',
        features: features
      };
}
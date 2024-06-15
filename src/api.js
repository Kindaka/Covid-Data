import axios from 'axios';

const API_URL = 'http://localhost:5268/odata/CovidDailies';

export const getCovidCases = async (selectedFilter, selectedDate) => {
    try {
        // Sử dụng template string cho dễ đọc
        const filter = `day eq ${selectedDate}`;
        const response = await axios.get(`${API_URL}`, {
            params: {
                $expand: 'CountryRegion',
                $filter: filter,
                $select: selectedFilter
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};



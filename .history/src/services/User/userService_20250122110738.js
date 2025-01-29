import apiClient from './apiService'; 


export const getUser = async () => {
    try {
        const response = await apiClient.get('/config/v1/config',{
            params:{
                consistent : true
             }
        }); // Use apiClient without redefining headers
        return response.data; // Return the config data
    } catch (error) {
        console.error('Error fetching config:', error);
        throw error; // Handle the error as needed
    }
};
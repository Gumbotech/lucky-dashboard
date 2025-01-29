import apiClient from './apiService'; 


export const getUsersList = async () => {
    try {
        const response = await apiClient.get('/config/v1/config',{
            params:{
                consistent : true
             }
        }); 
        return response.data;
    } catch (error) {
        console.error('Error fetching config:', error);
        throw error; // Handle the error as needed
    }
};
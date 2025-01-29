import apiClient from './apiService'; 

export const getUserCalendar = async (month, userId) => {
    try {
        const response = await apiClient.get('/calendar/v1/calendar/user', {
            params: {
                month: month,
                userId: userId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user calendar:', error);
        throw error;
    }
};

import apiClient from '../apiService'; 

export const getUserCalendar = async ( userId,month) => {
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

export const getUserWithStatus = async (status) => {
    try {
        const response = await apiClient.get('/calendar/v1/calendar/pending', {
            status: status,
            limit: userId,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user calendar:', error);
        throw error;
    }
};

export const updateUserCalendar = async (userId, month, luckStatus) => {
    try {
        const payload = {
            userId: userId,
            month: month,
            luckStatus: luckStatus,
        };

        const response = await apiClient.post('/luck/calendar/v1/calendar', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error updating user calendar:', error);
        throw error;
    }
};


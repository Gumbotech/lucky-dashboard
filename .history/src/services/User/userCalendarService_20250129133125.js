import apiClient from '../apiService'; 

export const getUserCalendar = async (userId,month) => {
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
        const response = await apiClient.post('/calendar/v1/calendar/pending', {
            status: status,
            limit: "18",
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user calendar:', error);
        throw error;
    }
};

export const updateUserCalendar = async (userId,subscriptionId, month, luckStatus) => {
    try {
        const payload = {
            userId: userId,
            subscriptionId: subscriptionId,
            monthId: month,
            luckStatus: luckStatus
        };

        const response = await apiClient.post('/calendar/v1/calendar', payload);

        return response.data;
    } catch (error) {
        console.error('Error updating user calendar:', error);
        throw error;
    }
};


import { apiClient } from "./constant";

const request = {
    getListSearchStudents: async (searchStudent) => {
        try {
            let suggestions = [];
            
            const res = await apiClient.get('/users', {
                params: {
                    'range[login]': `${searchStudent.toLowerCase()},${searchStudent.toLowerCase()}zzz`
                }
            });

            if (res.status !== 200) throw new Error('Error API 42');
            if (res.data.length > 0) {
                suggestions = res.data.map(user => ({
                    id: user.id,
                    login: user.login,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    image: user.image?.versions?.small || null
                }));
            }
            return { success: true, suggestions };
        } catch (error) {
            console.error("Error in getListSearchStudent:", error);
            return { success: false, error: error.message };
        }
    },
    getProfileStudent: async (idStudent) => {
        try {
            const res = await apiClient.get(`/users/${idStudent}`);
            if (res.status !== 200) throw new Error('Error API 42');
            
            return { success: true, data: res.data };
        } catch (error) {
            console.error("Error in getProfileStudent:", error);
            return { success: false, error: error.message };
        }
    },
    getColorCoalitionStudent: async (idStudent) => {
        try {
            const res = await apiClient.get(`/users/${idStudent}/coalitions`);
            if (res.status !== 200) throw new Error('Error API 42');
            if (res.data && res.data.length > 0) {
                return { success: true, data: res.data[0].color};
            }
            return { success: true, data: null };
        } catch (error) {
            console.error("Error in getColorCoalitionStudent:", error);
            return { success: false, error: error.message };
        }
    }
};

export default request;

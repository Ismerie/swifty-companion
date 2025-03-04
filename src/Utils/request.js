import { apiClient } from "./constant";

const request = {
    getProfileStudent: async (idStudent) => {
        try {
            const res = await apiClient.get(`/users/${idStudent}`);
            if (res.status !== 200) throw new Error('Error API 42');

            console.log(res)
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
                const coalition = res.data.find(c => c.id === 21);
                if (coalition?.color) {
                    return { success: true, data: coalition.color };
                }
            }
            return { success: true, data: null }; // Data vide
        } catch (error) {
            console.error("Error in getColorCoalitionStudent:", error);
            return { success: false, error: error.message };
        }
    }
};

export default request;

import axiosInstance from "../config/axiosConfig";

// Define a type for the service data
export interface Services {
    id?: number; // Optional for creating new services
    service_name: string;
    service_description: string;
    service_price: string;
}

// Add a new service
export const addService = async (service: Services) => {
    return axiosInstance.post(`/service/addService`, service);
};

// Get all services
export const getServices = async () => {
    return axiosInstance.get<Services[]>(`/service/getServices`);
};

// Delete a service by ID
export const deleteService = async (id: number) => {
    return axiosInstance.delete(`/service/deleteService/${id}`);
};

// Update an existing service
export const updateService = async (service: Services) => {
    return axiosInstance.put(`/service/updateService`, service);
};

import axiosInstance from '../config/axiosConfig';
import { User } from '../types/User';

export const updateUser = async (username: string, data: Partial<User>) => {
  const payload = { username, ...data }; // Ensure username is included in the payload
  const response = await axiosInstance.put(`/update/${username}`, payload);
  return response.data;
};

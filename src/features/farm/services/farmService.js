import apiClient from "@shared/utils/apiClient";

export const farmService = {
  async getUserFarms(token) {
    // If token is explicitly passed, verify headers, otherwise apiClient handles it
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    // Use apiClient instead of direct axios to ensure production URL
    const response = await apiClient.get("/Farms/user", config);
    return response.data;
  },
};

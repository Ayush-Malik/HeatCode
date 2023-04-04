import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

/**
    * Function to make API calls
    * @param {string} url - URL to make API call
    * @param {string} method - HTTP method to use
    * @param {object} data - Data to send to the API
    * @param {object} headers - Headers to send to the API
    * @returns {object} - Returns the response data
    * @throws {Error} - Throws an error if the API call fails
    * @example
    * const data = await apiCall("http://localhost:3001/api/users", "GET");
*/
export const apiCall = async (url, method, data = null, headers = {}, credentials = false) => {
    try {
      const response = await axios({
        method,
        url: `${baseURL}${url}`,
        data,
        headers,
        withCredentials: credentials
      });
      return response;
    } catch (error) {
      throw error.response.data.msg;
    }
};
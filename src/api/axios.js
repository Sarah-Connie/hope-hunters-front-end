import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3001';

export default axios.create({
        baseURL: BASE_URL
    });

// export const login = async (userData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/users/login`, {
//       email: userData.email,
//       password: userData.password,
//     });

//     return response.data;
//     } catch (error) {
//     throw error.response.data;
//   }
// };

// export const refreshJWT = async (token) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/users/refresh-jwt`, null, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response.data.token;
//   } catch (error) {
//     throw error.response.data.error;
//   }
// };

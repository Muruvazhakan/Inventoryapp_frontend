import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:4000";

export const getAllStocks = async () => {
  try {
    const data = await axios.get(`${url}/stock/getallstocks`);
    return data;
  } catch (error) {
    return error;
  }
};

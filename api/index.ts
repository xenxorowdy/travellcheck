import axios from "axios";

const HOST = "https://heritageapi-i0xk2etr.b4a.run/"
// const HOST = "http://localhost:3000/"
export const fetchGetAPI = async (endPoint: String, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.get(HOST + endPoint);
      return res.data;
    } catch (e) {
      if (i === retries - 1) {
        return null; // Fail on last retry
      }
    }
  }
};

export const fetchPostAPI = async(endPoint: String, data: any) => {
    return await axios.post(HOST + endPoint, data).then(res=>res.data).catch(e=>null);
}
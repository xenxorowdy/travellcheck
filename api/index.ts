import axios from "axios";

const HOST = "https://travell-api-xtzn.onrender.com/"
export const fetchGetAPI = async(endPoint: String) => {
    return await axios.get("http://localhost:3000/" + endPoint).then(res => res.data).catch(e =>null);
}
export const fetchPostAPI = async(endPoint: String, data: any) => {
    return await axios.post(HOST + endPoint, data).then(res=>res.data).catch(e=>null);
}
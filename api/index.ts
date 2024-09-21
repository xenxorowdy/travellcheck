import axios from "axios";

export const fetchGetAPI = async(endPoint: String) => {
    return await axios.get("https://travell-api-xtzn.onrender.com/" + endPoint).then(res=>res.data);
}
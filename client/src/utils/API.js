import axios from "axios";

export default {
    getAllNyse: function() {
        return axios.get("/api/allNyse")
    },
    getAllNasdaq: function() {
        return axios.get("api/allNasdaq")
    } 
};
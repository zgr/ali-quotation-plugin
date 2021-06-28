import axios from "@/utils/axios";
export function getItems(params:object){
    return axios.get('/getItems', params);
}
import axios from "@/utils/axios";
export function getItems(params:object){
    return axios.get('/getItems', params);
}
export function updateItem(params:object){
    return axios.post('/updateItem', params);
}

export function removeItem(params:object){
    return axios.post('/removeItem', params);
}
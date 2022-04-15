import { FormItem } from "../types/form";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/"
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
export const request = async (endpoint: string, method: RequestMethod = "GET", data: any = {}) => {
    let url;
    let payload: string;
    if (method === 'GET') {
        const requestParams = data ? `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}` : ""
        url = `${API_BASE_URL}${endpoint}${requestParams}`
        payload = "";
    }
    else {
        url = `${API_BASE_URL}${endpoint}`
        payload = data ? JSON.stringify(data) : "";
    }




    const auth = "Basic " + window.btoa("patelaryan7751:@7751931940Ar");

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth
        },
        body: payload,
    })
    if (response.ok) {
        const json = await response.json();
        return json
    }
    else {
        const errorjson = await response.json();
        throw Error(errorjson);
    }
}

export const createForm = (form: FormItem) => {
    return request('forms', 'POST', form)
}
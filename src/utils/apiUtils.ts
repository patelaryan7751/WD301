import { PaginationParams } from "../types/common";
import { FetchField, FormItem } from "../types/form";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/"
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
export const request = async (endpoint: string, method: RequestMethod = "GET", data: any = {}) => {
    let url;
    let payload: string;
    if (method === 'GET') {
        const requestParams = data ? `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}` : ""
        url = `${API_BASE_URL}${endpoint}${requestParams}`
        payload = ""
    }
    else {
        url = `${API_BASE_URL}${endpoint}`
        payload = data ? JSON.stringify(data) : "";
    }

    // const auth = "Basic " + window.btoa("patelaryan7751:@7751931940Ar");
    const token = localStorage.getItem("token")
    const auth = token ? "Token " + localStorage.getItem("token") : ""

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth
        },
        body: (method !== "GET") ? payload : null
    })
    if (response.ok) {
        console.log(response)
        if (response.status !== 204) {
            const json = await response.json();
            return json
        }
    }
    else {
        const errorjson = await response.json();
        throw Error(errorjson);
    }
}

export const createForm = (form: FormItem) => {
    return request('forms/', 'POST', form)
}

export const login = (username: string, password: string) => {
    return request("auth-token/", "POST", { username, password })
}

export const me = () => {
    return request("users/me/", "GET", {})
}

export const listForms = (pageParams: PaginationParams) => {
    return request("forms/", "GET", pageParams)
}

export const getForm = (id: number) => {
    return request(`forms/${id}`);
}

export const getFields = (id: number) => {
    return request(`forms/${id}/fields`)
}

export const addField = (id: number, field: FetchField) => {
    return request(`forms/${id}/fields/`, 'POST', field);
}

export const removeFieldApi = (formId: number, fieldId: number) => {
    return request(`forms/${formId}/fields/${fieldId}`, 'DELETE');
};

export const updateFieldApi = (formId: number, fieldId: number, field: FetchField) => {
    return request(`forms/${formId}/fields/${fieldId}`, 'PATCH', field);
};
export const deleteForm = (formId: number) => {
    return request(`forms/${formId}`, 'DELETE');
};
export const submitForm = (
    formId: number,
    answers: { form_field: number; value: string | string[] }[]
) => {
    return request(`forms/${formId}/submission`, 'POST', { answers });
};




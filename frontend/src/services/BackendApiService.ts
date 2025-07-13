import { DailyEntry } from "@/app/models/DailyEntry";
import { env } from 'next-runtime-env';

const API_BASE_URL = env('NEXT_PUBLIC_API_BASE_URL');

export const login = async (username: string, password: string) => {
    const response = await fetchWrapper('api/auth/login', 'POST', JSON.stringify({Username: username, Password: password}));
    if(response == undefined) {
        return 'There was an error logging in. Please try again later.';
    }

    if(!response.ok) {
        return 'Invalid username or password.'
    }

    const json = await response.json();
    sessionStorage.setItem('loginToken', json['Token']);
    return '';
}

export const register = async (username: string, password: string) => {
    const response = await fetchWrapper('api/auth/register', 'POST', 
        JSON.stringify({ Username: username, Password: password }));

    return response && response.ok;
}

export const getEntries = async () => {
    const token = sessionStorage.getItem('loginToken');
    if(token == null) {
        return false;
    }

    const response = await fetchWrapper('api/journaler', 'GET', '', token);
    if(response == undefined) {
        return {};
    }

    const data = await response.json();
    return data['entries'];
}

export const addEntry = async (date: string, entry: DailyEntry) => {
    const token = sessionStorage.getItem("loginToken");
    if(token == null) {
        return false;
    }

    const response = await fetchWrapper('api/journaler', 'POST', JSON.stringify({ entry: entry, date: date}), token);
    if(response == undefined || !response.ok) {
        return false;
    }

    return true;
}

export const requestPasswordReset = async (email: string) => {
    const response = await fetchWrapper('api/auth/request-password-reset', 'POST', JSON.stringify({
        Email: email}));

    return response && response.ok;
}

export const resetPassword = async (email: string, authenticationCode: string, newPassword: string) => {
    const response = await fetchWrapper('api/auth/reset-password', 'POST', JSON.stringify({
        Email: email, AuthenticationCode: authenticationCode, NewPassword: newPassword}));
    
    return response && response.ok;
}

export const deleteEntry = async (id: number, token: string) => {
    const response = await fetchWrapper('api/journaler', 'DELETE', JSON.stringify({Id: id}), token);

    console.log(response);
    return response && response.ok;
}

export const editEntry = async (date: string, entry: DailyEntry) => {
    const token = sessionStorage.getItem('loginToken');

    if(token == null) {
        return false;
    }

    const response = await fetchWrapper('api/journaler', 'PUT', JSON.stringify({ date: date, entry: entry}), token);
    
    if(response == undefined || !response.ok) {
        return false
    }

    return true;
}

export const deleteAccount = async () => {
    const token = sessionStorage.getItem('loginToken');
    if(token == null) {
        return false;
    }

    const response = await fetchWrapper('api/auth/delete-account', 'DELETE', '', token);
    return response && response.ok;
}

const fetchWrapper = async (url: string, method: string = 'GET', data: string = '', token: string = '') => {
    const headers: Headers = new Headers();
    if (data != '') {
        headers.set('Content-Type', 'application/json');
    }
    if (token != '') {
        headers.set('Authorization', 'Bearer ' + token);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            headers: headers,
            method: method,
            ...(data != '' && {body: data})
        });

        if (!response.ok) {
            console.log(`Error: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.log(error);
        if(error instanceof Error) {
            console.error(error.message);
        }
    }
};
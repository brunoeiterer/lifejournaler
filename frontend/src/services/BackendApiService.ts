import { JournalEntry } from "@/components/JournalEntries";
import dayjs from "dayjs";
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
    sessionStorage.setItem('loginToken', json['token']);
    return '';
}

export const register = async (username: string, password: string) => {
    const response = await fetchWrapper('api/auth/register', 'POST', 
        JSON.stringify({ Username: username, Password: password }));

    return response && response.ok;
}

export const getEntries = async (token: string) => {
    const response = await fetchWrapper('api/journaler', 'GET', '', token);
    if(response == undefined) {
        return new Array<JournalEntry>();
    }
    const data = await response.json();
    const entries: JournalEntry[] = (data['entries']).map((x: {id: number, entry: string, mood: number, date: dayjs.Dayjs}) => 
        ({id: x.id, entry: x.entry, mood: x.mood, date: x.date}));
    return entries;
}

export const addEntry = async (entry: string, mood: string, date: dayjs.Dayjs, token: string) => {
    const response = await fetchWrapper('api/journaler', 'POST', JSON.stringify({ 
        Entry: entry, Mood: mood, Date: date }), token);
    if(response == undefined || !response.ok) {
        return -1;
    }

    const resposeData = await response.json();
    return resposeData['id'];
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

export const editEntry = async (entry: string, mood: string, date: dayjs.Dayjs, id: number, token: string) => {
    const response = await fetchWrapper('api/journaler', 'PUT', JSON.stringify({ 
        Entry: entry, Mood: mood, Date: date, Id: id}), token);
    
    if(response == undefined || !response.ok) {
        return -1;
    }

    const resposeData = await response.json();
    return resposeData['id'];
}

export const deleteAccount = async (token: string) => {
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
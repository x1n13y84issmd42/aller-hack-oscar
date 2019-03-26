import axios from 'axios';


interface IOptions {
	responseType?: string;
	headers?: {};
};

export const API = axios.create({
	baseURL: '',
	withCredentials: true,
});

export const APIGet = (url: string, params?: URLSearchParams, options: IOptions = {}) => {
	return API({
		method: 'get',
		url,
		data: params,
		responseType: options.responseType || 'json',
		headers: Object.assign(options.headers || {}, axios.defaults.headers),
	});
};

export const APIPost = (url: string, params?: string, options: IOptions = {}) => {
	return API({
		method: 'post',
		url,
		data: params,
		responseType: options.responseType || 'json',
		headers: Object.assign(options.headers || {}, axios.defaults.headers),
	});
};
import axios from 'axios';

const baseURL = 'http://localhost:4001';

const api = axios.create({
	baseURL,
});

export default api;

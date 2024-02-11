export const getToken = () => {
	console.log('Inside get token');
	return localStorage.getItem('token');
};

export const removeToken = () => {
	console.log('Inside remove token');
	localStorage.removeItem('token');
};

export const setToken = (val) => {
	console.log('Inside set token');
	localStorage.setItem('token', val);
};

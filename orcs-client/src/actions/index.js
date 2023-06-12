import axiosDriver from '../components/api/axios';
import history from '../history';
import { FETCH_USER, SYSTEM_INFO, LOGIN_USER } from './types';
// const { ipcRenderer } = window.require('electron');

// export const getSysInfo = () => (dispatch, getState) => {
// 	ipcRenderer.on('sysInfoMetrics', (event, data) => {
// 		dispatch({ type: SYSTEM_INFO, payload: data });
// 	});
// };

export const fetchUser = () => async (dispatch) => {
	const { data } = await axiosDriver.get('/auth/currentuser');

	dispatch({ type: FETCH_USER, payload: data });
};

export const loginUser = (formValues) => async (dispatch) => {
	try {
		const { data } = await axiosDriver.post('/auth/login', { ...formValues });
		dispatch({
			type: LOGIN_USER,
			payload: data,
		});
		history.push('/');
	} catch (err) {
		dispatch({
			type: LOGIN_USER,
			payload: err.response.data,
		});
	}
};

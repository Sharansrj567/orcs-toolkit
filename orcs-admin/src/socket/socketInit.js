import io from 'socket.io-client';
let socket = io.connect('http://localhost:4000');
socket.emit(
	'clientAuth',
	'eyJpZCI6IjYyNTg0NGExODY4NjVlMzNkMzVhZGE2NiIsImVtYWlsIjoiY2h1eGlAb3Jjcy5jb20iLCJuYW1lIj'
);

export default socket;

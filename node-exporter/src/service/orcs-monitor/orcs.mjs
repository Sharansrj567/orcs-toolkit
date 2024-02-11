import OrcsMonitor from './orcs-monitor.mjs';
const monitor = new OrcsMonitor(['firefox'], 4000);
import axios from 'axios';

// {
//     "policy": {
//         "role": "Student",
//         "banList": [
//             "chrome",
//             "subl"
//         ],
//         "createdAt": "2022-03-10T16:49:11.760Z",
//         "id": "622a2c1105b9628d7c32b335"
//     }
// }

export async function loadPolicyByRole(role) {
	// console.log(`localhost:4001/policy/getRolePolicy/${role}`);
	axios
		.get(
			`${
				process.env.API_URI || 'http://127.0.0.1:4001'
			}/policy/getRolePolicy/${role}`
		)
		.then((response) => {
			console.log('\n updated : ' + response.data.policy.banList);
			monitor.updateBanList(response.data.policy.banList);
		});
}

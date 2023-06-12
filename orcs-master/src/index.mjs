import cluster from 'cluster';

import { isMaster } from './components/master.mjs';
import { isWorker } from './components/worker.mjs';

if (cluster.isPrimary || !cluster.isWorker) {
	// console.log('Hello from Master!');
	isMaster();
} else {
	// console.log('Hello from Worker!');
	isWorker();
}

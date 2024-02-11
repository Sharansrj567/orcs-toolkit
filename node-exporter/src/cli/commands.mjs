#!/usr/bin/env node

import { program } from 'commander';
import { Logger } from '../service/logger.mjs';
const logger = new Logger();

program
	.version('1.0.0')
	.description('Open Resource Control And Surveillance Toolkit');

program
	.option('--status', 'check status of the server')
	.option('-s', 'check status of the server')
	.description('Get status of the current node')
	.action(() => {
		logger.success('status: connected to the server!');
	});

program.parse(process.argv);

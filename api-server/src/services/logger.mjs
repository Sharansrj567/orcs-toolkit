import chalk from 'chalk';

class Logger {
	raw(m, ...op) {
		console.log(m, ...op);
	}

	info(m, ...op) {
		const prefix = `[${chalk.blueBright('INFO')}]`;
		console.log(`${prefix} >`, m, ...op);
	}

	error(e, ...op) {
		const prefix = `[${chalk.redBright('ERROR')}]`;
		console.error(`${prefix} >`, e, ...op);
	}

	warn(m, ...op) {
		const prefix = `[${chalk.yellowBright('WARNING')}]`;
		console.log(`${prefix} >`, m, ...op);
	}

	debug(m, ...op) {
		const prefix = `[${chalk.gray('DEBUG')}]`;
		console.log(`${prefix} >`, m, ...op);
	}
}

export { Logger };

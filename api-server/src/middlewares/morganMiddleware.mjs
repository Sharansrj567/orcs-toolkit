import morgan from 'morgan';
import chalk from 'chalk';

export const morganMiddleware = morgan(function (tokens, req, res) {
	return [
		chalk.bgGreen.bold('[MORGAN] >'),
		chalk.hex('#34ace0').visible(tokens.method(req, res)),
		chalk.hex('#ffb142').visible(tokens.status(req, res)),
		chalk.visible(tokens.url(req, res)),
		chalk.hex('#2ed573').visible(tokens['response-time'](req, res) + ' ms'),
		chalk.visible('@ ' + tokens.date(req, res)),
		chalk.visible(tokens['remote-addr'](req, res)),
		chalk.visible('from ' + tokens.referrer(req, res)),
		chalk.grey(tokens['user-agent'](req, res)),
	].join(' ');
});

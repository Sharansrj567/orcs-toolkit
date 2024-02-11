module.exports = {
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(mjs?|jsx?|js?|tsx?|ts?)$',
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.mjs$': 'babel-jest',
		'^.+\\.cjs$': 'babel-jest',
	},
	testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
	moduleFileExtensions: ['js', 'jsx', 'mjs'],
};

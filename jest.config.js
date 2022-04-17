const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async () => {
	const allData = await (await fetch('http://localhost:5050/files/data')).json();
	const fileList = (await (await fetch('http://localhost:5050/files/list')).json()).files;

	return {
		testEnvironment: 'jsdom',
		setupFiles: ['./jest.setup.js'],
		transform: {
			'^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/babelTransform.js',
			'^.+\\.css$': '<rootDir>/config/cssTransform.js',
			'^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/fileTransform.js',
		},
		testMatch: ['<rootDir>/src/**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
		resetMocks: true,
		globals: {
			allData,
			fileList,
		},
	};
};

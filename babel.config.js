module.exports = {
	presets: [['@babel/preset-react', { runtime: 'automatic' }], ['@babel/preset-env', { targets: { node: 'current' } }], ['@babel/preset-flow']],
	plugins: [['@babel/transform-runtime']],
};

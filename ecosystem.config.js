module.exports = {
	apps: [{
		name:'nodejs-app',
		script: './src/server.js',
		env: {
			NODE_ENV: 'development',
			PORT: 3000,
			DB_HOST: 'localhost',
			DB_PORT: 3306,
			DB_USER: 'nodeuser',
			DB_PASSWORD: 'Ntd05#12',
			DB_NAME: 'nodejs_db'
		}
	}]
}

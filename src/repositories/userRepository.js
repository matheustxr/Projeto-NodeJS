
const sqliteConection = require('../database/sqlite')

class UserRepository {
	async findByEmail(email) {
		const db = await sqliteConection();
		const user = await db.get(`SELECT * FROM users WHERE email = (?)`, [email]);

		return user;
	};

	async create(name, email, password) {
		const db = await sqliteConection();

		const userId = await db.run(
			"INSERT INTO users (name, email, password) VALUES (?,?,?)", 
			[name, email, password]
		);

		return{ id: userId }
	}
}

module.exports = UserRepository;
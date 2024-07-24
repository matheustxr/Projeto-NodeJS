const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError");
const sqliteConection = require('../database/sqlite')

class UsersController {
	async create (request, response){
		const {name, email, password} = request.body;

		const db = await sqliteConection();

		const checkUserExist = await db.get(`SELECT * FROM users WHERE email = (?)`, [email]);

		if (checkUserExist) {
			throw new AppError("Esse email já está em uso");
		}

		const hashedPassword = await hash(password, 8)
		
		await db.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, hashedPassword]);

		return response.status(201).json();
	}

	async update (request, response){
		const { name, email } = request.body;
		const { id } = request.params;

		const db = await sqliteConection(); 
		const user = await db.get("SELECT * FROM users WHERE id = (?)", [id]);

		if (!user) {
			throw new AppError("Usuário não encontrado");
		};

		const userWithUpdatedEmail = await db.get("SELECT * FROM users WHERE email = (?)", [email]);

		if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
			throw new AppError("Este email já está em uso");
		}

		user.name = name;
		user.email = email;

		await db.run("UPDATE users SET name = ?, email = ?, updated_at  = ? WHERE id = ?", [user.name, user.email, new Date(), user.id]);

		return response.json();
	}

}

module.exports = UsersController
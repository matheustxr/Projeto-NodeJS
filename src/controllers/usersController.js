const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

const UserRepository = require("../repositories/userRepository");
const sqliteConection = require('../database/sqlite');
const UserCreateService = require('../services/userCreateService');

class UsersController {
	async create (request, response){
		const {name, email, password} = request.body;

		const userRepository = new UserRepository;
		const userCreateService = new UserCreateService(userRepository);

		await userCreateService.execute({name, email, password});

		return response.status(201).json();
	}

	async update (request, response){
		const { name, email, password, old_password } = request.body;
		const user_id = request.user.id;

		const db = await sqliteConection(); 
		const user = await db.get("SELECT * FROM users WHERE id = (?)", [user_id]);

		if (!user) {
			throw new AppError("Usuário não encontrado");
		};

		const userWithUpdatedEmail = await db.get("SELECT * FROM users WHERE email = (?)", [email]);

		if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
			throw new AppError("Este email já está em uso");
		}

		user.name = name ?? user.name;
		user.email = email ?? user.email;

		if ( password && !old_password ) {
			throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
		}

		if ( password && old_password ){
			const checkOldPassword = await compare(old_password, user.password);

			if (!checkOldPassword) {
                throw new AppError("Senha antiga incorreta");
            }

			user.password = await hash(password, 8);
		}

		await db.run(`
			UPDATE users SET
			name = ?,
			email = ?,
			password = ?, 
			updated_at  = DATETIME('now')
			WHERE id = ?`, 
			[user.name, user.email, user.password, user_id]
		);

		return response.json();
	}

}

module.exports = UsersController
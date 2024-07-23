/*	BOAS PRÁTICAS OS CONTROLERS TERÃO NO MÁXIMO 5 FUNÇÕES 
	index - GET para listar todos os registros.
	show - GET para exibir um registro especifico
	create - POST para criar um registro
	update - PUT para atualizar um registo
	delete - DELETE para remover um registro
*/

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
		
		await db.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, password]);

		return response.status(201).json();
	}
}

module.exports = UsersController
/*	BOAS PRÁTICAS OS CONTROLERS TERÃO NO MÁXIMO 5 FUNÇÕES 
	index - GET para listar todos os registros.
	show - GET para exibir um registro especifico
	create - POST para criar um registro
	update - PUT para atualizar um registo
	delete - DELETE para remover um registro
*/

class UsersController {
	create (request, response){
		const {name, email, password} = request.body;

    	response.status(201).json({name, email, password})
	}
}

module.exports = UsersController
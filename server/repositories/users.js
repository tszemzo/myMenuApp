const Sequelize = require('sequelize');
var Users = require("../models").User;

class UserRepository{

	getAllUsers(){
		return Users.findAll({
				order: [
		            ['username', 'ASC'],
		        ],
		    });
	}

	getUser(username){
		return Users.findOne({
			where: { username: username }
		});
	}


	authenticateUser(username, password){
		return this.getUser(username).then((u) => {
			var user = u.get({plain:true});
			console.log(user);
			console.log(u);
			if(user.password === password){
				console.log(user)
				if(user.username === 'admin')
					return 'admin'
				return 'token';
			}
			else
				throw 'User does not exist';
		})
	}

	deleteUser(username){
		return Users.destroy({
			where: { username: username }
		});
	}

	deleteUsers(){
		return Users.destroy({
			where: {}
		});
	}

	createUser(username, password){
		return Users.create({
			username: username,
			password: password,
		}).then((user) => {
			if(user.username === 'admin')
				return 'admin'
			else
				return 'token' 
		})
	}

	updateUser(username, password){
		return Users.update({
			username: username,
			password: password,
		},
		{
			where: { username: username}
		});
	}

}

module.exports = new UserRepository();

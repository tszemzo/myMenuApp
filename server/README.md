# Server de Productos Farmaceuticos

### Primero
- Instalar: npm 6.2.0
- Instalar mysql: npm install mysql2
- Correr en mysql (usuario root contraseña root por defecto):
~~~sql
create database PharmaProducts;
~~~

### Para correr:
~~~bash
	npm install
	npm run migrate
	npm start
~~~

### Para agregar Tablas y Recursos:
~~~bash
	node_modules/.bin/sequelize model:create --name User --attributes username:string
~~~

Y crear router y controller y por ultimo agregarlo al app.js

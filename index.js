var express = require("express");
const sqlite3 = require('sqlite3').verbose();
var bodyParser = require("body-parser");

// Парсер для данных application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var db = new sqlite3.Database('./db/test.db');
 

app.get("/", (request, response) => {
	  response.render("index");
});

// Таблица турагентов
var sql_agents_all = 'SELECT first_name name1, second_name name2, last_name name3, phone phone FROM agents ORDER BY name1';
var sql_agents_insert = 'INSERT INTO agents(first_name,second_name,last_name,phone) VALUES (?, ?, ?, ?)';

app.get("/agents", (request, response) => {
	db.all(sql_agents_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("agents", {rows: rows});
	});
});

app.post("/add_agent", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [request.body.name1, request.body.name2, request.body.name3, request.body.phone];

	db.run(sql_agents_insert, data, (err) => {
		if (err) console.log(err.message);
	});

	db.all(sql_agents_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("agents", {rows: rows});
	});
});

// Таблица клиентов
var sql_clients_all = 'SELECT first_name name1, second_name name2, last_name name3, phone, adress, pasport FROM clients ORDER BY name1';
var sql_clients_insert = 'INSERT INTO agents(first_name,second_name,last_name,phone,adress,pasport) VALUES (?, ?, ?, ?, ?, ?)';

app.get("/clients", (request, response) => {
	db.all(sql_clients_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("clients", {rows: rows});
	});
});

app.post("/add_client", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [request.body.name1, request.body.name2, request.body.name3, request.body.phone, request.body.adress, request.body.pasport];

	db.run(sql_clients_insert, data, (err) => {
		if (err) console.log(err.message);
	});

	db.all(sql_clients_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("agents", {rows: rows});
	});
});

// Таблица стран
var sql_countries_all = 'SELECT name FROM countries ORDER BY name';
var sql_countries_insert = 'INSERT INTO countries(name) VALUES (?)';

app.get("/countries", (request, response) => {
	db.all(sql_countries_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("countries", {rows: rows});
	});
});

app.post("/add_country", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [request.body.name];

	db.run(sql_countries_insert, data, (err) => {
		if (err) console.log(err.message);
	});

	db.all(sql_countries_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("countries", {rows: rows});
	});
});

// Таблица туров
var sql_tours_all = 'SELECT tours.name, arrival_date date, countries.name country, num_days, num_place, price_rubl FROM tours LEFT JOIN countries ON tours.id_country = countries.id ORDER BY tours.name';
var sql_tours_insert = 'INSERT INTO tours(first_name,second_name,last_name,phone,adress,pasport) VALUES (?, ?, ?, ?, ?, ?)';

app.get("/tours", (request, response) => {
	db.all(sql_tours_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("tours", {rows: rows});
	});
});

app.post("/add_tours", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [request.body.name, request.body.date, request.body.country, request.body.num_days, request.body.num_place, request.body.price_rubl];

	db.run(sql_tours_insert, data, (err) => {
		if (err) console.log(err.message);
	});

	db.all(sql_tours_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("tours", {rows: rows});
	});
});


// Распределение агентов

var sql_conn_all = 'SELECT agents.id id, agents.first_name a_f_name, agents.second_name a_s_name, clients.first_name c_f_name, clients.second_name c_s_name FROM agents JOIN connections ON connections.id_agent = agents.id JOIN clients ON connections.id_client = clients.id ORDER BY agents.first_name';
//var sql_conn_insert = 'INSERT INTO tours(first_name,second_name,last_name,phone,adress,pasport) VALUES (?, ?, ?, ?, ?, ?)';

app.get("/connections", (request, response) => {
	db.all(sql_conn_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("connections", {rows: rows});
	});
});

app.listen(3000);

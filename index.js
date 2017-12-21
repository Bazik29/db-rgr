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
var sql_agents_update = 'UPDATE agents SET first_name=?, second_name=?,last_name=?,phone=? WHERE first_name=? AND second_name=? AND last_name=?';

app.get("/agents", (request, response) => {
	db.all(sql_agents_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("agents", {rows: rows});
	});
});

app.post("/add_agent", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [
		request.body.name1, 
		request.body.name2, 
		request.body.name3, 
		request.body.phone
		];

	db.run(sql_agents_insert, data, function (err) {
		if (err) console.log(err.message);
	});

	db.all(sql_agents_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("agents", {rows: rows});
	});
});

app.post("/chg_agent", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [
		request.body.name1, 
		request.body.name2, 
		request.body.name3, 
		request.body.phone, 
		request.body.name1_old, 
		request.body.name2_old, 
		request.body.name3_old
		];
	db.run(sql_agents_update, data, function (err) {
		if (err) console.log(err.message);
		console.log(`Row(s) updated: ${this.changes}`);
	});
	db.all(sql_agents_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("agents", {rows: rows});
	});
});


// Таблица клиентов
var sql_clients_all = 'SELECT first_name name1, second_name name2, last_name name3, phone, adress, pasport FROM clients ORDER BY name1';
var sql_clients_insert = 'INSERT INTO clients(first_name,second_name,last_name,phone,adress,pasport) VALUES (?, ?, ?, ?, ?, ?)';
var sql_clients_update = 'UPDATE clients SET first_name=?, second_name=?,last_name=?,phone =?,adress=?,pasport=? WHERE first_name=? AND second_name=? AND last_name=?';

app.get("/clients", (request, response) => {
	db.all(sql_clients_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("clients", {rows: rows});
	});
});

app.post("/add_client", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [
		request.body.name1, 
		request.body.name2, 
		request.body.name3, 
		request.body.phone, 
		request.body.adress, 
		request.body.pasport
		];

	db.run(sql_clients_insert, data, (err) => {
		if (err) console.log(err.message);
	});

	db.all(sql_clients_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("clients", {rows: rows});
	});
});

app.post("/chg_client", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [
		request.body.name1,
		request.body.name2,
		request.body.name3, 
		request.body.phone, 
		request.body.adress, 
		request.body.pasport, 
		request.body.name1_old, 
		request.body.name2_old, 
		request.body.name3_old
		];

	db.run(sql_clients_update, data, function (err) {
		if (err) console.log(err.message);
		console.log(`Row(s) updated: ${this.changes}`);
	});

	db.all(sql_clients_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("clients", {rows: rows});
	});
});

// Таблица стран
var sql_countries_all = 'SELECT name FROM countries ORDER BY name';
var sql_countries_insert = 'INSERT INTO countries(name) VALUES (?)';
var sql_countries_update = 'UPDATE countries SET countries=? WHERE countries=?';

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

app.post("/chg_country", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [request.body.name, request.body.name_old];

	db.run(sql_countries_update, data, function (err) {
		if (err) console.log(err.message);
		console.log(`Row(s) updated: ${this.changes}`);
	});

	db.all(sql_countries_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("countries", {rows: rows});
	});
});

// Таблица туров
var sql_tours_all = 'SELECT tours.name, arrival_date date, countries.name country, num_days, num_place, price_rubl FROM tours LEFT JOIN countries ON tours.id_country = countries.id ORDER BY tours.name';
var sql_tours_insert = 'INSERT INTO tours(first_name,second_name,last_name,phone,adress,pasport) VALUES (?, ?, ?, ?, ?, ?)';

app.get("/tours", function (request, response) {
	db.all(sql_countries_all, function (err, countries) {
		if (err) console.log(err.message);
		db.all(sql_tours_all, function (err, rows) {
		  if (err) console.log(err.message);
		  response.render("tours", {countries: countries, rows: rows});
		});
	});
});

app.post("/add_tour", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [
		request.body.name, 
		request.body.date, 
		request.body.country, 
		request.body.num_days, 
		request.body.num_place, 
		request.body.price_rubl
	];

	db.run(sql_tours_insert, data, (err) => {
		if (err) console.log(err.message);
	});

	db.all(sql_tours_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("tours", {rows: rows});
	});
});


// Распределение агентов

var sql_conn_all = 'SELECT agents.first_name a_f_name, agents.second_name a_s_name, clients.first_name c_f_name, clients.second_name c_s_name FROM agents JOIN connections ON connections.id_agent = agents.id JOIN clients ON connections.id_client = clients.id ORDER BY agents.first_name';
//var sql_conn_insert = 'INSERT INTO tours(first_name,second_name,last_name,phone,adress,pasport) VALUES (?, ?, ?, ?, ?, ?)';

app.get("/connections", (request, response) => {
	db.all(sql_conn_all, (err, rows) => {
	  if (err) console.log(err.message);
	  response.render("connections", {rows: rows});
	});
});

// Поиск туров по дате

/*
	SELECT tours.name as tour_name, countries.name country, arrival_date date, num_days, num_place, price_rubl
	(num_place-ifnull(ord_place,0)) as free_place
	FROM tours LEFT JOIN countries 
	ON id_country = countries.id
	LEFT JOIN (
		SELECT id_tour, COUNT(id_client) as ord_place
		FROM groups
		GROUP BY id_tour) as tmp_table 
	ON tours.id = tmp_table.id_tour
	WHERE
		free_place >= 8 AND
		tours.arrival_date BETWEEN '2017-12-03' AND date(julianday('2017-12-11')- num_days)
	ORDER BY tours.arrival_date;
*/
var sql_search_date = 'SELECT tours.name as tour_name, countries.name country, arrival_date date, num_days, num_place, price_rubl price, (num_place-ifnull(ord_place,0)) as free_place FROM  tours LEFT JOIN countries ON id_country = countries.id LEFT JOIN ( SELECT id_tour, COUNT(id_client) as ord_place FROM groups GROUP BY id_tour) as tmp_table  ON tours.id = tmp_table.id_tour WHERE free_place >= (?) AND tours.arrival_date BETWEEN (?) AND date(julianday(?) - num_days) ORDER BY tours.arrival_date';

var sql_currencies_all = 'SELECT id, name FROM currencies ORDER BY name';
var sql_curs = 'SELECT value FROM exchange_rates LEFT JOIN currencies ON currencies.id = id_currency WHERE name = ?';

app.get("/search_date", (request, response) => {
	db.all(sql_currencies_all, function (err, currencies) {
		if (err) console.log(err.message);
		response.render("search_date", {currencies: currencies, rows: []});
	});
});

app.post("/search_date_go", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [parseInt(request.body.free_place), request.body.date1, request.body.date2];
	db.all(sql_currencies_all, function (err, currencies) {
		if (err) console.log(err.message);
		db.get(sql_curs, [request.body.currency], function (err, value) {
			if (err) console.log(err.message);
			db.all(sql_search_date, data, function (err, rows) {
				if (err) console.log(err.message);
				response.render("search_date", {currencies: currencies, rows: rows, value: value.value});
			});
		});
	});
});

// Поиск туристов
/*
SELECT first_name name1, second_name name2, last_name name3, phone, adress, pasport 
FROM clients 
LEFT JOIN groups 
ON id = groups.id_client 
WHERE groups.id_tour = (SELECT id 
	FROM tours 
	WHERE name = ? AND arrival_date = ? AND id_country = (SELECT id 
		FROM countries 
		WHERE countries.name = ?) AND num_days = ? AND num_place= ? AND  price_rubl = ?)
*/

var sql_search_client = 'SELECT first_name name1, second_name name2, last_name name3, phone, adress, pasport FROM clients LEFT JOIN groups ON id = groups.id_client WHERE groups.id_tour = (SELECT id FROM tours WHERE name = ? AND arrival_date = ? AND id_country = (SELECT id FROM countries WHERE countries.name = ?) AND num_days = ? AND num_place= ? AND  price_rubl = ?)';

app.get("/search_tourist", (request, response) => {
	db.all(sql_countries_all, function (err, countries) {
	  if (err) console.log(err.message);
	  response.render("search_tourist", {countries: countries, rows: []});
	});
});

app.post("/search_tourist_go", urlencodedParser, (request, response) => {
	if(!request.body) return response.sendStatus(400);

	let data = [
		request.body.name, 
		request.body.date, 
		request.body.country, 
		parseInt(request.body.num_days), 
		parseInt(request.body.num_place), 
		parseInt(request.body.price_rubl)
	];
	db.all(sql_countries_all, function (err, countries) {
	    if (err) console.log(err.message);
	    db.all(sql_search_client, data, function (err, rows) {
			if (err) console.log(err.message);
			response.render("search_tourist", {countries: countries, rows: rows});
		});
	});
});


app.listen(3000);

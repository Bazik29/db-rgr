INSERT INTO agents(first_name,second_name,last_name,phone) VALUES (
	'Тимофеева', 'Катерина', 'Степановна', '8 (913) 804-58-26'
), (
	'Остимчук', 'Оксана', 'Валерьевна', '8 (925) 340-49-75'
), (
	'Щербаков', 'Григорий', 'Максович', '8 (927) 390-26-16'
), (
	'Трофимова', 'Агата', 'Матвеевна', '8 (952) 377-73-70; 8 (945) 163-61-22'
), (
	'Леонтьев', 'Артем', 'Филиппович', '8 (955) 165-62-32'
);

INSERT INTO clients(first_name,second_name,last_name,phone,adress,pasport) VALUES (
	'Никитина', 'Любовь', 'Александровна', '8 (954) 712-62-27; 8 (954) 722-32-27', '676745, г. Арсеньев, ул. Екатерины Бакуниной, дом 42, квартира 47', '11 23 412222'
), (
	'Троицкий', 'Захар', 'Алексеевич', '8 (923) 874-62-27', '183050, г. Спасск-Рязанский, ул. Азовская, дом 95, квартира 169', '11 23 412354'
), (
	'Холодков', 'Кондрат', 'Геннадиевич', '8 (945) 853-94-79', '461743, г. Тихорецк, ул. Бажова, дом 5, квартира 284', '11 23 412312'
), (
	'Воробьёв', 'Велимир', 'Михайлович', '8 (954) 196-32-45', '181323, г. Богородицк, ул. Строителей, дом 88, квартира 242', '11 23 412392'
), (
	'Зеленов', 'Конон', 'Тимофеевич', '8 (930) 492-59-60', '307237, г. Киров, ул. Авиационная, дом 52, квартира 138', '11 23 412319'
), (
	'Кузьмин', 'Аверкий', 'Иванович', '8 (919) 483-43-12', '461070, г. Тугаев, ул. Балчуг, дом 75, квартира 47', '13 23 411312'
), (
	'Алексеев', 'Андрей', 'Макарович', '8 (938) 826-88-96; 8 (954) 765-64-28', '157650, г. Переволоцкий, ул. Балтийская, дом 11, квартира 178', '11 23 429312'
), (
	'Кириллова', 'Дина', 'Олеговна', '8 (963) 643-34-80', '347715, г. Губкин, ул. Весенняя, дом 5, квартира 98', '41 23 412312'
), (
	'Щербаков', 'Авдей', 'Федорович', '8 (931) 854-65-39', '249702, г. Урюпинск, ул. Баррикадная, дом 16, квартира 77', '11 23 52312'
), (
	'Ильин', 'Лука', 'Викторович', '8 (905) 943-18-74', '425375, г. Тихвин, ул. Вагжанова, дом 8, квартира 107', '10'
), (
	'Зайцева', 'Эмма', 'Викторовна', '8 (975) 398-79-45', '425309, г. Солонцы, ул. Авиаконструктора Миля, дом 48, квартира 9', '11 23 434312'
);

INSERT INTO connections(id_agent,id_client) VALUES (
	1, 1
), (
	1, 3
), (
	1, 2
), (
	2, 4
), (
	2, 6
), (
	3, 5
), (
	1, 7
), (
	4, 8
), (
	4, 9
), (
	5, 10
), (
	1, 11
);

INSERT INTO countries(name) VALUES (
	'Абхазия'
), (
	'Греция'
), (
	'Россия'
), (
	'Турция'
);

INSERT INTO tours(name, arrival_date, id_country, num_days, num_place, price_rubl) VALUES (
	  'В сердце Петербурга', '2017-12-05', 3, 6, 10, 5700
  ), (
  	'В сердце Петербурга', '2017-12-15', 3, 6, 10, 5700
  ), (
  	'В сердце Петербурга', '2017-12-18', 3, 6, 10, 5700
  ), (
  	'Водопад «Мужские слезы»', '2017-12-03', 1, 7, 15, 7200
  ), (
  	'Водопад «Мужские слезы»', '2017-12-12', 1, 4, 10, 6300
  ), (
  	'Водопад «Мужские слезы»', '2017-12-16', 1, 7, 15, 7200
  ), (
  	'Водопад «Мужские слезы»', '2017-12-22', 1, 13, 15, 9400
  ), (
  	'Пещера «Абрскил»', '2017-12-01', 1, 12, 8, 13900
  ), (
  	'Пещера «Абрскил»', '2017-12-11', 1, 7, 8, 6800
  ), (
  	'Пещера «Абрскил»', '2017-12-20', 1, 10, 8, 12800
  ), (
  	'Храм Эрехтейон', '2017-12-03', 2, 14, 11, 12300
  ), (
  	'Храм Эрехтейон', '2017-12-11', 2, 14, 9, 11800
  ), (
  	'Храм Эрехтейон', '2017-12-20', 2, 10, 11, 10300
  ), (
  	'Осмотр достопримечательностей', '2017-12-20', 2, 14, 11, 19900
  ), (
  	'Осмотр достопримечательностей', '2017-12-12', 1, 10, 11, 1300
  ), (
  	'Осмотр достопримечательностей', '2017-12-23', 3, 10, 11, 12250
  ), (
  	'Осмотр достопримечательностей', '2017-12-05', 2, 10, 11, 8900
  );

  INSERT INTO currencies(name) VALUES (
  'рубль'
), (
  'доллар'
), (
  'евро'
);

INSERT INTO groups(id_tour,id_client) VALUES (
  1, 1
), (
  1, 3
), (
  1, 2
), (
  2, 4
), (
  2, 6
), (
  3, 5
), (
  1, 7
), (
  4, 8
), (
  4, 9
), (
  5, 10
), (
  1, 11
);

INSERT INTO exchange_rates(id_currency, value) VALUES (
  1, 1
), (
  2, 58
), (
  3, 69
);
PRAGMA foreign_keys = on;

CREATE TABLE agents (
  id INTEGER PRIMARY KEY ASC,
  first_name VARCHAR(255) NOT NULL,
  second_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL
);

CREATE TABLE clients (
  id INTEGER PRIMARY KEY ASC,
  first_name VARCHAR(255) NOT NULL,
  second_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  adress VARCHAR(255) NOT NULL,
  pasport VARCHAR(255) NOT NULL
);

CREATE TABLE connections (
  id_agent INTEGER NOT NULL,
  id_client INTEGER NOT NULL,
  FOREIGN KEY (id_agent) REFERENCES agents(id)
  FOREIGN KEY (id_client) REFERENCES clients(id)
);
    
CREATE TABLE tours (
  id INTEGER NULL PRIMARY KEY ASC,
  name VARCHAR(255) NOT NULL,
  arrival_date DATE NOT NULL,
  id_country INTEGER NOT NULL,
  num_days INTEGER NOT NULL,
  num_place INTEGER NOT NULL,
  price_rubl INTEGER NOT NULL,
  FOREIGN KEY (id_country) REFERENCES countries(id)
);
    
CREATE TABLE groups (
  id_tour INTEGER NOT NULL,
  id_client INTEGER NOT NULL,
  FOREIGN KEY (id_tour) REFERENCES tours(id)
  FOREIGN KEY (id_client) REFERENCES clients(id)
);

CREATE TABLE countries (
  id INTEGER PRIMARY KEY ASC,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE currencies (
  id INTEGER PRIMARY KEY ASC,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE exchange_rates (
  id INTEGER PRIMARY KEY ASC,
  id_currency VARCHAR(255) NOT NULL,
  value INTEGER NOT NULL,
  FOREIGN KEY (id_currency) REFERENCES currencies(id)
);

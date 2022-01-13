CREATE KEYSPACE express WITH replication = {'class' : 'NetworkTopologyStrategy','my_datacenter' : 1};
CREATE TABLE express.customers (id int primary key,name text);
insert into express.customers(id,name) values(1,'resul güldibi');
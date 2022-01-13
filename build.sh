#run containers
docker-compose up -d
#create database and table in cassandra
#create database in cassandra
docker exec -it cassandra cqlsh -e "CREATE KEYSPACE express WITH replication = {'class' : 'NetworkTopologyStrategy','my_datacenter' : 1};"
#create table in cassandra in my_database
docker exec -it cassandra cqlsh -e "CREATE TABLE express.customers (id int primary key,name text);"
#insert sample record
docker exec -it cassandra cqlsh -e "insert into express.customers(id,name) values(1,'resul güldibi');"
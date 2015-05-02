drop table links;
create table if not exists links (
  id serial,
  title varchar(65536),
  url varchar(65536),
  user_id integer,
  createdAt date,
  updatedAt date
);

drop table users;
create table if not exists users (
  id serial,
  name varchar(65536),
  password varchar(65536)
);

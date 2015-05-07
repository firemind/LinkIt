drop table links;
create table if not exists links (
  id serial,
  title varchar(65536),
  url varchar(65536),
  rating integer not null default 0,
  UserId integer,
  createdAt date,
  updatedAt date
);

drop table users;
create table if not exists users (
  id serial,
  name varchar(65536),
  password varchar(65536),
  createdAt date,
  updatedAt date
);

create table if not exists votes (
  id serial,
  UserId integer,
  LinkId integer,
  upvote boolean,
  createdAt date,
  updatedAt date
);

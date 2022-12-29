require('dotenv').config()
const {DATABASE_CONFIG} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(DATABASE_CONFIG, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed:(req,res) => {
        sequelize
          .query(
            `
            drop table if exists watch_users;
            drop table if exists list;
            

            create table watch_users(
                watch_user_id serial primary key,
                email varchar not null,
                passhash varchar(500) not null 
            );
          
              create table list (
                list_id serial primary key,
                day integer not null,
                header varchar(500) not null, 
                content text not null
            );
        `
          )
          .then((dbRes) => res.sendStatus(200))
          .catch((err) => res.status(400).send(err));
    }
}
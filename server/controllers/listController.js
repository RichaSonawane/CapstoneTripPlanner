require("dotenv").config();
const { DATABASE_CONFIG } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_CONFIG, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  getList: (req, res) => {
    sequelize
      .query(` select * from list order by day asc; `)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  createList: (req, res) => {
    let { day, header, content } = req.body;
    sequelize
      .query(
        `insert into list (day,header,content) values ('${day}','${header}','${content}')returning *;`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  deleteList: (req, res) => {
    const { id } = req.params;
    sequelize
      .query(`delete from list where list_id='${id}'`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  updateList:(req,res)=>{
    const { id }=req.params;
    let {header,content}=req.body;
    sequelize
      .query(
        `update list set header='${header}',content = '${content}'
    where list_id='${id}';
    `
      )
      .then(() => res.sendStatus(200))
      .catch((err) => console.log(err));
  }
};
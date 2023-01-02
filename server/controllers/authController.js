require("dotenv").config();
const bcrypt = require("bcryptjs");
const { DATABASE_CONFIG, SECRET } = process.env;
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");

const createToken = (email, id) => {
  return jwt.sign(
    {
      email,
      id,
    },
    SECRET,
    {
      expiresIn: "2 days",
    }
  );
};

const sequelize = new Sequelize(DATABASE_CONFIG, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
module.exports = {
  userLogin: (req, res) => {
    const { email, password } = req.body;
    sequelize
      .query(`select * from watch_users where email = '${email}'`)
      .then((dbRes) => {
        if (!dbRes[0][0]) {
          return res.status(400).send("Account not found, try signing up");
        }
        // const {passhash} = dbRes[0][0]

        const authenticated = bcrypt.compareSync(
          password,
          dbRes[0][0].passhash
        );
        if (!authenticated) {
          res.status(403).send("incorrect password");
        }
        delete dbRes[0][0].passhash;
        const token = createToken(email, dbRes[0][0].watch_user_id);
        console.log("token", token);
        const userToSend = { ...dbRes[0][0], token };
        res.status(200).send(userToSend);
      })
      .catch((err) => console.log(err));
  },
  userSignup: (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    sequelize
      .query(`select * from watch_users where email = '${email}'`)
      .then((dbRes) => {
        console.log(dbRes[0]);
        if (dbRes[0][0]) {
          return res.status(400).send("Email is already in use, try login");
        } else {
          let salt = bcrypt.genSaltSync(10);
          const passhash = bcrypt.hashSync(password, salt);
          sequelize
            .query(
              `
                    insert into watch_users(email,passhash) values('${email}','${passhash}');
                    select * from watch_users where email = '${email}';
                `
            )
            .then((dbResponse) => {
              // console.log(dbRes[0])
              delete dbResponse[0][0].passhash;
              const token = createToken(email, dbResponse[0][0].watch_user_id);
              console.log("token", token);
              const userToSend = { ...dbResponse[0][0], token };
              console.log(userToSend);
              res.status(200).send(userToSend);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  },
};

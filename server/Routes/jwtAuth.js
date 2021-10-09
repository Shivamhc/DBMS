const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../DB/index");
const jwtGenerator = require("../Utils/jwtGenerator");
const validInfo = require("../MiddleWare/validInfo");
const authorization = require("../MiddleWare/authorization");

//REGISTERING

router.post("/register", validInfo, async (req, res) => {
  try {
    //1. DESTRUCTURE THE REQ.BODY (NAME,EMAIL,PASSWORD  )

    const { name, email, password } = req.body;

    //2. CHECK IF USER EXISTS (IF USER EXIST THEN THROW ERROR)
    const user = await db.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);
    if (user.rows.length) {
      return res.status(401).send("User Already Exists");
    } else {
      //3. BCRYPT THE USER PASSWORD
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);

      const bcryptPassword = await bcrypt.hash(password, salt);
      //4. ENTER THE NEW USER INSIDE OUR DATABASE
      const newUser = await db.query(
        "INSERT INTO users(user_name,user_email,user_password) values ($1,$2,$3) returning *",
        [name, email, bcryptPassword]
      );

      //res.json(newUser.rows);

      //5. GENERATING OU JWT TOKEN
      const token = jwtGenerator(newUser.rows[0].user_id);
      res.json({ token });
    }
  } catch (err) {
    console.log(err);
  }
});

//LOGIN ROUTES
router.post("/login", validInfo, async (req, res) => {
  try {
    //1. DESTRUCTURE THE REQ.BODY
    const { email, password } = req.body;
    //2. CHECK IF USER DOESN'T EXIST(IF NOT THEN WE THROW ERROR)
    const user = await db.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);
    if (user.rows.length == 0) {
      return res.status(401).json("Password or Email is incorrect");
    }
    //3. CHECK IF INCOMING PASSWORD IS THE SAME AS THE DATABASE PASSWORD

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    //4. GIVE THEM THE JWT TOKEN
    const token = jwtGenerator(user.rows[0].user_id);

    return res.json({ token });
  } catch (err) {
    console.log(err);
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

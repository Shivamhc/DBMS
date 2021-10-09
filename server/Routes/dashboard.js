const router = require("express").Router();
const db = require("../DB/index");
const authorization = require("../MiddleWare/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    //req.user has the payload
    //res.json(req.user);

    const user = await db.query("SELECT * FROM users WHERE user_id=$1", [
      req.user,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

import express from "express";
import { db } from "../connect.js";
import bodyParser from "body-parser";

const router = express.Router();

router.get("api/user/:id", (req, res) => {
  const q = "SELECT * FROM users WHERE id = ?";

  console.log(req.params.id);
  db.query(q, [req.params.id], (err, data) => {
    if (err) console.log(err.message);
    // const { password, ...info } = data[0];
    // console.log(data[0]);
    console.log(data[0]);
    const { username, ...info } = data[0];
    console.log(username);
    console.log({ ...info });
  });

  res.send("Hey user!");
});

router.post("/register", (req, res) => {
  const {
    id,
    username,
    status,
    status_message,
    active,
    last_active,
    created_at,
    updated_at,
    deleted_at,
  } = req.body;

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) console.log(err.message);
    // console.log(data[0]);
  });

  const register_user_query =
    "INSERT INTO users (`username`, `status`, `status_message`, `active`, `last_active`, `created_at`, `updated_at`, `deleted_at`) VALUES (?)";

  db.query(
    register_user_query,
    [[username, null, null, 1, null, created_at, null, null]],
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const q =
    "SELECT * FROM users INNER JOIN user_pw USING (username) WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) throw err;
    if (data[0].password) {
      res.status(200).send(data[0].password);
    }
  });
});

export default router;

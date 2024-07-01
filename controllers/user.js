import { db } from "../connect";

const q = "SELECT * FROM users";

db.query(q, null, (err, data) => {
  const { password, ...info } = data[0];
  console.log(password);
  console.log(...info);
});

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("../users.json");
const db = low(adapter);

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;
    const foundUser = db
      .get("users")
      .find({ email, password })
      .value();

    if (!foundUser) {
      return res.status(403).send("Username or Password is wrong");
    }
    delete foundUser.password;

    req.session.user = foundUser;

    res.status(200).send("login sucessfully");
  },
  getUserData: (req, res) => {
    res.status(200).send(req.session.user);
  },
  getTransactions: (req, res) => {
    const { user } = req.session;
    let transactions = [];
    const generator = balance => {
      const diff = balance - 500;
      if (diff >= 0) {
        transactions.push({ name: "Water Services", price: "$500" });
        if (diff === 0) return;
        generator(diff);
      } else {
        transactions.push({
          name: "Water Services",
          price: `$ ${(diff + 500).toFixed(2)}`
        });
        return;
      }
    };
    const userBalance = user.balance
      .split("")
      .filter(num => num !== "$" && num !== ",")
      .join("");

    generator(Number(userBalance));

    res.status(200).send({ transactions });
  },
  logout: (req, res) => {
    delete req.session.user;
    res.send("logout successful");
  }
};

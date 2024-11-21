const jwt = require("jsonwebtoken");

module.exports = {

  checkRaw: (req, res, next) => {         
    let token = req.get("authorization").slice(7);
    jwt.verify(token, process.env.JWT_KEY,{}, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          ok: 0,
          e: "error_auth",
          m: "Invalid Token..."
        }).send();
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }

};

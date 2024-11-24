const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // payload -body of the data being sent or retrieved
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(400).json({ error: "Unauthorized" });
      }
      try {
        const user = await User.findOne({ _id: payload._id }).select(
          "-password"
        );
        if (!user) return res.status(404).json({ error: "user not found" });

        req.user = user.toObject();
        console.log("middleware req.user:", req.user);
        next();
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};

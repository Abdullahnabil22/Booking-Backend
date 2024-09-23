jwt = require("jsonwebtoken");

const util = require("util");

// ببعت توكن للهوست تحت مسمي athu  عشان يقدر ياكسس علي هوست وهو اصلا جاي من يوزر تحت لوجن
exports.auth = async function (req, res, next) {
  let { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ massage: "please login first " });
  }

  try {
    let decoded = await util.promisify(jwt.verify)(
      authorization,
      process.env.secret
    );
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ massage: "you are not authonticated" });
  }
};

//all argument[]
exports.restrictTo = function (...roles) {
  return function (req, res, next) {
    console.log(req.role);
    if (!roles.includes(req.role)) {
      return res
        .status(403)
        .json({ massege: "you do not have permition to do this action" });
    }
    next();
  };
};

/////////////// midddelwear from user has token

exports.authUser = async function (req, res, next) {
  var authh = req.headers.authorization;
  console.log(authh);
  if (!authh) {
    return res.send({ message: "unauthorizedd" });
  }
  try {
    var decodeda = jwt.verify(authh, process.env.SECRET);
    req.id = decodeda.id;

    next();
  } catch (err) {
    next(err);
  }
};

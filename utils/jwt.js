const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createTokenUser = (user) => {
  return { name: user.name, userId: user._id };
};

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = ({ res, user }) => {
  const accessTokenJWT = createJWT({ payload: { user } });

  const oneDayExpire = 1000 * 60 * 60 * 24; //1 days

  res.cookies("x-access-token", accessTokenJWT, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDayExpire),
  });

  return { token: accessTokenJWT };
};

module.exports = {
  createJWT,
  isTokenValid,
  createTokenUser,
  attachCookiesToResponse,
};

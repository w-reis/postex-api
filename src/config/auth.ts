export default {
  jwt: {
    user_secret: process.env.USER_SECRET,
    recipient_secret: process.env.RECIPIENT_SECRET,
    expiresIn: process.env.JWT_EXPIRESIN,
  },
};

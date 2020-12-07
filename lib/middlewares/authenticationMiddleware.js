// const argon2 = require('argon2');

// async function authenticationMiddleware(res, req, next) {
//   const { cookies } = req.cookies;
//   if (cookies && cookies.Authorization) {
//     const secret = process.env.SECRET_TOKEN;
//     try {
//       const verificationResponse = argon2.verify(cookies.Authorization, secret);
//       const { id } = verificationResponse.id;
//       const user = await user
//     } catch (error) {}
//   }
// }

// module.exports = authenticationMiddleware;

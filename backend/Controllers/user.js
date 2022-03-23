// const user = require("../Models/user");
// exports.getuserById = (req, res, next, id) => {
//   //console.log("inside get");
//   user.findById(id).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     req.profile = user;
//     next();
//   });
// };

// exports.getuser = (req, res) => {
//   //console.log("isnide suwee");
//   req.profile.salt = undefined;
//   req.profile.encry_password = undefined;
//   return res.json(req.profile);
// };
// exports.updateUser = (req, res) => {
//   user.findByIdAndUpdate(
//     { _id: req.profile._id },
//     { $set: req.body },
//     { new: true, userFindAndModify: false },
//     (err, user) => {
//       if (err) {
//         return res.status(400).json({
//           error: "U are not authorise to update this user",
//         });
//       }
//       user.salt = undefined;
//       user.encry_password = undefined;
//       res.json(user);
//     }
//   );
// };

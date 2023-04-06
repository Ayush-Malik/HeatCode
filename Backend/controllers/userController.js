const showUser = [
  async (req, res, next) => {
    res.send("show user route");
  },
];
const updateUser = [
  async (req, res, next) => {
    res.send("update user route");
  },
];
module.exports = {
  showUser,
  updateUser,
};

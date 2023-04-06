const showAll = async (req, res, next) => {
  res.send("Show all prolems route");
};

const addProblems = async (req, res, next) => {
  res.send("add problems route");
};

module.exports = {
  showAll,
  addProblems,
};

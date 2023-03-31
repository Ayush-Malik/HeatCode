const redirect = (req, res, next) => {
  if (!req.body.role) throw new Error(`Invalid/Empty role : ${req.body.role}`);
};

const testAuth = (req, res) => {
  res.json({ message: "Auth route working from controller!" });
};

module.exports = {
  testAuth,
};

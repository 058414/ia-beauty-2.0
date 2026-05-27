module.exports = (req, res) => {
  res.status(200).json({ message: 'API test - OK', timestamp: new Date().toISOString() });
};

module.exports = function(paramsId) {
  if (!paramsId.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Invalid ID');
};

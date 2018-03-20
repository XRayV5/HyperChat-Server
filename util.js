Array.prototype.remove = function(val) {
  return this.filter(_val => _val != val);
};

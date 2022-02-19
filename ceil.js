function ceil(num) {
  let res = Math.ceil(num * 100) / 100;
  res = res.toFixed(2);
  return res;
}

module.exports = ceil;

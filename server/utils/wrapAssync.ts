module.exports = (fn: any) => {
  return function (req: any, res: any, next: any) {
    fn(req, res, next).catch(next);
  };
};

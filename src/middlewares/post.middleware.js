async function userCookieRequest(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      msg: 'Token not provided, Unauthorized access',
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      msg: 'user not authorized',
    });
  }

  req.user = decoded;
  next();
}

module.exports = userCookieRequest;

import jwt from 'jsonwebtoken';

export const generateToken = (req, res, userId) => {
  // Generate JWT Token
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE, // e.g., '7d'
  });

  // Set token as cookie
  res.cookie('jwt', token, {
    httpOnly: true, // Prevent client-side JavaScript access to the cookie
    secure: process.env.NODE_ENV === 'production', // Set to true if you're in production (HTTPS)
    sameSite: 'None', // Allows the cookie to be sent across different domains (cross-origin)
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration (e.g., 7 days)
  });

  return token;
};

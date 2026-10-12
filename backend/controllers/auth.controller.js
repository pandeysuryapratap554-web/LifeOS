const bcrypt = require('bcryptjs');
const { getDatabasePool } = require('../config/db');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_SALT_ROUNDS = 12;

function validationError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function normalizeRegistrationInput(body) {
  const { name, email, password } = body || {};

  if (typeof name !== 'string' || !name.trim()) {
    throw validationError('Name is required.');
  }

  if (typeof email !== 'string' || !email.trim()) {
    throw validationError('Email is required.');
  }

  if (typeof password !== 'string' || !password) {
    throw validationError('Password is required.');
  }

  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedName.length > 100) {
    throw validationError('Name must be 100 characters or fewer.');
  }

  if (normalizedEmail.length > 255 || !EMAIL_PATTERN.test(normalizedEmail)) {
    throw validationError('Email must be a valid email address.');
  }

  if (password.length < 8) {
    throw validationError('Password must be at least 8 characters long.');
  }

  return {
    name: normalizedName,
    email: normalizedEmail,
    password,
  };
}

async function registerUser(request, response, next) {
  try {
    const { name, email, password } = normalizeRegistrationInput(request.body);
    const databasePool = getDatabasePool();
    const [existingUsers] = await databasePool.execute(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (existingUsers.length > 0) {
      return response.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
    const [result] = await databasePool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );

    return response.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: {
        id: result.insertId,
        name,
        email,
      },
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return response.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    return next(error);
  }
}

module.exports = {
  registerUser,
};

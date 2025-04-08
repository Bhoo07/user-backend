import pool from '../config/db.js';

const createUsersTable = (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      maiden_name VARCHAR(50),
      age INT,
      gender VARCHAR(10),
      email VARCHAR(100),
      phone VARCHAR(30),
      username VARCHAR(50),
      password VARCHAR(100),
      birth_date DATE,
      image VARCHAR(255),
      blood_group VARCHAR(10),
      height FLOAT,
      weight FLOAT,
      eye_color VARCHAR(50),
      ip VARCHAR(50),
      mac_address VARCHAR(50),
      university VARCHAR(100),
      ein VARCHAR(50),
      ssn VARCHAR(50),
      user_agent TEXT,
      role VARCHAR(50)
    );

    CREATE TABLE IF NOT EXISTS hair (
      user_id INT PRIMARY KEY,
      color VARCHAR(50),
      type VARCHAR(50),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS address (
      user_id INT PRIMARY KEY,
      address_line VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(100),
      state_code VARCHAR(10),
      postal_code VARCHAR(20),
      latitude DOUBLE,
      longitude DOUBLE,
      country VARCHAR(100),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS company (
      user_id INT PRIMARY KEY,
      name VARCHAR(100),
      department VARCHAR(100),
      title VARCHAR(100),
      address_line VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(100),
      state_code VARCHAR(10),
      postal_code VARCHAR(20),
      latitude DOUBLE,
      longitude DOUBLE,
      country VARCHAR(100),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS bank (
      user_id INT PRIMARY KEY,
      card_expire VARCHAR(10),
      card_number VARCHAR(30),
      card_type VARCHAR(30),
      currency VARCHAR(10),
      iban VARCHAR(100),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS crypto (
      user_id INT PRIMARY KEY,
      coin VARCHAR(50),
      wallet VARCHAR(255),
      network VARCHAR(100),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `;

  pool.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return res.status(500).json({
        status: false,
        message: 'Error creating users table',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Users table created successfully',
    });
  });
};

export default createUsersTable;

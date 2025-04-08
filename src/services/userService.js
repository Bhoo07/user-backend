// src/services/userService.js
import  {pool}  from '../config/db.js';

export const getPaginatedUsers = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const [countRows] = await pool.query('SELECT COUNT(*) AS total FROM users');
  const totalUsers = countRows[0].total;

  if (totalUsers === 0) return { totalUsers: 0, users: [] };

  const [usersData] = await pool.query(`
    SELECT u.*, h.color AS hair_color, h.type AS hair_type,
           a.address_line AS user_address, a.city AS user_city, a.state AS user_state,
           a.state_code AS user_state_code, a.postal_code AS user_postal_code,
           a.latitude AS user_latitude, a.longitude AS user_longitude, a.country AS user_country,
           c.name AS company_name, c.department AS company_department, c.title AS company_title,
           c.address_line AS company_address, c.city AS company_city, c.state AS company_state,
           c.state_code AS company_state_code, c.postal_code AS company_postal_code,
           c.latitude AS company_latitude, c.longitude AS company_longitude, c.country AS company_country,
           b.card_expire, b.card_number, b.card_type, b.currency, b.iban,
           cr.coin, cr.wallet, cr.network
    FROM users u
    LEFT JOIN hair h ON u.id = h.user_id
    LEFT JOIN address a ON u.id = a.user_id
    LEFT JOIN company c ON u.id = c.user_id
    LEFT JOIN bank b ON u.id = b.user_id
    LEFT JOIN crypto cr ON u.id = cr.user_id
    LIMIT ? OFFSET ?
  `, [limit, offset]);

  const users = usersData.map(user => ({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    maidenName: user.maiden_name,
    age: user.age,
    gender: user.gender,
    email: user.email,
    phone: user.phone,
    username: user.username,
    password: user.password,
    birthDate: user.birth_date,
    image: user.image,
    bloodGroup: user.blood_group,
    height: user.height,
    weight: user.weight,
    eyeColor: user.eye_color,
    hair: {
      color: user.hair_color,
      type: user.hair_type,
    },
    ip: user.ip,
    macAddress: user.mac_address,
    university: user.university,
    ein: user.ein,
    ssn: user.ssn,
    userAgent: user.user_agent,
    address: {
      address: user.user_address,
      city: user.user_city,
      state: user.user_state,
      stateCode: user.user_state_code,
      postalCode: user.user_postal_code,
      coordinates: {
        lat: user.user_latitude,
        lng: user.user_longitude,
      },
      country: user.user_country,
    },
    company: {
      name: user.company_name,
      department: user.company_department,
      title: user.company_title,
      address: {
        address: user.company_address,
        city: user.company_city,
        state: user.company_state,
        stateCode: user.company_state_code,
        postalCode: user.company_postal_code,
        coordinates: {
          lat: user.company_latitude,
          lng: user.company_longitude,
        },
        country: user.company_country,
      },
    },
    bank: {
      cardExpire: user.card_expire,
      cardNumber: user.card_number,
      cardType: user.card_type,
      currency: user.currency,
      iban: user.iban,
    },
    crypto: {
      coin: user.coin,
      wallet: user.wallet,
      network: user.network,
    },
    role: user.role,
  }));

  return {
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
    users,
  };
};

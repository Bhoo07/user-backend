import axios from 'axios';
import connection from '../config/db.js';

const insertData = async (req, res) => {
  try {
    const { data } = await axios.get('https://dummyjson.com/users');
    const users = data.users;

    for (const user of users) {
      const userQuery = `
        INSERT IGNORE INTO users (
          id, first_name, last_name, maiden_name, age, gender, email, phone,
          username, password, birth_date, image, blood_group, height, weight,
          eye_color, ip, mac_address, university, ein, ssn, user_agent, role
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const userValues = [
        user.id, user.firstName, user.lastName, user.maidenName, user.age,
        user.gender, user.email, user.phone, user.username, user.password,
        user.birthDate, user.image, user.bloodGroup, user.height, user.weight,
        user.eyeColor, user.ip, user.macAddress, user.university,
        user.ein, user.ssn, user.userAgent, user.role
      ];

      await connection.promise().query(userQuery, userValues);

      if (user.hair) {
        await connection.promise().query(
          `INSERT IGNORE INTO hair (user_id, color, type) VALUES (?, ?, ?)`,
          [user.id, user.hair.color, user.hair.type]
        );
      }

      if (user.address) {
        await connection.promise().query(
          `INSERT IGNORE INTO address (
            user_id, address_line, city, state, state_code, postal_code,
            latitude, longitude, country
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            user.id, user.address.address, user.address.city, user.address.state,
            user.address.stateCode, user.address.postalCode,
            user.address.coordinates.lat, user.address.coordinates.lng,
            user.address.country
          ]
        );
      }

      if (user.company) {
        await connection.promise().query(
          `INSERT IGNORE INTO company (
            user_id, name, department, title,
            address_line, city, state, state_code, postal_code,
            latitude, longitude, country
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            user.id, user.company.name, user.company.department, user.company.title,
            user.company.address.address, user.company.address.city,
            user.company.address.state, user.company.address.stateCode,
            user.company.address.postalCode, user.company.address.coordinates.lat,
            user.company.address.coordinates.lng, user.company.address.country
          ]
        );
      }

      if (user.bank) {
        await connection.promise().query(
          `INSERT IGNORE INTO bank (
            user_id, card_expire, card_number, card_type, currency, iban
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            user.id, user.bank.cardExpire, user.bank.cardNumber,
            user.bank.cardType, user.bank.currency, user.bank.iban
          ]
        );
      }

      if (user.crypto) {
        await connection.promise().query(
          `INSERT IGNORE INTO crypto (user_id, coin, wallet, network) VALUES (?, ?, ?, ?)`,
          [user.id, user.crypto.coin, user.crypto.wallet, user.crypto.network]
        );
      }
    }

    return res.status(200).json({ status: true, message: 'Users inserted successfully' });
  } catch (error) {
    console.error('Insert Error:', error);
    return res.status(500).json({ status: false, message: 'Failed to insert users', error: error.message });
  }
};

export default insertData;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ DB connection error:", err));

// ── HEALTH ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: "OK" });
});

// ── AUTH: SIGNUP ─────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !email || !password) {
    return res.status(400).json({ success: false, error: "First name, email and password are required." });
  }
  try {
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, date_of_birth, gender, nationality)
       VALUES ($1, $2, NULL, NULL, NULL) RETURNING user_id`,
      [firstName, lastName || '']
    );
    const userId = result.rows[0].user_id;
    res.json({
      success: true,
      user: { id: userId, email, firstName, lastName: lastName || '' },
      token: `tok_${userId}_${Date.now()}`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── AUTH: LOGIN ──────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Email and password are required." });
  }
  // Demo: accept any credentials, return user
  res.json({
    success: true,
    user: { id: null, email, firstName: email.split('@')[0], lastName: '' },
    token: `tok_demo_${Date.now()}`
  });
});

// ── SAVE PROFILE ─────────────────────────────────────
app.post('/api/profile', async (req, res) => {
  const data = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const userResult = await client.query(
      `INSERT INTO users (first_name, last_name, date_of_birth, gender, nationality)
       VALUES ($1,$2,$3,$4,$5) RETURNING user_id`,
      [
        data.personal.firstName      || null,
        data.personal.lastName       || null,
        data.personal.dob            || null,
        data.personal.gender         || null,
        data.personal.nationality    || null
      ]
    );
    const userId = userResult.rows[0].user_id;

    await client.query(
      `INSERT INTO contact_info (user_id, email, mobile_number, alternate_phone, address, city, state, country, postal_code)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        userId,
        data.contact.email           || null,
        data.contact.mobile          || null,
        data.contact.altPhone        || null,
        data.contact.address         || null,
        data.contact.city            || null,
        data.contact.state           || null,
        data.contact.country         || null,
        data.contact.postalCode      || null
      ]
    );

    await client.query(
      `INSERT INTO identification_details (user_id, id_type, id_number, id_expiry_date)
       VALUES ($1,$2,$3,$4)`,
      [
        userId,
        data.identification.idType   || null,
        data.identification.idNumber || null,
        data.identification.idExpiry || null
      ]
    );

    await client.query(
      `INSERT INTO booking_preferences (user_id, preferred_room_type, bed_preference, smoking_preference, preferred_floor_or_view)
       VALUES ($1,$2,$3,$4,$5)`,
      [
        userId,
        data.booking.roomType        || null,
        data.booking.bedPreference   || null,
        data.booking.smoking         || null,
        data.booking.floorView       || null
      ]
    );

    await client.query(
      `INSERT INTO payment_info (user_id, saved_card_masked, billing_address, preferred_payment_method)
       VALUES ($1,$2,$3,$4)`,
      [
        userId,
        data.payment.cardNumber      || null,
        data.payment.billingAddress  || null,
        data.payment.paymentMethod   || null
      ]
    );

    // ✅ FIX: "points" → "loyalty_points" (correct column name)
    await client.query(
      `INSERT INTO loyalty_membership (user_id, loyalty_tier, loyalty_points, corporate_account)
       VALUES ($1,$2,$3,$4)`,
      [
        userId,
        data.loyalty.loyaltyTier      || 'Silver',
        0,
        data.loyalty.corporateAccount || null
      ]
    );

    await client.query(
      `INSERT INTO account_settings (user_id, username, password_hash, notification_preferences, language, currency)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        userId,
        data.account.username        || null,
        data.account.password        || null,
        data.account.notifications   || null,
        data.account.language        || null,
        data.account.currency        || null
      ]
    );

    // Only insert activity row if there's an actual booking to log
    if (data.activity && data.activity.hotelName) {
      await client.query(
        `INSERT INTO activity_history (user_id, booking_type, booking_details, booking_date, status)
         VALUES ($1,$2,$3,NOW(),$4)`,
        [userId, 'Upcoming', data.activity.hotelName, 'Active']
      );
    }

    await client.query('COMMIT');
    res.json({ success: true, message: "Profile saved!", userId });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("❌ Profile save error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

// List of valid hostels
const validHostels = ['EDC', 'Emerald', 'Amethyst', 'Faith', 'POD living', 'Cooperative male', 'Cooperative queens', 'Redwood', 'Trinity', 'Cedar', 'Pearl', 'Trezadel'];

router.post('/generate-qr', (req, res) => {
  const { name, email, phone, hostel } = req.body;

  // Validate email
  if (!email.endsWith('@pau.edu.ng')) {
    return res.status(400).json({ error: 'Invalid email. Must end with @pau.edu.ng' });
  }

  // Validate hostel
  if (!validHostels.includes(hostel)) {
    return res.status(400).json({ error: 'Invalid hostel selected.' });
  }

  // Generate QR code with the provided data
  const data = { name, email, phone, hostel };
  QRCode.toDataURL(JSON.stringify(data), (err, url) => {
    if (err) {
      return res.status(500).json({ error: 'Error generating QR code' });
    }
    res.json({ qrCodeUrl: url }); // Send the generated QR code URL
  });
});

module.exports = router;

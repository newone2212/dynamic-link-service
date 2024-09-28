const Link = require('../models/Link');
const { v4: uuidv4 } = require('uuid');

// Create dynamic link
exports.createLink = async (req, res) => {
  try {
    const { title } = req.body;
    const short_id = uuidv4().slice(0, 6); // Generate a unique short ID

    const newLink = new Link({
      title,
      original_link: "https://mail.google.com", // Force redirection to Gmail login
      short_id
    });

    await newLink.save();
    res.status(201).json({
      message: 'Dynamic link created successfully!',
      shortLink: `http://localhost:3000/api/v1/${short_id}`,
      short_id,
    });
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Redirect using short ID
exports.redirectLink = async (req, res) => {
  try {
    const { shortId } = req.params;
    const link = await Link.findOne({ short_id: shortId });

    if (link) {
      link.counter += 1; // Increment counter
      await link.save();
      res.redirect(link.original_link); // Redirect to Gmail login page
    } else {
      res.status(404).json({ message: 'Link not found' });
    }
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

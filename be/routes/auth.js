const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Generate a salt to be used for hashing
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password in the database
    });
    
    userData
      .save()
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        console.log('Error:', err);
        res.status(400).send('Error while registering user');
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.post('/login', async (req, res) => {
//   try {
//     const foundUser = await User.findOne({ name: req.body.name, password: req.body.password });
//     if (foundUser) {
//       res.status(200).send({ message: 'User Authenticated...', isLoggedIn: true });
//     } else {
//       res.status(401).send({ message: 'Unauthorized!!', isLoggedIn: false });
//     }
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    const foundUser = await User.findOne({ name });

    if (foundUser) {
      const isPasswordValid = await bcrypt.compare(password, foundUser.password);

      if (isPasswordValid) {
        res.status(200).send({ message: 'User Authenticated...', isLoggedIn: true });
      } else {
        res.status(401).send({ message: 'Unauthorized!!', isLoggedIn: false });
      }
    } else {
      res.status(401).send({ message: 'Unauthorized!!', isLoggedIn: false });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = router;

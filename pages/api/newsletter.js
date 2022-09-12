export default function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).send({ message: 'Invalid email address.' });
    }

    console.log(userEmail);
    res.status(201).send({ message: 'Signed up!' });
  }
}

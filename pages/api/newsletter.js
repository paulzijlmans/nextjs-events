import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).send({ message: 'Invalid email address.' });
    }

    const client = await MongoClient.connect(process.env.MONGO_DB_URI);
    const db = client.db();
    await db.collection('newsletter').insertOne({ email: userEmail });
    client.close();

    res.status(201).send({ message: 'Signed up!' });
  }
}

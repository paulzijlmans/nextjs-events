import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(process.env.MONGO_DB_URI);

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    const db = client.db();

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() == ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection('comments').insertOne(newComment);
    client.close();

    newComment.id = result.insertedId;
    res.status(201).json({ message: 'Added comment', comment: newComment });
  }

  if (req.method === 'GET') {
    const db = client.db();
    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();
    client.close();

    res.status(200).json({ comments: documents });
  }
}

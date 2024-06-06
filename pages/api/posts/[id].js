// pages/api/posts/[id].js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const postId = parseInt(req.query.id);

  if (req.method === 'GET') {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    res.json(post);
  } else if (req.method === 'PUT') {
    const { title, content } = req.body;
    const post = await prisma.post.update({
      where: { id: postId },
      data: { title, content },
    });
    res.json(post);
  } else if (req.method === 'DELETE') {
    await prisma.post.delete({ where: { id: postId } });
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

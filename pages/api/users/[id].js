// pages/api/users/[id].js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const userId = parseInt(req.query.id);

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { posts: true },
    });
    res.json(user);
  } else if (req.method === 'PUT') {
    const { name, email } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });
    res.json(user);
  } else if (req.method === 'DELETE') {
    await prisma.user.delete({ where: { id: userId } });
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

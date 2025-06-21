import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  if (event.method === 'POST') {
    const body = await readBody(event);
    return await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });
  }

  // GET method: return all posts
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });
});

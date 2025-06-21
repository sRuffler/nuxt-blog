import prisma from '../utils/prisma' // Make sure this is the correct path

export default defineEventHandler(async (event) => {
  if (event.method === 'POST') {
    const body = await readBody(event)

    if (!body.title || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title and content are required',
      })
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    })

    return post
  }

  // For GET requests
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })
})

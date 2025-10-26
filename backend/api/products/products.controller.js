import prisma from '../../config/db.js';

export async function getProductList(req, res) {
  const { page = 1, pageSize = 10, orderBy = 'newest', keyword = '' } = req.query;

  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;

  const products = await prisma.product.findMany({
    where: {
      // 검색 쿼리
      OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
    },
    orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.json(products);
}

export async function getProduct(req, res) {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id },
  });
  res.json(product);
}

export async function createProduct(req, res) {
  const product = await prisma.product.create({
    data: req.body,
  });

  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id },
    data: req.body,
  });

  res.json(product);
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  await prisma.product.delete({
    where: { id },
  });
  res.sendStatus(204);
}

export async function addFavorite(req, res) {
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id },
    data: { favoriteCount: { increment: 1 } },
  });

  res.json({ favoriteCount: product.favoriteCount });
}

import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse } from "@/interface";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse[]>
) {
  const { page = "1" }: { page?: string } = req.query;

  const prisma = new PrismaClient();

  const skipPage = parseInt(page) - 1;

  const count = await prisma.store.count();
  const stores = await prisma.store.findMany({
    orderBy: { id: "asc" },
    take: 10, //가져올 갯수
    skip: skipPage + 10,
  });

  res.status(200).json({
    page: parseInt(page),
    data: stores,
    totalCount: count,
    totalPage: Math.ceil(count / 10),
  });
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Phone } from "@prisma/client";

type Data = {
  error?: string;
  phones?: Array<Phone>;
};

export async function getPhones(
  skip: number,
  take: number
): Promise<Array<Phone>> {
  return await prisma.phone.findMany({
    skip,
    take,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const currentPage =
      typeof req.query.page === "string" ? parseInt(req.query.page, 10) : 0;
    const phonesPerPage = 10;

    const phones = await getPhones(currentPage * phonesPerPage, phonesPerPage);

    res.status(200).json({ phones });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

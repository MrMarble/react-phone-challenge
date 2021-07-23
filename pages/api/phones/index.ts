// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Phone } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

type Data = {
  error?: string;
  phones?: Array<Phone>;
  total?: number;
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

export async function getPhoneCount(): Promise<number> {
  return await prisma.phone.count();
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

    res.status(200).json({ phones, total: await getPhoneCount() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

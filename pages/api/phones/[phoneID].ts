// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Phone } from "@prisma/client";

type Request = NextApiRequest & {
  query: {
    phoneID: string;
  };
};

type Data = {
  error?: string;
};

const isPhone = (phone: Phone) => phone.name && phone.manufacturer && true;

export default async function handler(
  req: Request,
  res: NextApiResponse<Phone | Data>
) {
  try {
    const method = req.method;
    const phoneID = parseInt(req.query.phoneID, 10);
    const phone = await prisma.phone.findUnique({
      where: { id: phoneID },
    });

    switch (method) {
      case "POST":
        if (phone) {
          throw { code: 405, message: "Phone already exists" };
        }
        post(res, { ...req.body, id: phoneID });
        break;
      case "PUT":
        if (!isPhone(req.body)) {
          throw { code: 400, message: "Invalid phone" };
        }
        put(res, { ...req.body, id: phoneID });
        break;
      case "PATCH":
        if (!phone) {
          throw { code: 404, message: "Phone not found" };
        }
        patch(res, { ...req.body, id: phoneID });
        break;
      case "GET":
      default:
        if (!phone) {
          throw { code: 404, message: "Phone not found" };
        }
        res.status(200).json(phone);
        break;
    }
  } catch (error) {
    res.status(error.code || 500).json({ error: error.message });
  }
}

// Create a phone
async function post(res: NextApiResponse<Phone | Data>, phone: Phone) {
  res.status(201).json(await prisma.phone.create({ data: phone }));
}

// Update a phone or create iif doesn't exist
async function put(res: NextApiResponse<Phone | Data>, phone: Phone) {
  const newPhone = await prisma.phone.upsert({
    update: phone,
    create: phone,
    where: { id: phone.id },
  });
  res.status(201).json(newPhone);
}

// Update a phone
async function patch(res: NextApiResponse<Phone | Data>, phone: Phone) {
  const newPhone = await prisma.phone.update({
    data: phone,
    where: { id: phone.id },
  });
  res.status(200).json(newPhone);
}

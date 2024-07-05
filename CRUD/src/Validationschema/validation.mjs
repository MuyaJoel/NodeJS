//
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolveByIndex = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parseId = parseInt(id);

  if (isNaN(parseId)) return res.sendStatus(400);

  const findUser = await prisma.userData.findUnique({
    where: { id: parseId },
  });

  if (!findUser) return res.sendStatus(404);

  req.findUser = findUser;
  req.parseId = parseId;
  next();
};

export default resolveByIndex;

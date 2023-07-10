import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { inventoryValidationSchema } from 'validationSchema/inventories';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getInventories();
    case 'POST':
      return createInventory();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getInventories() {
    const data = await prisma.inventory
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'inventory'));
    return res.status(200).json(data);
  }

  async function createInventory() {
    await inventoryValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.finance?.length > 0) {
      const create_finance = body.finance;
      body.finance = {
        create: create_finance,
      };
    } else {
      delete body.finance;
    }
    if (body?.order?.length > 0) {
      const create_order = body.order;
      body.order = {
        create: create_order,
      };
    } else {
      delete body.order;
    }
    const data = await prisma.inventory.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}

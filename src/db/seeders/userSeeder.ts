import { QueryInterface, QueryTypes } from "sequelize";
import { faker } from "@faker-js/faker";

const users = Array(10)
  .fill(0)
  .map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

type Product = {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

const twoProducts: () => Product[] = () =>
  Array(2)
    .fill(0)
    .map(
      () =>
        ({
          id: faker.string.uuid(),
          name: faker.commerce.product(),
          price: parseInt(faker.commerce.price()),
          createdAt: new Date(),
          updatedAt: new Date(),
        }) as Product,
    );

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("users", users);

    const userIdObjects: { id: string }[] =
      await queryInterface.sequelize.query("SELECT id from users", {
        type: QueryTypes.SELECT,
      });

    const userIds = userIdObjects.map((obj: { id: string }) => obj.id);

    await Promise.all<void>(
      userIds.map(
        (userId: string) =>
          new Promise((res, rej) => {
            const twoOrders = Array(2)
              .fill(0)
              .map(() => ({
                id: faker.string.uuid(),
                userId,
                totalPrice: faker.commerce.price(),
                createdAt: new Date(),
                updatedAt: new Date(),
              }));
            queryInterface
              .bulkInsert("orders", twoOrders)
              .then(() => res())
              .catch((err) => rej(err));
          }),
      ),
    );
    const orderIdObjects: { id: string }[] =
      await queryInterface.sequelize.query("SELECT id from orders", {
        type: QueryTypes.SELECT,
      });
    const orderIds = orderIdObjects.map((obj: { id: string }) => obj.id);

    await Promise.all(
      orderIds.map(
        (orderId: string) =>
          new Promise<void>((res, rej) => {
            const inner2products: Product[] = twoProducts();
            const ids = inner2products.map<string>((prod) => prod.id);
            const totalPrice = inner2products.reduce(
              (acc: number, product: Product) => {
                return acc + product.price;
              },
              0,
            );
            queryInterface
              .bulkInsert("products", inner2products)
              .then(() => {
                const productOrders = [
                  { orderId, productId: ids[0] },
                  { orderId, productId: ids[1] },
                ];
                queryInterface.bulkInsert("orderProduct", productOrders);
                res();

                // let's fix the mocked order's totalPrice to match the sum of its product prices
                queryInterface.sequelize.query(
                  `UPDATE orders o SET totalPrice = ${String(totalPrice)} WHERE o.id = '${orderId}'`,
                  { type: QueryTypes.UPDATE },
                );
              })
              .catch((err) => rej(err));
          }),
      ),
    );
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("users", {}, {});
  },
};

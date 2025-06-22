import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductByID,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: the product id
 *          example: 1
 *        name:
 *          type: string
 *          description: the product name
 *          example: monitor curvo 49 pulgadas
 *        price:
 *          type: number
 *          description: the product price
 *          example: 300
 *        availability:
 *          type: boolean
 *          description: the product availability
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: return a list of products
 *    responses:
 *      200:
 *        description: Succesfull response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Product'
 *
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by id
 *    tags:
 *      - Products
 *    description: return a product based on its unique id
 *    parameters:
 *    - in: path
 *      name: id
 *      description: the id of the producte to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Succesfull response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Product'
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad request - Invalid ID
 *
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("id no valido"),
  handleInputErrors,
  getProductByID
);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: creates a new product
 *    tags:
 *      - Product
 *    description: return a list of products
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor"
 *              price:
 *                type: number
 *                example: 12.5
 *    responses:
 *      201:
 *        description: Succesfull response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Product'
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad request - Invalid ID
 *
 *
 * */
router.post(
  "/",
  body("name").notEmpty().withMessage("El nombre de producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio de producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: updates a  product
 *    tags:
 *      - Product
 *    description: updates a product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor"
 *              price:
 *                type: number
 *                example: 12.5
 *    responses:
 *      201:
 *        description: Succesfull response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Product'
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad request - Invalid ID
 *
 *
 * */
router.put(
  "/:id",
  body("name").notEmpty().withMessage("El nombre de producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio de producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  body("availability").isBoolean().withMessage("valor para disponibilidad no valido"),
  handleInputErrors,
  updateProduct
);
router.patch(
  "/:id",
  param("id").isInt().withMessage("id no valido"),
  handleInputErrors,
  updateAvailability
);
router.delete(
  "/:id",
  param("id").isInt().withMessage("id no valido"),
  handleInputErrors,
  deleteProduct
);

export default router;

import { Request, response, Response } from "express";
import Product from "../model/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    //   const product = new Product(req.body);
    const product = await Product.create(req.body);
    //   const savedProduct = await product.save();
    res.status(201).json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }
    const t = product.dataValues.availability;
    product.availability = !t;
    await product.save();
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({
      error: "Producto no encontrado",
    });
    return;
  }
  await product.destroy();
  res.json({ data: "Producto eliminado" });
};

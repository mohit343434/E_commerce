const express = require("express");
const Product = require("../moduls/Product");
const path = require("path");
require("dotenv").config();
const addProduct = async (req, res) => {
  // console.log(req.protocol + "://" +req.host+":" +process.env.PORT );
  const {
    productName,
    productDesc,
    productColor,
    productCategory,
    productSize,
    productPrice,
  } = req.body;
  const productIagePath = req.file ? req.file.path : "";
  const filename = productIagePath.substr(7);
  const fileUrl =
    req.protocol + "://" + req.host + ":" + process.env.PORT + filename;
  try {
    if (
      !productName ||
      !productDesc ||
      !productColor ||
      !productCategory ||
      !productSize ||
      !productPrice
    ) {
      return res.status(200).json({ message: "All fild is alllw" });
    }

    const newProduct = new Product({
      productName,
      productDesc,
      productColor,
      productCategory,
      productSize,
      productPrice,
      productIagePath: fileUrl,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product Add ", seccuss: true, newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error ", seccuss: false });
  }
};

/* Find the all product */
const getProduct = async (req, res) => {
  // console.log(req.params.key);
  try {
    const data = await Product.find();
    res.status(200).json({ message: "all data", data });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const getOneProduct = async (req, res) => {
  // console.log(req.params.key);
  try {
    const sarchData = await Product.find({
      $or: [
        { productName: { $regex: req.params.key } },
        { productDesc: { $regex: req.params.key } },
        { productColor: { $regex: req.params.key } },
        { productCategory: { $regex: req.params.key } },
        { productSize: { $regex: req.params.key } },
        { productPrice: { $regex: req.params.key } },
      ],
    });
    req.status(500).json({ sarchData });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const DeleteProduct = async (req, res) => {
  const userId = req.params.id;
  // console.log();
  try {
    const data = await Product.findByIdAndDelete(userId);
    res.status(200).json({ message: "Delete Prduct" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const UpdateProduct = async (req, res) => {
  const userId = req.params.id;
  const {
    productName,
    productDesc,
    productColor,
    productCategory,
    productSize,
    productPrice,
  } = req.body;
  const productIagePath = req.file ? req.file.path : "";
  const filename = productIagePath.substr(7);
  const fileUrl =
    req.protocol + "://" + req.host + ":" + process.env.PORT + filename;
  try {
    const update = await Product.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          productName,
          productDesc,
          productColor,
          productCategory,
          productSize,
          productPrice,
          productIagePath: fileUrl,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "update ", success: true, update });
  } catch (error) {
    res.status(500).json({ message: "server error", success: false });
  }
};

const getOneProductById = async (req, res) => {
  try {
    const uid = req.params.id;
    // console.log(uid);
    const oneData = await Product.findOne({ _id: uid });
    if (!oneData) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({ message: "Product data", oneData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};


module.exports = {
  addProduct,
  getProduct,
  getOneProduct,
  DeleteProduct,
  UpdateProduct,
  getOneProductById,
};

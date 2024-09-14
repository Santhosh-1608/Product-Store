import Product from "../models/product.model.js"
import mongoose from "mongoose";

export const getProducts = async (req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true,data:products})
    }
    catch(error){
        console.log(error)
        res.status(404).json({success:false, message:"error in fetching products"})
    }
}

export const createProduct =  async (req,res)=>{
    const products = req.body;
    if(!products.name || !products.price || !products.image){
        return res.status(400).send({ message: "Please Fill all the fields"})
    }
    const newProduct = new Product(products);
    try {
        await newProduct.save();
        res.status(201).json({sucess:true,data:newProduct})
    } catch (error) {
        res.status(500).json({ success: false, message: "Error Creating Product" });

    }
}

export const deleteProduct = async(req,res)=>{
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: "Invalid Product Id" });
    }
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product Deleted Successfully"})
    }
    catch(error){
        res.status(500).json({success:false,message:"Server Error"})
    }
}

export const updateProduct =  async (req, res) => {
    const id = req.params.id;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: "Invalid Product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).send({ message: "Product Not Found" });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error Updating Product", error: error.message });
    }
};

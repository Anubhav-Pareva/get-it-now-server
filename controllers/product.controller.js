import {  getCategoryProductModel, getProductModel, getProductsModel, getSearchProductModel } from "../models/product.model.js";

export const getProductsController = async (req, res) =>{
    const {category, limit, skip} = req.query;
    const result = await getProductsModel(category, limit, skip);
    res.status(200).json({success:true, result});
}
export const getProductController = async (req, res) => {
    const id = req.query.id;
    const result = await getProductModel(id);
    if(result){
        return res.status(200).json({success:true, result});
    }
    res.status(200).json({success:false, message:"product not exist"});
}
export const getCategoryProductController = async (req, res) => {
    const category = req.query.category;
    const result = await getCategoryProductModel(category);
    if(result){
        return res.status(200).json({success:true, result});
    }
    res.status(200).json({success:false, result:[]});
}
export const getSearchProductController = async (req, res) => {
    const searchQuery = req.query.searchQuery;
    const result = await getSearchProductModel(searchQuery);
    if(result){
        return res.status(200).json({success:true, result});
    }
    res.status(200).json({success:true, result});
}
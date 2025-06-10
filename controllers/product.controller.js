import { getProductModel, getProductsModel, getSearchProductModel } from "../models/product.model.js";

export const getProductsController = async (req, res) =>{
    const {category, limit, page} = req.query;
    const skip = (page - 1) * limit;
    const result = await getProductsModel(category, limit, skip);
    if(result.success === true){
        let remainingCount = result.totalDoc - (skip === 0 ? limit : (limit * page));
        if(remainingCount <= 0){
            remainingCount = 0
        }

        return res.status(200)
                  .json({
                        success:true, 
                        products:result?.products, 
                        totalCount:result?.totalDoc,
                        remainingCount:remainingCount ,
                    });
    }
    res.status(200).json({success:false, error:result.error});
}
export const getProductController = async (req, res) => {
    const id = req.query.id;
    const result = await getProductModel(id);
    if(result.success){
        return res.status(200).json({success:true, product:result.product});
    }
    res.status(200).json({success:false, error:result.error});
}

export const getSearchProductController = async (req, res) => {
    const searchQuery = req.query.searchQuery;
    const result = await getSearchProductModel(searchQuery);
    if(result){
        return res.status(200).json({success:true, result});
    }
    res.status(200).json({success:true, result});
}
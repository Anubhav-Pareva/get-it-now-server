import { addToCartModel, getCartModel } from "../models/cart.model.js";

export const getCartController = async (req, res) => {
    const usedId = req.query.userid;
    const result = await getCartModel(usedId);
    if(result.success){
        return res.status(200).json({success:true, cartProduct:result.cartProduct, totalPrice:result.totalPrice});
    }
    return res.status(502).json({success:false, error:result.error});
}
export const clearCartController = async (req, res) => {

}
export const addToCartController = async (req, res) => {
    const { userid, productid } = req.query;
    const result = await addToCartModel(userid, productid);
    console.log(result);
    res.status(200).json({result});
};
export const removeFromCartController = async (req, res) => {

};

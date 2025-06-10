import CartModel from "../mongoose-model/cartModel.js";
import ProductModel from "../mongoose-model/productModel.js";

export const getCartModel = async (userId) => {
    try{
  const result = await CartModel?.findOne({userId});
  if(result?.products?.length >= 1 ){
        const productData = result?.products?.map( async (product)=>{
            const pro = await ProductModel?.findById(product._id, {
              _id: 1,
              title: 1,
              price: 1,
              thumbnail: 1,
            }); 
            return pro;
        })
        return {success:true, cartProduct:productData, totalPrice:result.totalPrice};
  }
  return {success:true, cartProduct:[], totalPrice:0}
}catch(error){
    return {success:false, error:error.message}
}
};
export const clearCartModel = async () => {

};
export const addToCartModel = async (userid, productid) => {
    const cartDetail = await CartModel.findOne({userid});
    const proDetail = await ProductModel({productid},{_id, price});
};
export const removeFromCartModel = async () => {

};

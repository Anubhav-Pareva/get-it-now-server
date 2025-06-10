import ProductModel from "../mongoose-model/productModel.js";
export const getProductsModel = async (category="", limit=10, skip=0) =>{
  try{
  const isValidCategory = category.trim().replace(/^'+|'+$/g, "");
  const filter = isValidCategory
    ? { category: { $regex: `^${isValidCategory}$`, $options: "i" } }
    : {};
    const result = await ProductModel.find(filter,{
      _id:1,
      title: 1,
      price: 1,
      thumbnail: 1,
    }).limit(limit).skip(skip);
    const totalDoc = await ProductModel.countDocuments(filter);
    return { products:result, totalDoc, success:true, };
  }catch(error){
    return { success:false, error:error };
  }
}
export const getProductModel = async (id) =>{
    try{
    const result = await ProductModel.findById({_id:id});
    if(result){
        return { success:true, product:result }
    }
    return { success:true, product:null }
    }
    catch(error){ 
        return { success:false, error:error }
    }
}


export const getSearchProductModel = async (searchQuery) => {
    try {
        const result = await ProductModel.find(
          {
            title: { $regex: searchQuery, $options: "i" }, // case-insensitive partial match
          },
          {
            _id: 1,
            title: 1,
            price: 1,
            thumbnail: 1,
          }
        );
        return result
      } catch (error) {
        console.error("Search error:", error);
      }
}

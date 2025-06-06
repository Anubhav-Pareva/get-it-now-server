import ProductModel from "../mongoose-model/productModel.js";
export const getProductsModel = async (category="", limit=10, skip=0) =>{
    const filter = category ? { category } : {};
    const result = await ProductModel.find(filter,{
      _id:1,
      title: 1,
      price: 1,
      thumbnail: 1,
    }).limit(limit).skip(skip);
    return result;
}
export const getProductModel = async (id) =>{
    try{
    const result = await ProductModel.findById({_id:id});
    if(result){
        return result
    }
    return null
    }
    catch(error){
        console.log(error);
    }
}


export const getCategoryProductModel = async (category) => {
  try {
    const result = await ProductModel.find({ category },{
        _id:1,
        title: 1,
        price: 1,
        thumbnail: 1,
      }).limit(10); 
    return result; 
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error; 
  }
};
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

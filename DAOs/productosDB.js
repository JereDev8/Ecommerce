import productModel from "../models/Productos.js";


class ProductosDB {
    constructor() {

    }

    async eightProdsDTO(categoria){
        const productos= await productModel.find({category: categoria}).lean();
        let eightProds= [];
        for(let i=0; i<8; i++){
            eightProds.push(productos[i])
        }
        return eightProds
    }
    
    async eightCategories(){
        console.log(productModel.schema.path('category').enumValues)
        
    }

    async createProduct(newProduct) {
        try {
            await productModel.create(newProduct);
            return 'Producto creado correctamente'
        } catch (err) {
            return err
        }
    }

    async deleteProduct(idProduct) {
        try {
            await productModel.deleteOne({ _id: idProduct }, {}, (err) => {
                if (!err) return 'Producto eliminado correctamente'
            })
        } catch (err) {
            return 'Producto no encontrado'
        }
    }

    async updateProduct(idProduct, updateProd){
        try {
            // const product= await productModel.findOne({_id: idProduct})
            await productModel.updateOne({_id: idProduct}, {name: updateProd.name, price: updateProd.price, thumbnail: updateProd.thumbnail})

        } catch (error) {
            return error
        }
    }
}


export default ProductosDB
import productModel from "../models/Productos.js";


class ProductosDB {
    constructor() {

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
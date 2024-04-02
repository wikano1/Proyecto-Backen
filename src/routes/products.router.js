import { Router, response } from "express";
import { ProductManager, productManager } from "../index.js";

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, Number(limit));
            return res.json(limitedProducts);
        }

        return res.json(products);
    } catch (error) {
        console.log(error);
        res.send("Error al recibir los Productos")
    }
});

productsRouter('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductByID(pid);
        res.json(product);
    } catch (error) {
        console.log(error);
        res.send("Error al recibir el Producto ${pid}");
    }
})

productsRouter.post("/", async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;

        const response = await productManager.addProduct(title, description, price, thumbnail, code, stock, status, category)
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send("Error en el envio del Producto")
    }
})

// PUT actualizar un producto por su ID
productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;
        const response = await productManager.updateProduct(id, title, description, price, thumbnail, code, stock, status, category);
        res.json(response)

    }catch (error){
        console.log(error);
        res.send("Error en la modificacion del Producto")
    }
});

productsRouter.delete('/:pid', async (req,res)=>{
    const { iid }=req.params;
    try{
        await productManager.deleteProduct(id)
        res.send('Se elimino correctamente')
    }catch(error){
        console.log(error);
        res.send(`No se pudo eliminar el producto con id=${pid}`);
        }
})

export { productsRouter };


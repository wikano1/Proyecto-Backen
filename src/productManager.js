import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {

    constructor() {
        this.path = 'products.json';
        this.products = []
    }

    addPrroduct = async ({ title, description, price, thumbnail, code, stock, status, category }) => {
        const id = uuidv4()

        let newProduct = { title, description, price, thumbnail, code, stock, status, category }

        this.products = await this.getProducts()
        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct;
    }

    getProducts = async () => {
        const response = await fs.readFile(this.path, 'utf-8')
        const responseJSON = JSON.parse(response);

        return responseJSON;
    }

    getProductById = async (id) => {
        const response = this.getProducts()

        const product = response.find(product => product.id === id)

        if (product) {
            return product
        } else {
            throw new Error(`Producto  con el id "${id}" no encontrado`)
        }
    }

    updateProduct = async (id, { ...data }) => {
        const products = this.getProducts()
        const index = response.findIndex(product => product.id === id)

        if (index !== -1) {
            response[index] = { id, ...data }
            await fs.writeFile(this.path, JSON.stringify(products));
            return products[index];
        } else {
            throw new Error('El Producto que desea actualizar no existe');
        }
    }

    deleteProduct = async (id) => {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id)
        if (index !== -1) {
            products.splice(index, 1);
            await fs.writeFileSync(this.path, JSON.stringify(products))
        } else {
            console.log('Producto no encontrado')
        }
        return { deleted: true };
    }




}

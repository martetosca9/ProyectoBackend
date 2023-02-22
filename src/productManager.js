import fs from "fs";
// const ruta = "./data.json";

const crearArchivo = async (ruta) => {
    if (!fs.existsSync(ruta)){
        await fs.promises.writeFile(ruta, "[]")
    }else if ((await fs.promises.readFile(ruta,"utf-8")).length==0){
        await fs.promises.writeFile(ruta, "[]")
    }
}



class product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
//productos
// title, description, price, thumbnail, code, stock
const product1 = new product("Grafica Nvidia GTX 1650", "4GB de vram", 68000, "https://m.media-amazon.com/images/I/61rzWyQBAoL._AC_SL1024_.jpg", "aaaa", 14);
const product2 = new product("Grafica Nvidia GTX 1660 SUPER", "6gb de vram", 87000, "https://arrichetta.com.ar/wp-content/uploads/2020/10/c5e5f2cf-b57c-4a5e-b9d3-d0bb76bc768d.c1cacebe43e9f18d92ce81be46266920.jpeg", "aaab", 18);
const product3 = new product("Grafica Nvidia RTX 2060", "12gb de vram", 94000, "https://fullh4rd.com.ar/img/productos/Pics_Prod/video-geforce-rtx-2060-6gb-msi-ventus-gp-oc-0.jpg", "aaac", 17);
const product4 = new product("Grafica Nvidia RTX 3050", "8gb de vram", 94000, "https://fullh4rd.com.ar/img/productos/Pics_Prod/video-geforce-rtx-3050-8gb-evga-xc-gaming-dual-fan-0.jpg", "aaad", 32);
const product5 = new product("Grafica Amd Rx 6500 XT", "4gb de vram", 52000, "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/video-radeon-rx-6500-xt-4gb-gigabyte-gaming-oc-0.jpg", "aaae", 16);
const productVacio = new product("", "", "", "", "", "");
const productPrueba = new product("Producto Prueba", "esto es un producto prueba", 200, "Sin imagen", "abc123", 25);



class ProductManager {
    constructor(path) {
        this.path = ruta;
    }

    checkArchivo = async() => {
        return fs.existsSync(this.path);
    }

    createProduct = async () => {
        await fs.promises.writeFile(this.path, "[]")
    }

    addProduct = async (newProduct) => {
        if (toString(newProduct.id).length > 0 && newProduct.title.length > 0 && newProduct.description.length > 0 && toString(newProduct.price).length > 0 && newProduct.thumbnail.length > 0 && newProduct.code.length > 0 && toString(newProduct.stock).length > 0) {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let arrayproducts = JSON.parse(contenido);
            if (arrayproducts.filter(product => product.code == newProduct.code).length > 0) {
                console.error("Ya existe el producto");
            }
            else 
            {
                let contenido = await fs.promises.readFile(this.path, "utf-8");
                let aux = JSON.parse(contenido);
                console.log()
                if (aux.length>0){
                    const idAutoincremental = aux[aux.length-1].id+1; //Esto para que sea incremental dependiendo del ultimo elemento
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }
                else{
                    const idAutoincremental = 1;
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }

            }
        } else {
            console.error("Complete todos los campos para agregar el producto")
        }
    }

    getAllProducts = async () => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        return aux;   
    }
    updateProduct = async ({id, title, description, price, thumbnail, code, stock})  => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) {
            let pos = aux.findIndex(product => product.id === id)
            if (title!=undefined){
                if (title.length>0)
                {
                    aux[pos].title = title;
                }
            }
            if (description!=undefined){
                if (description.length>0)
                {
                    aux[pos].description = description;
                }
            }
            if (price!=undefined){
                if (price.length>0)
                {
                    aux[pos].price = parseFloat(price);
                }
            }
            if (thumbnail!=undefined){
                if (thumbnail.length>0)
                {
                    aux[pos].thumbnail = thumbnail;
                }
            }
            if (code!=undefined){
                if (code.length>0)
                {
                    aux[pos].code = code;
                }
            }
            if (stock!=undefined){
                if (stock.length>0)
                {
                    aux[pos].stock = parseInt(stock);
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(aux))
            console.log("Producto actualizado exitosamente");
        } else {
            console.log( "Producto no encontrado para actualizar")
        }
    
    }
    getProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            let pos = aux.findIndex(product => product.id === id)
            return aux[pos];
        }else{
            return "No se encontró ela producto que desea ver"
        }        
    }

    deleteProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            const arraySinElIdSeleccionado = aux.filter(product => product.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(arraySinElIdSeleccionado))
            console.log("Producto eliminado exitosamente");           
        }else{
            console.error("No se encontró el producto que desea eliminar")
        }        
    }

    cargarArchivo = async () => {
        await this.crearArchivo();
        await this.addProduct(product1);
        await this.addProduct(product2);
        await this.addProduct(product3);
        await this.addProduct(product4);
        await this.addProduct(product5);
    }
}






//Creo un product manager
// productManager = new ProductManager()




// const tests = async () => {
    
//     await crearArchivo(ruta); 
//     console.log(await productManager.getAllProducts()); 

//     await productManager.addProduct(productPrueba);
//     console.log(await productManager.getAllProducts()); 

//     console.log(await productManager.getProductById(1)); 
//     await productManager.updateProduct({id: 1, title:"Prueba cambiando titulo y descripcion del elemento 1", description:"Exito"}) 

//     console.log(await productManager.getProductById(1));
//     await productManager.deleteProductById(1); 
    
// }

// tests();


export default ProductManager;
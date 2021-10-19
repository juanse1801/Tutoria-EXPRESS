const fs = require('fs')

let i = 0;
class Contenedor {
    constructor (nombre) {
        this.nombre = nombre
    }
    getAll = async () => {
        try {
            const contenido = await fs.promises.readFile(this.nombre, 'utf-8')
            return JSON.parse(contenido)
        } catch (error) {
            await fs.promises.writeFile(this.nombre, JSON.stringify([]))
            const contenido = await fs.promises.readFile(this.nombre, 'utf-8')
            return JSON.parse(contenido)
        }
    }

    getById = async (id) => {
        const contenido = await this.getAll()
        const contBuscado = contenido.find(p => p.id == id)
        console.log("producto por ID")
        return contBuscado
    }

    deleteById = async (id) => {
        const contenido = await this.getAll()
        const contDeleted = contenido.filter(p => p.id != id)
        await fs.promises.writeFile(this.nombre, JSON.stringify(contDeleted))
        const arrDel = await fs.promises.readFile(this.nombre, 'utf-8')
        console.log("archivo eliminado con exito")
        return JSON.parse(arrDel)
    }

    deleteAll = async () => {
        await fs.promises.writeFile(this.nombre, JSON.stringify([]))
        console.log("Archivos eliminados con éxito")
    }

    save = async (obj) => {
        obj.id = i;
        i ++
        const contenido = await this.getAll()
        contenido.push(obj)
        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify(contenido))
            console.log("archivo guardado con exito")
            console.log(`id del archivo: ${obj.id}`)
            return obj.id
        } catch(error){
            throw new Error('No se pudo guardar')
        }
    }  
}

const productos = new Contenedor ("productos")


const test = async () => {
    await productos.save({nombre:"oreos",precio:"2500"})
    console.log(await productos.getAll())
    await productos.save({nombre:"pepitos",precio:"2000"})
    await productos.save({nombre:"talitas",precio:"5"})
    console.log(await productos.getAll())
    console.log(await productos.getById(2))
    console.log(await productos.deleteById(1))
    await productos.deleteAll()
}

test()
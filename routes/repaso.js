const { Router } = require("express");
const router = Router();
const Libro = require("../clases/libros");

const libros = [];
const libro = new Libro("name");

router.get("/", (req, res) => {
  const nombre = libro.getName();
  console.log(nombre);
  res.send(nombre);
});

router.post("/", (req, res) => {
  const { name } = req.body;

  try {
    let nuevoLibro = new Libro(name);
    libros.push(nuevoLibro);
    res.send(nuevoLibro);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

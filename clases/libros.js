const fs = require("fs");
const miSuma = require("../routes/helpers");

class Contenedor {
  constructor(name) {
    this.name = name;
    this.id = [];
  }

  getName() {
    return this.name;
  }
  addId(id) {
    this.id.push(id);
  }
  getIds() {
    return this.id;
  }

  sumId() {
    const resultado = miSuma(this.id[0], this.id[1]);
    return resultado;
  }
}

module.exports = Contenedor;

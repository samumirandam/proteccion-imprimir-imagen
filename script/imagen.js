/* CLASE IMAGEN */
class Imagen {
  constructor(ancho, alto, relacionDeAspecto) {
    this.ancho = ancho;
    this.alto = alto;
    this.relacionDeAspecto = relacionDeAspecto;
  }

  calcularRelacionDeAspecto() {
    /* FUNCION PARA CALCULAR LA RELACIÓN DE ASPECTO */
    this.relacionDeAspecto = this.ancho / this.alto;
  }
}

export default Imagen;

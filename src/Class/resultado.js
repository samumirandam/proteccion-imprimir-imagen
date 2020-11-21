/*  CONSTANSTES */
import { HORIZONTAL, VERTICAL } from "../Utils/constantes";

/* CLASE RESULTADO */
class Resultado {
  constructor(ancho, alto, orientacion) {
    this.ancho = ancho;
    this.alto = alto;
    this.orientacion = orientacion;
  }

  /* FUNCION PARA CALCULAR LA ORIENTACIÓN DE LA IMAGEN (HORIZONTAL O VERTICAL) */
  calcularOrientacion(aspectRatio) {
    //si son iguales se deja en vertical la orientación
    if (aspectRatio > 1) {
      this.orientacion = HORIZONTAL;
    } else {
      this.orientacion = VERTICAL;
    }
  }

  /* FUNCION PARA IDENTIFICAR SI SE DEBE DE AJUSTAR LA IMAGEN */
  seNecesitaAjustar(anchoImagen, altoImagen, anchoHoja, altoHoja) {
    if (anchoImagen > anchoHoja || altoImagen > altoHoja) {
      return true;
    } else {
      return false;
    }
  }

  /* FUNCION PARA AJUSTAR LA IMAGEN */
  ajustarImagen(
    relacionDeAspectoImagen,
    anchoImagen,
    altoImagen,
    relacionDeAspectoHoja,
    anchoHoja,
    altoHoja
  ) {
    if (relacionDeAspectoHoja > relacionDeAspectoImagen) {
      this.ancho = Math.round((anchoImagen * altoHoja) / altoImagen);
      this.alto = altoHoja;
    } else {
      this.ancho = anchoHoja;
      this.alto = Math.round((altoImagen * anchoHoja) / anchoImagen);
    }
  }

  /* FUNCION PARA CALCULAR EL RESULTADO */
  calcularResultado(
    relacionDeAspectoImagen,
    anchoImagen,
    altoImagen,
    relacionDeAspectoHoja,
    anchoHoja,
    altoHoja
  ) {
    this.calcularOrientacion(relacionDeAspectoImagen);
    if (this.seNecesitaAjustar(anchoImagen, altoImagen, anchoHoja, altoHoja)) {
      this.ajustarImagen(
        relacionDeAspectoImagen,
        anchoImagen,
        altoImagen,
        relacionDeAspectoHoja,
        anchoHoja,
        altoHoja
      );
    } else {
      //No necesita ajustar la imagen
      this.ancho = anchoImagen;
      this.alto = altoImagen;
    }
  }
}

export default Resultado;

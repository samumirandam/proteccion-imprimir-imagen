const HORIZONTAL = "Horizontal";
const VERTICAL = "Vertical";
const ALTO_HOJA_VERTICAL = 1123;
const ANCHO_HOJA_VERTICAL = 796;

import Imagen from "./imagen.js";

/* CAPTURA QUE SE SUBA UNA IMAGEN */
document.addEventListener(
  "DOMContentLoaded",
  document
    .getElementById("input-imagen")
    .addEventListener("change", calcularMedidas, false),
  false
);

/*FUNCION PARA CALCULAR LOS DATOS DE LA IMPRESIÓN EN A4*/
async function calcularMedidas() {
  mostrarBarraDeCarga();

  //Se obtiene el archivo
  let archivo = this.files[0];

  //Se definen variables
  const objHoja = new Imagen(ANCHO_HOJA_VERTICAL, ALTO_HOJA_VERTICAL, 1);
  const objImagen = new Imagen(0, 0, 1);
  const objResultado = new Resultado(0, 0, "");

  //Se convierte el archivo en una imagen
  let imagen = await convertirArchivoEnImagen(archivo);
  console.log(
    `La imagen tiene las siguientes medidas (ancho x alto): ${imagen.width}px x ${imagen.height}px`
  );

  //Se obtiene la realción de aspecto de la imagen
  objImagen.ancho = imagen.width;
  objImagen.alto = imagen.height;
  objImagen.calcularRelacionDeAspecto();
  console.log(
    `Relación de aspecto de la imagen ${objImagen.relacionDeAspecto}`
  );

  //Con la relación de aspecto se organiza la orientación de la hoja (aspectRatio > 1) = Horizontal
  if (objImagen.relacionDeAspecto > 1) {
    let ancho = objHoja.ancho;
    objHoja.ancho = objHoja.alto;
    objHoja.alto = ancho;
  }
  objHoja.calcularRelacionDeAspecto();
  console.log(
    `Las medidas de la hoja son (ancho x alto) : ${objHoja.ancho}px x ${objHoja.alto}px`
  );
  console.log(`Relación de aspecto de la hoja ${objHoja.relacionDeAspecto}`);

  //Se ajusta la imagen si no alcanza a ingresar en la hoja
  objResultado.calcularResultado(
    objImagen.relacionDeAspecto,
    objImagen.ancho,
    objImagen.alto,
    objHoja.relacionDeAspecto,
    objHoja.ancho,
    objHoja.alto
  );

  mostrarResultados(
    objResultado.orientacion,
    objResultado.ancho,
    objResultado.alto
  );

  ocultarBarraDeCarga();
}

/*FUNCIÓN PARA TRANFORMAR EL ARCHIVO SUBIDO EN IMAGEN*/
async function convertirArchivoEnImagen(archivo) {
  try {
    return (imagen = await Promise.resolve(self.createImageBitmap(archivo)));
  } catch (err) {
    console.log(err);
  }
}
/*FUNCIONES VISUALES*/
function mostrarBarraDeCarga() {
  document.getElementById("barra-de-carga").classList.remove("invisible");
}

function ocultarBarraDeCarga() {
  document.getElementById("barra-de-carga").classList.add("invisible");
}

function mostrarResultados(orientacion, anchoImagen, altoImagen) {
  console.log(
    `El resultado es: Orientación: ${orientacion} y Ancho x Alto: ${anchoImagen}px x ${altoImagen}px`
  );
  document.getElementById("orientacion-text").textContent = orientacion;
  document.getElementById("ancho-text").textContent = anchoImagen + " px";
  document.getElementById("alto-text").textContent = altoImagen + " px";
}

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

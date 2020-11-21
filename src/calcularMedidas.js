import 'regenerator-runtime/runtime'

/*  CONSTANSTES */
import { ALTO_HOJA_VERTICAL, ANCHO_HOJA_VERTICAL } from "./Utils/constantes.js";

/* CALSES */
import Imagen from "./Class/imagen.js";
import Resultado from "./Class/resultado.js";

/* UTILIDADES */
import {
  mostrarBarraDeCarga,
  ocultarBarraDeCarga,
  mostrarResultados,
} from "./Utils/utilidadesHtml.js";
import { convertirArchivoEnImagen } from "./Utils/utilidadesJS.js";

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

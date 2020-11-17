const HORIZONTAL = "Horizontal";
const VERTICAL = "Vertical";
const ALTO_HOJA_VERTICAL = 1123;
const ANCHO_HOJA_VERTICAL = 796;

document
  .getElementById("input-imagen")
  .addEventListener("change", calcularMedidas, false);

/*FUNCION PARA CALCULAR LOS DATOS DE LA IMPRESIÓN EN A4*/
async function calcularMedidas() {
  mostrarBarraDeCarga();

  let archivo = this.files[0];
  let aspectRatioHoja = 1;
  let anchoHoja = ANCHO_HOJA_VERTICAL;
  let altoHoja = ALTO_HOJA_VERTICAL;
  let anchoImagen = 0;
  let altoImagen = 0;

  //Se convierte el archivo en una imagen
  let imagen = await convertirArchivoEnImagen(archivo);
  console.log(
    `La imagen tiene las siguientes medidas (ancho x alto): ${imagen.width}px x ${imagen.height}px`
  );

  //Se obtiene la realción de aspecto de la imagen
  let aspectRatioImagen = calcularRelacionDeAspecto(
    imagen.width,
    imagen.height
  );
  console.log(`Relación de aspecto de la imagen ${aspectRatioImagen}`);

  //Se clacula la realción de aspecto de la hoja segun la orientación
  //En una imagen horizontal (aspectRatio > 1) la hoja es horizontal ALTO_HOJA_VERTICAL/ANCHO_HOJA_VERTICAL
  if (aspectRatioImagen > 1) {
    //si es horizontal
    aspectRatioHoja = calcularRelacionDeAspecto(
      ALTO_HOJA_VERTICAL,
      ANCHO_HOJA_VERTICAL
    );
    console.log(`Relación de aspecto de la hoja ${aspectRatioHoja}`);
    altoHoja = ANCHO_HOJA_VERTICAL;
    anchoHoja = ALTO_HOJA_VERTICAL;
  } else {
    //si es vertical
    aspectRatioHoja = calcularRelacionDeAspecto(
      ANCHO_HOJA_VERTICAL,
      ALTO_HOJA_VERTICAL
    );
    console.log(`Relación de aspecto de la hoja ${aspectRatioHoja}`);
  }
  console.log(
    `Las medidas de la hoja son (ancho x alto) : ${anchoHoja}px x ${altoHoja}px`
  );

  //Se calcula la orientación de la hoja e imagen
  let orientacion = calcularOrientacion(aspectRatioImagen);
  console.log(orientacion);

  //Se ajusta la imagen si no alcanza a ingresar en la hoja
  if (seNecesitaAjustar(imagen.width, imagen.height, anchoHoja, altoHoja)) {
    console.log(`Se necesita ajustar la imagen`);
    let medidas = AjustarImagen(
      aspectRatioImagen,
      imagen.width,
      imagen.height,
      aspectRatioHoja,
      anchoHoja,
      altoHoja
    );
    anchoImagen = medidas[0];
    altoImagen = medidas[1];
  } else {
    console.log(`No necesita ajustar la imagen`);
    anchoImagen = imagen.width;
    altoImagen = imagen.height;
  }

  mostrarResultados(orientacion, anchoImagen, altoImagen);

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

/* FUNCION PARA CALCULAR LA RELACIÓN DE ASPECTO */
function calcularRelacionDeAspecto(ancho, alto) {
  return ancho / alto;
}

/* FUNCION PARA CALCULAR LA ORIENTACIÓN DE LA IMAGEN (HORIZONTAL O VERTICAL) */
function calcularOrientacion(alto, ancho) {
  //si son iguales se deja en vertical la orientación
  if (alto >= ancho) {
    return VERTICAL;
  } else {
    return HORIZONTAL;
  }
}

/* FUNCION PARA CALCULAR LA ORIENTACIÓN DE LA IMAGEN (HORIZONTAL O VERTICAL) */
function calcularOrientacion(aspectRatio) {
  //si son iguales se deja en vertical la orientación
  if (aspectRatio > 1) {
    return HORIZONTAL;
  } else {
    return VERTICAL;
  }
}

/* FUNCION PARA IDENTIFICAR SI SE DEBE DE AJUSTAR LA IMAGEN */
function seNecesitaAjustar(anchoImagen, altoImagen, anchoHoja, altoHoja) {
  if (anchoImagen > anchoHoja || altoImagen > altoHoja) {
    return true;
  } else {
    return false;
  }
}

function AjustarImagen(
  aspectRatioImagen,
  anchoImagen,
  altoImagen,
  aspectRatioHoja,
  anchoHoja,
  altoHoja
) {
  let medidas = [anchoImagen, altoImagen];
  if (aspectRatioHoja > aspectRatioImagen) {
    medidas[0] = Math.round((anchoImagen * altoHoja) / altoImagen);
    medidas[1] = altoHoja;
  } else {
    medidas[0] = anchoHoja;
    medidas[1] = Math.round((altoImagen * anchoHoja) / anchoImagen);
  }

  console.log(`****************${medidas[0]} **************** ${medidas[1]}`);

  return medidas;
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

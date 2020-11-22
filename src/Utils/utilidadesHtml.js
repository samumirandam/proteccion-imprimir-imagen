/*FUNCIONES VISUALES*/
const mostrarBarraDeCarga = () => {
  document.getElementById("barra-de-carga").classList.remove("invisible");
}

const ocultarBarraDeCarga = () => {
  document.getElementById("barra-de-carga").classList.add("invisible");
}

const mostrarResultados = (orientacion, anchoImagen, altoImagen) => {
  console.log(
    `El resultado es: Orientación: ${orientacion} y Ancho x Alto: ${anchoImagen}px x ${altoImagen}px`
  );
  document.getElementById("orientacion-text").textContent = orientacion;
  document.getElementById("ancho-text").textContent = anchoImagen + " px";
  document.getElementById("alto-text").textContent = altoImagen + " px";
}

const mostrarImagenSubida = (archivo) => {
  var reader = new FileReader();
  reader.onload = function () {
    var dataURL = reader.result;
    var output = document.getElementById("img-subida");
    output.src = dataURL;
  };
  reader.readAsDataURL(archivo);
}

export { mostrarBarraDeCarga, ocultarBarraDeCarga, mostrarResultados, mostrarImagenSubida};

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

export { mostrarBarraDeCarga, ocultarBarraDeCarga, mostrarResultados };

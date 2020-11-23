import {
  mostrarBarraDeCarga,
  ocultarBarraDeCarga,
  mostrarResultados,
  mostrarImagenSubida,
} from "../src/Utils/utilidadesHtml.js";
import { HORIZONTAL, VERTICAL } from "../src/Utils/constantes";


describe("Pruebas a las Utilidades de HTML - Método mostrarBarraDeCarga", () => {
  test("Se prueba que un elemento html no tenga la clase invisible", () => {
    document.body.innerHTML =
      '<div id="barra-de-carga" class="invisible"></div>';
    mostrarBarraDeCarga();
    expect(document.body.innerHTML).not.toContain("invisible");
  });
});

describe("Pruebas a las Utilidades de HTML - Método ocultarBarraDeCarga", () => {
  test("Se prueba que un elemento html tenga la clase invisible", () => {
    document.body.innerHTML = '<div id="barra-de-carga" class=""></div>';
    ocultarBarraDeCarga();
    expect(document.body.innerHTML).toContain("invisible");
  });
});

describe("Pruebas a las Utilidades de HTML - Método mostrarResultados", () => {
  test("Se prueba que un elemento html tenga los resultados (orientación)", () => {
    document.body.innerHTML =
      "<div>" +
      '<p id="orientacion-text">&nbsp</p>' +
      '<p id="ancho-text">&nbsp</p>' +
      '<p id="alto-text">&nbsp</p>' +
      "</div>";
      mostrarResultados(HORIZONTAL, 200, 100);

    expect(document.getElementById("orientacion-text").textContent).toContain(HORIZONTAL);
  });

  test("Se prueba que un elemento html tenga los resultados (ancho)", () => {
    document.body.innerHTML =
      "<div>" +
      '<p id="orientacion-text">&nbsp</p>' +
      '<p id="ancho-text">&nbsp</p>' +
      '<p id="alto-text">&nbsp</p>' +
      "</div>";
      mostrarResultados(HORIZONTAL, 200, 100);

    expect(document.getElementById("ancho-text").textContent).toContain(200);
  });
  
  test("Se prueba que un elemento html tenga los resultados (ancho)", () => {
    document.body.innerHTML =
      "<div>" +
      '<p id="orientacion-text">&nbsp</p>' +
      '<p id="ancho-text">&nbsp</p>' +
      '<p id="alto-text">&nbsp</p>' +
      "</div>";
      mostrarResultados(HORIZONTAL, 200, 100);

    expect(document.getElementById("alto-text").textContent).toContain(100);
  });
});

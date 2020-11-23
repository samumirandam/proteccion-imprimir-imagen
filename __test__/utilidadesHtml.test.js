import "regenerator-runtime/runtime";
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

    expect(document.getElementById("orientacion-text").textContent).toContain(
      HORIZONTAL
    );
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

describe("Pruebas a las Utilidades de HTML - Método mostrarImagenSubida", () => {
  test("Se prueba que un elemento html tenga la imagen y la muestre", async () => {
    document.body.innerHTML =
      "<div>" + '<img class="invisible" id="img-subida">' + "</div>";

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    await Promise.resolve(() => {
      let oReq = new XMLHttpRequest();
      oReq.open("GET", "https://picsum.photos/200/300", true);
      oReq.responseType = "blob";
      oReq.onload = async function (oEvent) {
        let blob = await Promise.resolve(oReq.response);
        let imagen = mostrarImagenSubida(blob);
        await delay(3000);
        expect(document.getElementById("img-subida").classList).not.toContain(
          "invisible"
        );
      };
      oReq.send();
    });
  });
});

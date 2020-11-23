import "regenerator-runtime/runtime";
import { convertirArchivoEnImagen } from "../src/Utils/utilidadesJS.js";

describe("Pruebas aa las Utilidades de JavaScript - Método convertirArchivoEnImagen", () => {
  test("Se prueba que un arhivo se convierta en imagen con el metodo createImageBitmap", async () => {
    let oReq = new XMLHttpRequest();
    oReq.open("GET", "https://picsum.photos/200/300", true);
    oReq.responseType = "blob";
    oReq.onload = async function (oEvent) {
      let blob = await oReq.response;
      let imagen = await convertirArchivoEnImagen(blob);
      expect(imagen.height).toBe(300);
    };
    oReq.send();
  });
});

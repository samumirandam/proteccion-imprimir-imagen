import "regenerator-runtime/runtime";
import { convertirArchivoEnImagen } from "../src/Utils/utilidadesJS.js";

describe("Pruebas aa las Utilidades de JavaScript - Método convertirArchivoEnImagen", () => {
  test("Se prueba que un arhivo se convierta en imagen con el metodo createImageBitmap (alto)", async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await Promise.resolve(() => {
      let oReq = new XMLHttpRequest();
      oReq.open("GET", "https://picsum.photos/200/300", true);
      oReq.responseType = "blob";
      oReq.onload = async function (oEvent) {
        let blob = await oReq.response;
        let imagen = await convertirArchivoEnImagen(blob);
        await delay(3000);

        expect(imagen.height).toBe(300);
      };
      oReq.send();
    });
  });
  test("Se prueba que un arhivo se convierta en imagen con el metodo createImageBitmap (ancho)", async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    await Promise.resolve(() => {
      let oReq = new XMLHttpRequest();
      oReq.open("GET", "https://picsum.photos/200/300", true);
      oReq.responseType = "blob";
      oReq.onload = async function (oEvent) {
        let blob = await oReq.response;
        let imagen = await convertirArchivoEnImagen(blob);
        await delay(3000);

        expect(imagen.width).toBe(200);
      };
      oReq.send();
    });
  });
});

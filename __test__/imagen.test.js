import { objImagen } from "../__mocks__/ImagenMock.js";

describe("Pruebas a la clase Imagen - Método calcularRelacionDeAspecto", () => {
  test("Calculo de la relación de aspecto ancho > alto", () => {
    objImagen.ancho = 10;
    objImagen.alto = 5;
    objImagen.calcularRelacionDeAspecto();
    expect(objImagen.relacionDeAspecto).toBeGreaterThan(1);
  });

  test("Calculo de la relación de aspecto ancho < alto", () => {
    objImagen.ancho = 5;
    objImagen.alto = 10;
    objImagen.calcularRelacionDeAspecto();
    expect(objImagen.relacionDeAspecto).toBeLessThan(1);
  });

  test("Calculo de la relación de aspecto ancho = alto", () => {
    objImagen.ancho = 10;
    objImagen.alto = 10;
    objImagen.calcularRelacionDeAspecto();
    expect(objImagen.relacionDeAspecto).toBe(1);
  });
});

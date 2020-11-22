import { HORIZONTAL, VERTICAL } from "../src/Utils/constantes";
import { objResultado } from "../__mocks__/ResultadoMock.js";

describe("Pruebas a la clase Resultado - Método calcularOrientacion", () => {
  test("Calculo de orientación con relación de aspecto > 1", () => {
    objResultado.calcularOrientacion(2);
    expect(objResultado.orientacion).toMatch(HORIZONTAL);
  });
  test("Calculo de orientación con relación de aspecto < 1", () => {
    objResultado.calcularOrientacion(0.5);
    expect(objResultado.orientacion).toMatch(VERTICAL);
  });
});

describe("Pruebas a la clase Resultado - Método seNecesitaAjustar", () => {
  test("Cuando el AnchoImagen es mayor que AnchoHoja", () => {
    let anchoImagen = 20;
    let altoImagen = 10;
    let anchoHoja = 10;
    let altoHoja = 10;
    expect(
      objResultado.seNecesitaAjustar(
        anchoImagen,
        altoImagen,
        anchoHoja,
        altoHoja
      )
    ).toBeTruthy();
  });
  test("Cuando el AltoImagen es mayor que AltoHoja", () => {
    let anchoImagen = 10;
    let altoImagen = 20;
    let anchoHoja = 10;
    let altoHoja = 10;
    expect(
      objResultado.seNecesitaAjustar(
        anchoImagen,
        altoImagen,
        anchoHoja,
        altoHoja
      )
    ).toBeTruthy();
  });
  test("Cuando el AnchoImagen es menor que AnchoHoja", () => {
    let anchoImagen = 5;
    let altoImagen = 10;
    let anchoHoja = 10;
    let altoHoja = 10;
    expect(
      objResultado.seNecesitaAjustar(
        anchoImagen,
        altoImagen,
        anchoHoja,
        altoHoja
      )
    ).toBeFalsy();
  });
  test("Cuando el AltoImagen es menor que AltoHoja", () => {
    let anchoImagen = 10;
    let altoImagen = 5;
    let anchoHoja = 10;
    let altoHoja = 10;
    expect(
      objResultado.seNecesitaAjustar(
        anchoImagen,
        altoImagen,
        anchoHoja,
        altoHoja
      )
    ).toBeFalsy();
  });
  test("Cuando el AnchoImagen es igual que AnchoHoja y AltoImagen es igual que AltoHoja", () => {
    let anchoImagen = 10;
    let altoImagen = 10;
    let anchoHoja = 10;
    let altoHoja = 10;
    expect(
      objResultado.seNecesitaAjustar(
        anchoImagen,
        altoImagen,
        anchoHoja,
        altoHoja
      )
    ).toBeFalsy();
  });
});

describe("Pruebas a la clase Resultado - Método ajustarImagen", () => {
  test("Ajuste de la imagen cuando relación de aspecto de la imagen es mayor que la relación de aspecto de la hoja (ancho)", () => {
    let relacionDeAspectoImagen = 0.75;
    let anchoImagen = 960;
    let altoImagen = 1280;
    let relacionDeAspectoHoja = 0.70881;
    let anchoHoja = 796;
    let altoHoja = 1123;
    objResultado.ajustarImagen(
      relacionDeAspectoImagen,
      anchoImagen,
      altoImagen,
      relacionDeAspectoHoja,
      anchoHoja,
      altoHoja
    );
    expect(objResultado.ancho).toBe(796);
  });
  test("Ajuste de la imagen cuando relación de aspecto de la imagen es mayor que la relación de aspecto de la hoja (alto)", () => {
    let relacionDeAspectoImagen = 0.75;
    let anchoImagen = 960;
    let altoImagen = 1280;
    let relacionDeAspectoHoja = 0.70881;
    let anchoHoja = 796;
    let altoHoja = 1123;
    objResultado.ajustarImagen(
      relacionDeAspectoImagen,
      anchoImagen,
      altoImagen,
      relacionDeAspectoHoja,
      anchoHoja,
      altoHoja
    );
    expect(objResultado.alto).toBe(1061);
  });
  test("Ajuste de la imagen cuando relación de aspecto de la imagen es menor que la relación de aspecto de la hoja (ancho)", () => {
    let relacionDeAspectoImagen = 1.11;
    let anchoImagen = 2128;
    let altoImagen = 1916;
    let relacionDeAspectoHoja = 1.41;
    let anchoHoja = 1123;
    let altoHoja = 796;
    objResultado.ajustarImagen(
      relacionDeAspectoImagen,
      anchoImagen,
      altoImagen,
      relacionDeAspectoHoja,
      anchoHoja,
      altoHoja
    );
    expect(objResultado.ancho).toBe(884);
  });
  test("Ajuste de la imagen cuando relación de aspecto de la imagen es menor que la relación de aspecto de la hoja (alto)", () => {
    let relacionDeAspectoImagen = 1.11;
    let anchoImagen = 2128;
    let altoImagen = 1916;
    let relacionDeAspectoHoja = 1.41;
    let anchoHoja = 1123;
    let altoHoja = 796;
    objResultado.ajustarImagen(
      relacionDeAspectoImagen,
      anchoImagen,
      altoImagen,
      relacionDeAspectoHoja,
      anchoHoja,
      altoHoja
    );
    expect(objResultado.alto).toBe(796);
  });
});

describe("Pruebas a la clase Resultado - Método calcularResultado", () => {
  test("Calculo del resultado de ajustar la imagen cuando se necesita ajustar (ancho)", () => {
    let relacionDeAspectoImagen = 1.11;
    let anchoImagen = 2128;
    let altoImagen = 1916;
    let relacionDeAspectoHoja = 1.41;
    let anchoHoja = 1123;
    let altoHoja = 796;
    objResultado.calcularResultado(
      relacionDeAspectoImagen,
      anchoImagen,
      altoImagen,
      relacionDeAspectoHoja,
      anchoHoja,
      altoHoja
    );
    expect(objResultado.ancho).toBe(884);
  });

  test("Calculo del resultado de ajustar la imagen cuando se necesita ajustar (alto)", () => {
    let relacionDeAspectoImagen = 1.11;
    let anchoImagen = 2128;
    let altoImagen = 1916;
    let relacionDeAspectoHoja = 1.41;
    let anchoHoja = 1123;
    let altoHoja = 796;
    objResultado.calcularResultado(
      relacionDeAspectoImagen,
      anchoImagen,
      altoImagen,
      relacionDeAspectoHoja,
      anchoHoja,
      altoHoja
    );
    expect(objResultado.alto).toBe(796);
  });

  test("Calculo del resultado de ajustar la imagen cuando se necesita ajustar (orientacion)", () => {
    let relacionDeAspectoImagen = 1.11;
    let anchoImagen = 2128;
    let altoImagen = 1916;
    let relacionDeAspectoHoja = 1.41;
    let anchoHoja = 1123;
    let altoHoja = 796;
    objResultado.calcularResultado(
      relacionDeAspectoImagen,
      anchoImagen,
      altoImagen,
      relacionDeAspectoHoja,
      anchoHoja,
      altoHoja
    );
    expect(objResultado.orientacion).toMatch(HORIZONTAL);
  });

  test("Calculo del resultado de ajustar la imagen cuando no se necesita ajustar (ancho)", () => {
    let relacionDeAspectoImagen = 0.66;
    let anchoImagen = 563;
    let altoImagen = 848;
    let relacionDeAspectoHoja = 0.71;
    let anchoHoja = 796;
    let altoHoja = 1123;
    objResultado.calcularResultado(
      relacionDeAspectoImagen,
      anchoImagen,
      altoImagen,
      relacionDeAspectoHoja,
      anchoHoja,
      altoHoja
    );
    expect(objResultado.ancho).toBe(563);
  });

  test("Calculo del resultado de ajustar la imagen cuando no se necesita ajustar (alto)", () => {
    let relacionDeAspectoImagen = 0.66;
    let anchoImagen = 563;
    let altoImagen = 848;
    let relacionDeAspectoHoja = 0.71;
    let anchoHoja = 796;
    let altoHoja = 1123;
    objResultado.calcularResultado(
      relacionDeAspectoImagen,
      anchoImagen,
      altoImagen,
      relacionDeAspectoHoja,
      anchoHoja,
      altoHoja
    );
    expect(objResultado.alto).toBe(848);
  });

  test("Calculo del resultado de ajustar la imagen cuando no se necesita ajustar (orientación)", () => {
    let relacionDeAspectoImagen = 0.66;
    let anchoImagen = 563;
    let altoImagen = 848;
    let relacionDeAspectoHoja = 0.71;
    let anchoHoja = 796;
    let altoHoja = 1123;
    objResultado.calcularResultado(
      relacionDeAspectoImagen,
      anchoImagen,
      altoImagen,
      relacionDeAspectoHoja,
      anchoHoja,
      altoHoja
    );
    expect(objResultado.orientacion).toMatch(VERTICAL);
  });
});

/*FUNCIÓN PARA TRANFORMAR EL ARCHIVO SUBIDO EN IMAGEN*/
async function convertirArchivoEnImagen(archivo) {
  try {
    return (await Promise.resolve(self.createImageBitmap(archivo)));
  } catch (err) {
    console.log(err);
  }
}

export { convertirArchivoEnImagen };

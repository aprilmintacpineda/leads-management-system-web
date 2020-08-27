// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
export function countryToFlag (isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

function readImage (file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = () => {
      reject(fileReader.error);
    };

    fileReader.readAsDataURL(file);
  }, []);
}

/**
 * from https://www.npmjs.com/package/react-image-crop
 * @param {File} src - Select File
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
export async function getCroppedImg (file, crop, fileName) {
  const src = await readImage(file);
  const image = document.createElement('img');
  image.src = src;

  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const context2d = canvas.getContext('2d');

  context2d.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  const blob = await new Promise(resolve => {
    canvas.toBlob(
      blob => {
        blob.name = fileName;
        resolve(blob);
      },
      'image/jpeg',
      0.8
    );
  });

  return blob;
}

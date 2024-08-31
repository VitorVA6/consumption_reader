import isBase64 from 'is-base64';
import path from 'path';
import fs from 'fs/promises';
import InvalidDataError from '../../application/errors/invalid-data-error';

export type ImageData = {
  file_path: string,
  mime: string,
};

export default async function base64_to_file(base64: string): Promise<ImageData> {
  const allowed_mimes = ['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif'];
  if (!isBase64(base64, { mimeRequired: true })) throw new InvalidDataError('Formato de imagem não é base 64 ou está faltando o mime type');

  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || '';
  const image_buffer = Buffer.from(arr[1], 'base64');

  if (!allowed_mimes.includes(mime)) throw new InvalidDataError('Mime type do arquivo não é permitido');

  const file_path = path.join(__dirname, `image.${mime.split('/')[1]}`);

  try {
    await fs.writeFile(file_path, image_buffer);
    console.log('Imagem salva com sucesso!');
  } catch (err) {
    console.log(err);
  }

  return {
    file_path,
    mime,
  };
}

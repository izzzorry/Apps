import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  // Tomar una foto usando la cámara
  public async takePhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    // Guardar la foto tomada
    const savedPhoto = await this.savePicture(photo);
    return savedPhoto;
  }

  // Guardar la foto en el sistema de archivos
  private async savePicture(photo: Photo): Promise<string> {
    // Obtener la foto en base64
    const base64Data = await fetch(photo.webPath!).then((res) => res.blob()).then((blob) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Especificamos que el resultado es un string, que es lo que se espera
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]); // Extraer la parte de la imagen base64
        };
        reader.readAsDataURL(blob);
      });
    });

    // Guardar el archivo en el sistema de archivos
    const fileName = new Date().getTime() + '.jpeg';
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data, // Ahora es de tipo string
      directory: Directory.Data,
    });

    return fileName; // Retorna el nombre del archivo guardado
  }
}

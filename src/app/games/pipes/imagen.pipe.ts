import { Pipe, PipeTransform } from '@angular/core';
import { Characters } from '../interface/personaje.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(value: Characters): string {
    if(!value.img){
      return 'assets/img/no-image.png';
    }
    return value.img;
  }

}

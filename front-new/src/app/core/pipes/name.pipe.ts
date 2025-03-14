import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: string|undefined, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    value = value.replace(' do ', ' ').replace(' da ', ' ').replace(' dos ', ' ').replace(' de ', ' ');
    return value.split(' ').slice(0, 2).join(' ');
  }

}

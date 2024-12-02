import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separatorWords'
})
export class SeparatorPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const words = value.split(' ');
    return words.slice(0, 2).join(' ')+ '...';
  }

}

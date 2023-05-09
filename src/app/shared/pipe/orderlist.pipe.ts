import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/model/track.model';

@Pipe({
  name: 'orderlist',
})
export class OrderlistPipe implements PipeTransform {
  transform(
    value: Array<any>,
    args: string | null = null,
    sort: string = 'asc'
  ): TrackModel[] {
    //console.log(value), console.log(args), console.log(sort);

    try {
      if (args === null) {
        return value;
      } else {
        const tpmlist = value.sort((a, b) => {
          if (a[args] < b[args]) {
            return -1;
          } else if (a[args] > b[args]) {
            return 0;
          } else if (a[args] < b[args]) {
            return 1;
          }
          return 1;
        });
        return (sort === 'asc') ? tpmlist : tpmlist.reverse();
      }
    } catch (e) {
      //console.log('algo paso');
      return value;
    }

  }
}

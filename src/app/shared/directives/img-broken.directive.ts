import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  // TODO: Host hace referencia al huespe
  @HostListener('error') handleError():void{
    const elNative = this.elHost.nativeElement;
    elNative.src = '../../../assets/broken2.png';
    //console.log('img Broken', this.elHost)
  }
  constructor(private elHost: ElementRef) {
    console.log(this.elHost)
  }
}

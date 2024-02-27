import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightMouse]'
})
export class HighlightMouseDirective {

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) { }

  @Input() defautColor = '#FFF';
  @Input('appHighlightMouse') highlightColor = '';

  @HostBinding('style.border') border: string = '';

  @HostListener('mouseenter') onMouseEnter() {
    this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', this.highlightColor);
    this.border = '1px solid rgb(198, 198, 198)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', this.defautColor);
    this.border = 'none';
  }
}

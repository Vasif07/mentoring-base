import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hoverShadow]',
  standalone: true,
})
export class ShadowDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') 
  onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      '0 5px 25px rgba(0, 0, 0, 0.8)'
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
  }
}

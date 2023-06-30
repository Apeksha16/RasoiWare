import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[layout]'
})
export class LayoutDirective implements OnInit {
  @Input('layout') layout: string | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.layout) {
      this.layout.split(' ').forEach(element => {
        const styleParts = element.split('-');
        if (styleParts.length === 2 && !isNaN(parseInt(styleParts[1], 10))) {
          const [property, value] = styleParts;
          const cssValue = `${value}px`;
          this.applyStyle(this.getProperty(property), cssValue);
        }
        else if (styleParts.length === 3 && styleParts[1] && !isNaN(parseInt(styleParts[2], 10))) {
          const [property, subProperty, value] = styleParts;
          const cssValue = `${value}px`;
          this.applyStyle(`${this.getProperty(property)}-${this.getSubProperty(subProperty)}`, cssValue);
        }
     });
    }
  }

  private applyStyle(property: string, value: string) {
    this.renderer.setStyle(this.elementRef.nativeElement, property, value);
  }

  private getProperty(prop: string) {
    return prop === 'm' ? 'margin' : prop === 'p' ? 'padding' : '';
  }
  private getSubProperty(prop: string) {
    return prop === 't' ? 'top' : prop === 'r' ? 'right' : prop === 'b' ? 'bottom' : prop === 'l' ? 'left' : '';
  }
}

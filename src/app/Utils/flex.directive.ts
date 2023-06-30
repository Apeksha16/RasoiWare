import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fxLayout],[fxAlign],[fxGap],[fxWrap],[fxHeight],[fxWidth]'
})
export class FlexDirective implements OnInit {
  @Input('fxLayout') layout: string | undefined;
  @Input('fxAlign') align: string | undefined;
  @Input('fxGap') gap: string | undefined;
  @Input('fxWrap') wrap: string | undefined;
  @Input('fxHeight') height: string | undefined;
  @Input('fxWidth') width: string | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.layout) {
      this.applyLayoutStyles(this.layout);
    }

    if (this.align) {
      this.applyAlignmentStyles(this.align);
    }

    if (this.gap) {
      this.applyGapStyles(this.gap);
    }

    if (this.wrap) {
      this.applyWrapStyles(this.wrap);
    }
    if (this.height)
    {
      this.applyWidthOrHeight('height', this.height);
    }
    if (this.width)
    {
      this.applyWidthOrHeight('width', this.width);
      }
  }

  private applyLayoutStyles(layout: string) {
    const styles = layout.split(' ');

    if (styles.includes('row')) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'flex-direction', 'row');
    }

    if (styles.includes('column')) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'flex-direction', 'column');
    }
  }

  private applyAlignmentStyles(align: string) {
    const [horizontalAlign, verticalAlign] = align.split(' ');

    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');

    // Horizontal alignment
    if (horizontalAlign === 'start') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'flex-start');
    } else if (horizontalAlign === 'center') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'center');
    } else if (horizontalAlign === 'end') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'flex-end');
    } else if (horizontalAlign === 'space-between') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'space-between');
    } else if (horizontalAlign === 'none') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'unset');
    }

    // Vertical alignment
    if (verticalAlign === 'start') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'align-items', 'flex-start');
    } else if (verticalAlign === 'center') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'align-items', 'center');
    } else if (verticalAlign === 'end') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'align-items', 'flex-end');
    } else if (verticalAlign === 'none') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'align-items', 'unset');
    }
  }

  private applyGapStyles(gap: string) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'gap', gap+'%');
  }

  private applyWrapStyles(wrap: string) {
    if (wrap === 'wrap') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'flex-wrap', 'wrap');
    } else if (wrap === 'nowrap') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'flex-wrap', 'nowrap');
    }
  }
  applyWidthOrHeight(align: string, value: string | undefined)
  {
    this.renderer.setStyle(this.elementRef.nativeElement, align, value);
  }
}


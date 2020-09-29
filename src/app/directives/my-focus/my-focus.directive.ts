import { Directive, OnInit, Input, ElementRef, Renderer, OnChanges } from '@angular/core';

@Directive({
  selector: '[appMyFocus]'
})
export class MyFocusDirective implements OnInit, OnChanges {

  @Input('appMyFocus') focused: boolean;

  constructor(private hostEle: ElementRef, private renderer: Renderer) {}

  ngOnInit() {
    /*if (this.focused) {
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }*/
  }

  ngOnChanges() {
    if (this.focused) {
      this.renderer.invokeElementMethod(this.hostEle.nativeElement, 'focus');
    }
  }

}

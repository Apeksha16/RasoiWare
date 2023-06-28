import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexDirective } from './flex.directive';
import { LayoutDirective } from './layout.directive';



@NgModule({
  declarations: [FlexDirective, LayoutDirective],
  imports: [
    CommonModule
  ],
  exports: [
    FlexDirective,
    LayoutDirective
  ]
})
export class SharedModule { }

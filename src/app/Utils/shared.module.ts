import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDirective } from './layout.directive';
import { FlexDirective } from './flex.directive';



@NgModule({
  declarations: [LayoutDirective, FlexDirective],
  imports: [
    CommonModule
  ],
  exports:[LayoutDirective, FlexDirective]
})
export class SharedModule { }

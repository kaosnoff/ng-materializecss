import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgMaterializecssDirective } from './ng-materializecss.directive';

@NgModule({
  declarations: [
    NgMaterializecssDirective
  ],
  imports: [
		CommonModule
  ],
  exports: [
    NgMaterializecssDirective
  ]
})
export class NgMaterializecssModule { }

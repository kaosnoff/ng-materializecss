import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgMaterializecssDirective } from './ng-materializecss.directive';
import { NgMaterializecssService } from './ng-materializecss.service';

@NgModule({
  declarations: [
    NgMaterializecssDirective
  ],
  imports: [
		CommonModule
  ],
  exports: [
    NgMaterializecssDirective
  ],
	providers: [
		NgMaterializecssService,
		NgMaterializecssDirective
	]
})
export class NgMaterializecssModule { }

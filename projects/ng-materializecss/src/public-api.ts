/*
 * Public API Surface of ng-materializecss
 */
export { NgMaterializecssModule } from './lib/ng-materializecss.module';
export { NgMaterializecssAction, NgMaterializecssDirective } from './lib/ng-materializecss.directive';
export { NgMaterializecssService } from './lib/ng-materializecss.service';


if (!("M" in window))
{
	throw new Error("Couldn't find Materialize (M) object on window. It is created by the materialize-css library. Please import materialize-css before importing angular2-materialize.");
}
if (!("Waves" in window))
{
	throw new Error("Couldn't find Waves object on window. It is supposed to be created by the materialize-css library. Please import materialize-css before importing angular2-materialize.");
}

declare var Waves: any;
Waves.displayEffect();

declare var M: any;

export function toast(...args: any): void
{
	M.toast(...args);
}

// polyfill remove any elem in DOM - https://github.com/InfomediaLtd/angular2-materialize/issues/377 (IE)
if (!Element.prototype.remove)
{
	Element.prototype.remove = function remove()
	{
		if (this.parentNode)
		{
			this.parentNode.removeChild(this);
		}
	};
}
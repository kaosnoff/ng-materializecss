import
	{
		Directive,
		ElementRef,
		Input,
		Output,
		DoCheck,
		OnChanges,
		OnDestroy,
		AfterViewInit,
		EventEmitter
	} from '@angular/core';
import { CustomEvent } from './custom-event-polyfill';

declare var $: any;
declare var M: any;

export interface MaterializeAction
{
	
}

@Directive({
	selector: '[materialize]'
})
export class MaterializeDirective implements AfterViewInit, DoCheck, OnChanges, OnDestroy
{
	public ngAfterViewInit(): void
	{
		//this.performElementUpdates();
	}
	
	public ngOnChanges(_unused?): void
	{
		/*
		if (this.isSelect())
		{
			setTimeout(() => this.performLocalElementUpdates(), 10);
		}
		// */
	}
	
	public ngOnDestroy(): void
	{
		//this.performElementRemotion();
	}
	
	public ngDoCheck(): void
	{
		
	}
}
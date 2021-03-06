import
	{
		AfterViewInit,
		Directive,
		DoCheck,
		ElementRef,
		EventEmitter, Input,
		OnChanges,
		OnDestroy,
		Output
	} from "@angular/core";
import { CustomEvent } from './custom-event-polyfill';

declare var $: any;
declare var M: any;

export interface NgMaterializecssAction
{
	action: string;
	params: any;
}

@Directive({
	selector: '[materialize]'
})
export class NgMaterializecssDirective implements AfterViewInit, DoCheck, OnChanges, OnDestroy
{
	private _params: any[] = [];
	private _functionName: string = '';
	private previousValue: any = null;
	private previousDisabled: boolean = false;
	private _waitFunction: any = {};

	private changeListenerShouldBeAdded: boolean = true;

	@Output() public init = new EventEmitter<void>();
	private initialized = false;

	constructor (private _el: ElementRef)
	{
	}
	
	@Input()
	public set materializeParams(params: any)
	{
		this._params = params;
		this.performElementUpdates();
	}
	
	@Input()
	public set materializeActions(actions: EventEmitter<string | NgMaterializecssAction>)
	{
		actions.subscribe((action: string | NgMaterializecssAction) =>
		{
			window.setTimeout(() =>
			{
				if (typeof action === "string")
				{
					this.performLocalElementUpdates(action);
				} else
				{
					this.performLocalElementUpdates(action.action, action.params);
				}
			}, 1);
		})
	}

	@Input()
	public set materialize(functionName: string)
	{
		this._functionName = functionName;
	}

	// this is here to trigger change detection for select elements
	@Input()
	public set materializeSelectOptions(options: any)
	{
	}

	//used for the datepicker at the moment
	@Input() ngModel:any;

	public ngAfterViewInit()
	{
		this.performElementUpdates();
	}

	public ngOnChanges(_unused?:any)
	{
		if (this.isSelect())
		{
			setTimeout(() => this.performLocalElementUpdates(), 30);
		}
	}

	public ngOnDestroy()
	{
		this.performElementRemotion();
	}

	public ngDoCheck()
	{
		const nativeElement = this._el.nativeElement;
		const jQueryElement = $(nativeElement);
		if (this.isSelect())
		{
			let shouldUpdate = false;
			if (nativeElement.disabled != this.previousDisabled)
			{
				this.previousDisabled = nativeElement.disabled;
				shouldUpdate = true;
			}
			if (!jQueryElement.attr("multiple") && nativeElement.value != this.previousValue)
			{
				// handle select changes of the model
				this.previousValue = nativeElement.value;
				shouldUpdate = true;
			}
			if (shouldUpdate)
			{
				this.performLocalElementUpdates();
			}
		} else if (this.isTextarea())
		{
			if (nativeElement.value != this.previousValue)
			{
				this.previousValue = nativeElement.value;
				this.performElementUpdates();
			}
		}
		return false;
	}

	private performElementRemotion()
	{
		if (this.isTooltip())
		{
			const nativeElement = this._el.nativeElement;
			const jQueryElement = $(nativeElement);
			const tooltipId = jQueryElement.attr('data-tooltip-id');
			if (tooltipId)
			{
				$('#' + tooltipId).remove();
			}
		}
	}

	private performElementUpdates()
	{
		// it should have been created by now, but confirm anyway
		if (M && M.updateTextFields)
		{
			M.updateTextFields();
		}

		// handle select changes from the HTML
		if (this.isSelect() && this.changeListenerShouldBeAdded)
		{
			const nativeElement = this._el.nativeElement;
			const jQueryElement = $(nativeElement);
			jQueryElement.on("change", (e:Event|any) =>
			{
				if (!e.originalEvent || !e.originalEvent.internalToMaterialize)
				{
					const event: any = document.createEvent("CustomEvent");
					//if (jQueryElement.attr("multiple")) {
					//event.initCustomEvent("input",false,false,undefined);
					//}
					//else {
					event.initCustomEvent("change", false, false, undefined);
					//}

					event.internalToMaterialize = true;
					nativeElement.dispatchEvent(event);
				}
			});
			this.changeListenerShouldBeAdded = false;
		}

		if (this.isAutocomplete())
		{
			const nativeElement = this._el.nativeElement;
			const jQueryElement = $(nativeElement);

			jQueryElement.on("change", (e:any) => nativeElement.dispatchEvent((<any>CustomEvent("input"))));
		}

		if (this.isDatePicker())
		{
			const nativeElement = this._el.nativeElement;
			const jqueryPickerElement = $(nativeElement);

			const datePicker = jqueryPickerElement[this._functionName](...this._params as any[]);
			const picker = datePicker.pickadate('picker');
			setTimeout(() =>
			{
				if (this.ngModel)
				{ // PR 292 - 1
					picker.set('select', this.ngModel);
				} else
				{
					const value = jqueryPickerElement.val();
					if (value && value.length > 0)
					{
						picker.set('select', value);
					}
				}
				jqueryPickerElement.on('change', (e: any) => nativeElement.dispatchEvent((<any>CustomEvent("input"))));
			});
		}

		if (this.isTimePicker())
		{
			const nativeElement = this._el.nativeElement;
			const jqueryPickerElement = $(nativeElement);

			const timePicker = jqueryPickerElement[this._functionName](...this._params as any[]);
			const picker = timePicker.pickatime('picker');
			setTimeout(() =>
			{
				if (this.ngModel)
				{
					picker.val(this.ngModel);
				} else
				{
					picker.val(jqueryPickerElement.val());
				}
				jqueryPickerElement.on('change', (e: any) => nativeElement.dispatchEvent((<any>CustomEvent("input"))));
			});
		}

		if (this.isChips())
		{
			const nativeElement = this._el.nativeElement;
			const jQueryElement = $(nativeElement);
			jQueryElement.on("chip.add", (e:any, chip: any) => nativeElement.dispatchEvent((<any>CustomEvent("chip.add", chip))));
			jQueryElement.on("chip.delete", (e:any, chip: any) => nativeElement.dispatchEvent((<any>CustomEvent("chip.delete", chip))));
			jQueryElement.on("chip.select", (e:any, chip: any) => nativeElement.dispatchEvent((<any>CustomEvent("chip.select", chip))));
		}

		if (this.isTextarea())
		{
			this._el.nativeElement.dispatchEvent((CustomEvent("autoresize", {
				bubbles: true,
				cancelable: false,
				detail: undefined
			})));
		}

		this.performLocalElementUpdates();
	}

	private performLocalElementUpdates(functionName = this._functionName, params = this._params)
	{
		if (this._waitFunction[functionName])
		{
			return;
		}

		this._waitFunction[functionName] = true;

		$(document).ready(() =>
		{
			this._waitFunction[functionName] = false;

			if (functionName)
			{
				const jQueryElement = $(this._el.nativeElement);
				if (jQueryElement[functionName])
				{
					if (params)
					{
						if (params instanceof Array)
						{
							jQueryElement[functionName](...params);
						} else
						{
							throw new Error("Params has to be an array.");
						}
					} else
					{
						jQueryElement[functionName]();
					}
				} else
				{
					// fallback to running this function on the global Materialize object
					if (M[functionName])
					{
						if (params)
						{
							if (params instanceof Array)
							{
								new M[functionName](this._el.nativeElement, ...params);
							} else
							{
								throw new Error("Params has to be an array.");
							}
						} else
						{
							new M[functionName](this._el);
						}
					} else
					{
						throw new Error("Couldn't find materialize function ''" + functionName + "' on element or the global Materialize object.");
					}
				}

				if (!this.initialized)
				{
					this.initialized = true;
					this.init.emit();
				}

			}

		});
	}
	
	private isTooltip()
	{
		return (this._functionName && this._functionName === "tooltip");
	}
	
	private isSelect()
	{
		return (this._functionName && this._functionName === "material_select");
	}
	
	private isDatePicker()
	{
		return (this._functionName && this._functionName === "pickadate");
	}
	
	private isTimePicker()
	{
		return (this._functionName && this._functionName === "pickatime");
	}
	
	private isChips()
	{
		return (this._functionName && this._functionName === "material_chip");
	}
	
	private isAutocomplete()
	{
		return (this._functionName && this._functionName === "autocomplete");
	}
	
	private isTextarea()
	{
		return this._el.nativeElement.nodeName == "TEXTAREA";
	}
	
	private enableDPButtons()
	{
		$('.picker__clear').removeAttr("disabled");
		$('.picker__today').removeAttr("disabled");
		$('.picker__close').removeAttr("disabled");
		$('.picker__select--year').removeAttr("disabled");
		$('.picker__select--month').removeAttr("disabled");
	}
}
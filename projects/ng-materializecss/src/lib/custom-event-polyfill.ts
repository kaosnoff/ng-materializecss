export function CustomEvent(type: string, params: CustomEventParams = { bubbles: false, cancelable: false, detail: undefined })
{
	var event = document.createEvent('CustomEvent');
	event.initCustomEvent(type, params.bubbles, params.cancelable);
	return event;
}
if ("Event" in window)
{
	CustomEvent.prototype = (window as any).Event.prototype;
}

interface CustomEventParams
{
	bubbles: boolean;
	cancelable: false;
	detail: undefined;
}
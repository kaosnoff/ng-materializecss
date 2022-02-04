# ng-materializecss

[![version](https://img.shields.io/npm/v/@kaosnoff/ng-materializecss.svg?style=flat-square)](https://www.npmjs.com/package/@kaosnoff/ng-materializecss)
[![downloads](https://img.shields.io/npm/dm/@kaosnoff/ng-materializecss.svg?style=flat-square)](https://www.npmjs.com/package/@kaosnoff/ng-materializecss)
[![MIT Licence](https://img.shields.io/npm/l/@kaosnoff/ng-materializecss.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[![NPM](https://nodei.co/npm/@kaosnoff/ng-materializecss.png?downloads=true)](https://www.npmjs.com/package/@kaosnoff/ng-materializecss)
[![NPM](https://nodei.co/npm-dl/@kaosnoff/ng-materializecss.png?height=2&months=12)](https://www.npmjs.com/package/@kaosnoff/ng-materializecss)



Angular support for Materialize CSS framework [http://materializecss.com/](http://materializecss.com/).

This library adds support for the Materialize CSS framework (v1.0.0) in Angular 13. It is needed to add the dynamic behavior of Materialize CSS that is using JavaScript rather than plain CSS. 

This library is loosely inspired by [angular2-materialize](https://www.npmjs.com/package/angular2-materialize), but reconstructed from the ground using [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.

View demo here: [https://infomedialtd.github.io/angular2-materialize/](https://infomedialtd.github.io/angular2-materialize/)

To use the library you need to import it once per project and then use its NgMaterializecssDirective directive for binding it to any component that needs a dynamic behavior, like collapsible panels, tooltips, etc.

## Using ng-materializecss

Start by following the Angular CLI or webpack instructions below to add the required dependencies to your project.

Add the NgMaterializecssModule to your NgModule:
```js
import { NgMaterializecssModule } from "@kaosnoff/ng-materializecss";

@NgModule({
  imports: [
    //...
    NgMaterializecssModule,
  ],
  //...
})
```

In your component, use it for dynamic behavior. For example, for collapsible panels:
```js
@Component({
    selector: "my-component",
    template: `
        <ul materialize="collapsible" class="collapsible" data-collapsible="accordion">
          <li>
            <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
            <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
          </li>
          <li>
            <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
            <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
          </li>
          <li>
            <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
            <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
          </li>
        </ul>

```

Apply an empty [NgMaterializecssDirective](https://github.com/kaosnoff/ng-materializecss/blob/master/projects/ng-materializecss/src/lib/ng-materializecss.directive.ts) attribute directive for top level components, like forms:

```html
<form materialize class="col s12">
  <div class="row">
    <div class="input-field col s6">
      <input placeholder="Placeholder" id="first_name" type="text" class="validate">
      <label for="first_name">First Name</label>
    </div>
  </div>
</form>
```

The [NgMaterializecssDirective](https://github.com/kaosnoff/ng-materializecss/blob/master/projects/ng-materializecss/src/lib/ng-materializecss.directive.ts) attribute directive (**materialize**) accepts any MaterializeCSS initialization call to apply to the element. The list of supported functions are provided by MaterializeCSS. Examples: collapsible, modal, tooltip, dropdown, tabs, material_select, sideNav, etc.

For example, to apply tooltip:
```html
<a materialize="tooltip" class="btn tooltipped" data-position="bottom" data-delay="50" data-tooltip="I am tooltip">Hover me!</a>
```

The `materialize` attribute directive also allows specifying parameters to be passed to the function, but providing a **materializeParams** attribute returning an array of params. Use it with a function call or even by inlining the params in the HTML.

Another useful option is emitting actions on an element. You may want to do that for calling Materialize (M) functions, like closing a modal dialog or triggering a toast. You can do that by setting the **materializeActions** attribute, which accepts an [EventEmitter](https://angular.io/docs/ts/latest/api/core/index/EventEmitter-class.html). The emitted events can either be a "string" type action (M function call) or a structure with action and parameters:

The example below shows how you'd create a modal dialog and use the actions to open or close it.
```html
<!-- Modal Trigger -->
<a class="waves-effect waves-light btn modal-trigger" (click)="openModal()">Modal</a>

<!-- Modal Structure -->
<div id="modal1" class="modal bottom-sheet" materialize="modal" [materializeParams]="[{dismissible: false}]" [materializeActions]="modalActions">
  <div class="modal-content">
    <h4>Modal Header</h4>
    <p>A bunch of text</p>
  </div>
  <div class="modal-footer">
    <a class="waves-effect waves-green btn-flat" (click)="closeModal()">Close</a>
    <a class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
  </div>
</div>
```
```js
  import {NgMaterializecssAction} from '@kaosnoff/ng-materializecss';
  //...
  modalActions = new EventEmitter<string|NgMaterializecssAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
```

For dynamic select elements apply the **materializeSelectOptions** directive to trigger element updates when the options list changes:
```html
<select materialize="material_select" [materializeSelectOptions]="selectOptions">
  <option *ngFor="let option of selectOptions" [value]="option.value">{{option.name}}</option>
</select>
```

## Installing & configuring @kaosnoff/ng-materializecss in projects created with the Angular CLI

Install MaterializeCSS and @kaosnoff/ng-materializecss from npm
```
yarn add materialize-css
yarn add @kaosnoff/ng-materializecss
```
<!--
jQuery 2.2 and Hammer.JS are required
```
npm install jquery@^2.2.4 --save
npm install hammerjs --save
```
-->
Edit the angular.json :

* Go to `projects.$name.architect.build.options.styles` and add the following line inside array before any styles:

```
  "../node_modules/materialize-css/dist/css/materialize.css"
```

* Go to `projects.$name.architect.build.options.scripts` and add the following lines inside array:

<!--
-->
```
  "../node_modules/jquery/dist/jquery.js",
  "../node_modules/hammerjs/hammer.js",
  "../node_modules/materialize-css/dist/js/materialize.js"
```

Add to the top of `app.module.ts`:

```js
import { NgMaterializecssModule } from '@kaosnoff/ng-materializecss';

```

Add `NgMaterializecssModule` inside imports array of @NgModule decorator in `app.module.ts`

Add this line to header of `index.html`:
```html
<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Installing and configuring @kaosnoff/ng-materializecss with webpack

Install **MaterializeCSS** and **NgMaterializecss** from yarn
```sh
yarn add materialize-css
yarn add @kaosnoff/ng-materializecss
```

**MaterializeCSS** required **jQuery** and **HammerJS**. 
```sh
yarn add jquery
yarn add hammerjs
```

Add the Google MD fonts to your `index.html`:
```html
<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Import `materialize-css` styles:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
```

Add the following plugin to your webpack configuration to provide **jQuery**:
```js
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
module.exports = {
  //...
  plugins: [
      new ProvidePlugin({
          "window.jQuery": "jquery",
          Hammer: "hammerjs/hammer"
      })
  ]
  //...
};
```

Import **MaterializeCSS** programatically, in the same place where you import **NgMaterializecss** module (usually in your main module, or shared module):
```js
import 'materialize-css';
import { NgMaterializecssModule } from '@kaosnoff/ng-materializecss';
```

### Loading additional resources

Another thing you would need to confirm is being able to load web fonts properly:
```js
{ test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' },
```
Notice that the url-loader is required for this to work (npm install it).

## Development server

Run `yarn dev` for a dev server. It will continuously watch for changes and rebuild the library when necessary.

To include a local package in your project, we suggest using `yarn link`. After building your project, go to `./dist/ng-materializecss` and run `yarn link`. You can now run `yarn link "@kaosnoff/ng-materializecss"` in the projects where you want to use this package.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/ng-materializecss` directory.

<!--
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
-->
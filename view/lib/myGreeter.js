var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, customElement, property, } from "https://unpkg.com/lit-element/lit-element.js?module";
let MyGreeter = class MyGreeter extends LitElement {
    constructor() {
        super(...arguments);
        this.mood = "great";
    }
    render() {
        return html `<h1>Unsere Database is <span>${this.mood}</span>!</h1>`;
    }
};
MyGreeter.styles = css `
    :host {
      display: block;
    }
    span {
      color: darkturquoise;
    }
  `;
__decorate([
    property()
], MyGreeter.prototype, "mood", void 0);
MyGreeter = __decorate([
    customElement("my-greeter")
], MyGreeter);
export { MyGreeter };

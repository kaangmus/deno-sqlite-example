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
        this.topic = "Website";
        this.mood = "awesome";
        this.themeColor = "";
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (newValue === oldValue)
            return;
        switch (name) {
            case "theme-color":
                this.style.setProperty("--themeColor", newValue);
                break;
            default:
        }
    }
    static get styles() {
        return css `
      :host {
        display: block;
        text-align: center;
        --themeColor: pink;
      }
      .colorful {
        color: var(--themeColor);
      }
      .decorated {
        text-decoration: var(--themeColor) double underline 2px;
      }
    `;
    }
    render() {
        return html `<h1>
      Our <span class="decorated">${this.topic}</span> is
      <span class="colorful">${this.mood}</span>!
    </h1>`;
    }
};
__decorate([
    property()
], MyGreeter.prototype, "topic", void 0);
__decorate([
    property()
], MyGreeter.prototype, "mood", void 0);
__decorate([
    property({ attribute: "theme-color" })
], MyGreeter.prototype, "themeColor", void 0);
MyGreeter = __decorate([
    customElement("my-greeter")
], MyGreeter);
export { MyGreeter };

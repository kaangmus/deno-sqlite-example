var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, customElement, property, } from "https://unpkg.com/lit-element/lit-element.js?module";
/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
let SimpleForm = class SimpleForm extends LitElement {
    constructor() {
        super(...arguments);
        this.items = [[]];
        this.buttonValue = "Submit";
        this.buttonName = "";
    }
    static get styles() {
        return css `
      :host {
        display: inline-block;
        box-sizing: border-box;
        cursor: default;
        line-height: 1.5;
        overflow-wrap: anywhere;
        margin-bottom: 2em;
      }
      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }
      * {
        margin: 0.2em;
      }
      label,
      #submit-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        text-align: right;
        width: 400px;
        line-height: 26px;
        margin-bottom: 10px;
      }
      input {
        height: 20px;
        flex: 0 0 200px;
        margin-left: 10px;
      }
      #submit {
        height: 40px;
        background-color: aquamarine;
        border: solid;
        border-color: darkturquoise;
        border-radius: 15px;
        margin-right: 1.5em;
      }
    `;
    }
    render() {
        return html `
      <form action="0.0.0.0:8000" method="get" class="form-example">
        ${this.items[0].length > 0
            ? this.items.map(([label, type, placeholder]) => html `
                <label for="${label}"
                  >${label}:
                  <input
                    type="${type}"
                    name="${label}"
                    id="${label}"
                    placeholder="${placeholder || ""}"
                    required
                /></label>
              `)
            : ""}
        <div id="submit-container">
          <input
            name="${this.buttonName}"
            type="submit"
            id="submit"
            value="${this.buttonValue}"
          />
        </div>
      </form>
    `;
    }
};
__decorate([
    property({ type: Array, reflect: true })
], SimpleForm.prototype, "items", void 0);
__decorate([
    property({ type: String, attribute: "button-value" })
], SimpleForm.prototype, "buttonValue", void 0);
__decorate([
    property({ type: String, attribute: "button-name" })
], SimpleForm.prototype, "buttonName", void 0);
SimpleForm = __decorate([
    customElement("simple-form")
], SimpleForm);
export { SimpleForm };

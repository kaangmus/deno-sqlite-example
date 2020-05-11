var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, customElement, property, } from "/home/ubustreet/Playground/lit/node_modules/lit-element/lit-element";
/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
let SimpleForm = class SimpleForm extends LitElement {
    constructor() {
        super(...arguments);
        this.items = [["nnn"]];
        this.primaryHsl = "";
        this.buttonValue = "Submit";
        this.buttonName = "";
        this.isSubmitBtn = false;
        this.formValues = {};
    }
    //prettier-ignore
    firstUpdated() {
        console.log("firstUpdated");
        this.shadowRoot
            .querySelector("#submit")
            .querySelector("sumit")
            .addEventListener("click", (e) => this.handleButtonClick(e));
    }
    connectedCallback() {
        super.connectedCallback();
        console.log("connectedCallback");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (newValue === oldValue)
            return;
        switch (name) {
            case "primary-hsl":
                console.log("newValue", newValue);
                if (newValue === null)
                    return void 0;
                newValue.split(" ").forEach((str, i) => {
                    console.log(i, str);
                    return i === 0
                        ? this.style.setProperty("--primary-h", str)
                        : i === 1
                            ? this.style.setProperty("--primary-s", str)
                            : i === 2
                                ? this.style.setProperty("--primary-l", str)
                                : void 0;
                });
                break;
            default:
        }
    }
    handleButtonClick(event) {
        console.log(this.items);
        event.preventDefault();
        this.formValues = Object.fromEntries(this.items.map(([label]) => [
            label.toLowerCase(),
            this.shadowRoot.querySelector(`#${label.toLowerCase()}`).value,
        ]));
        console.log(this.formValues);
        let myEvent = new CustomEvent("pseudo-submit", {
            detail: { message: "clicked on submit." },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(myEvent);
    }
    static get styles() {
        // Calculating Color: Dynamic Color Theming with Pure CSS
        // https://una.im/css-color-theming/
        return css `
      :host {
        display: inline-block;
        box-sizing: border-box;
        cursor: default;
        line-height: 1.5;
        overflow-wrap: anywhere;
        margin-bottom: 2em;
        --primary-h: 160;
        --primary-s: 100%;
        --primary-l: 75%;
        --primary: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
        --lighten-percentage: 20%;
        --darken-percentage: 25%;
        --primaryLight: hsl(
          var(--primary-h),
          var(--primary-s),
          calc(var(--primary-l) + var(--lighten-percentage))
        );
        --primaryDark: hsl(
          var(--primary-h),
          var(--primary-s),
          calc(var(--primary-l) - var(--darken-percentage))
        );
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
        background-color: var(--primary);
        border: 1.5px solid var(--primaryDark);
        border-radius: 15px;
        margin: 1em 1.5em 0 0;
        cursor: pointer;
      }
      #submit:hover {
        filter: brightness(0.9);
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
                    id="${label.toLowerCase()}"
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
    property({ attribute: "primary-hsl", reflect: true })
], SimpleForm.prototype, "primaryHsl", void 0);
__decorate([
    property({ type: String, attribute: "button-value" })
], SimpleForm.prototype, "buttonValue", void 0);
__decorate([
    property({ type: String, attribute: "button-name" })
], SimpleForm.prototype, "buttonName", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SimpleForm.prototype, "isSubmitBtn", void 0);
__decorate([
    property()
], SimpleForm.prototype, "formValues", void 0);
SimpleForm = __decorate([
    customElement("simple-form")
], SimpleForm);
export { SimpleForm };

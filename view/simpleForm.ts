import {
  LitElement,
  html,
  css,
  customElement,
  property,
  // @ts-ignore
} from "https://unpkg.com/lit-element/lit-element.js?module"

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
@customElement("simple-form")
export class SimpleForm extends LitElement {
  @property({ type: Array }) items = [[]]
  @property({ type: String, attribute: "button-value" }) buttonValue = "Submit"
  @property({ type: String, attribute: "button-name" }) buttonName = ""

  static get styles() {
    return css`
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
    `
  }

  render() {
    return html`
      <form action="0.0.0.0:8000" method="get" class="form-example">
        ${this.items[0].length > 0
          ? this.items.map(
              ([label, type, placeholder]) => html`
                <label for="${label}"
                  >${label}:
                  <input
                    type="${type}"
                    name="${label}"
                    id="${label}"
                    placeholder="${placeholder || ""}"
                    required
                /></label>
              `
            )
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
    `
  }
}

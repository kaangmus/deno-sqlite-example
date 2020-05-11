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
export class SimpleForm extends (LitElement as any) {
  @property({ type: Array, reflect: true }) items = [[""]]
  @property({ attribute: "primary-hsl", reflect: true }) primaryHsl = ""
  @property({ type: String, attribute: "button-value" })
  buttonValue = "Submit"
  @property({ type: String, attribute: "button-name" }) buttonName = ""
  @property({ type: Boolean, reflect: true, attribute: "is-submitting" })
  isSubmittting = false
  @property() formValues = {}

  //prettier-ignore
  firstUpdated() {
    if(!this.isSubmittting) this.shadowRoot
      .querySelector("#submit")
      .querySelector("sumit")
      .addEventListener("click", (e: Event) =>
        this.handleButtonClick(e as MouseEvent)
      )
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    super.attributeChangedCallback(name, oldValue, newValue)
    if (newValue === oldValue) return
    switch (name) {
      case "primary-hsl":
        if (newValue === null) return void 0
        newValue.split(" ").forEach((str, i) => {
          return i === 0
            ? this.style.setProperty("--primary-h", str)
            : i === 1
            ? this.style.setProperty("--primary-s", str)
            : i === 2
            ? this.style.setProperty("--primary-l", str)
            : void 0
        })
        break
      default:
    }
  }

  handleButtonClick(event: MouseEvent) {
    event.preventDefault()
    this.formValues = Object.fromEntries(
      this.items.map(([label]) => [
        label.toLowerCase(),
        this.shadowRoot.querySelector(`#${label.toLowerCase()}`).value,
      ])
    )
    let myEvent = new CustomEvent("pseudo-submit", {
      detail: { message: "clicked on submit." },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(myEvent)
  }

  static get styles() {
    // Calculating Color: Dynamic Color Theming with Pure CSS
    // https://una.im/css-color-theming/
    return css`
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
        border: 1.7px solid var(--primaryDark);
        border-radius: 15px;
        margin: 1em 1.5em 0 0;
        cursor: pointer;
      }
      #submit:hover {
        filter: brightness(0.9);
      }
    `
  }

  render() {
    return html`
      <form action="0.0.0.0:8000" method="get" class="form-example">
        ${this.items[0].length > 0 && !!this.items[0][0]
          ? this.items.map(
              ([label, type, placeholder]) => html`
                <label for="${label}"
                  >${label}:
                  <input
                    type="${type}"
                    name="${label}"
                    id="${label.toLowerCase()}"
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

import {
  LitElement,
  html,
  css,
  customElement,
  property,
  // @ts-ignore
} from "https://unpkg.com/lit-element/lit-element.js?module"

@customElement("my-greeter")
export class MyGreeter extends (LitElement as any) {
  @property() topic = "Website"
  @property() mood = "awesome"
  @property({ attribute: "theme-color" }) themeColor = ""
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    super.attributeChangedCallback(name, oldValue, newValue)
    if (newValue === oldValue) return
    switch (name) {
      case "theme-color":
        this.style.setProperty("--themeColor", newValue)
        break
      default:
    }
  }

  static get styles() {
    return css`
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
    `
  }

  render() {
    return html`<h1>
      Our <span class="decorated">${this.topic}</span> is
      <span class="colorful">${this.mood}</span>!
    </h1>`
  }
}

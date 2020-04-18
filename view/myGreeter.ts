import {
  LitElement,
  html,
  css,
  customElement,
  property,
  // @ts-ignore
} from "https://unpkg.com/lit-element/lit-element.js?module"

@customElement("my-greeter")
export class MyGreeter extends LitElement {
  @property()
  mood = "great"

  static styles = css`
    :host {
      display: block;
    }
    span {
      color: darkturquoise;
    }
  `
  render() {
    return html`<h1>Unsere Database is <span>${this.mood}</span>!</h1>`
  }
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, customElement, property, } from "https://unpkg.com/lit-element/lit-element.js?module";
let ModalWindow = class ModalWindow extends LitElement {
    constructor() {
        super(...arguments);
        this.items = [[]];
        this.buttonValue = "Submit";
        this.buttonName = "";
    }
    static get styles() {
        return css `
:host{
display:block;
}
.modal {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  bottom:0;
  right:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transform: scale(1.2);
  transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
}
.show-modal {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
  transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
}
.modal-body {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 3em ;
  width: auto;
  height: auto;
  max-height:100%;
  max-width:100%;
  border-radius: 0.5rem;
  overflow:auto;
}
.modal-close {
position: absolute;
top: 0.3em;
right: 0.3em;
padding: 0.3em;
cursor: pointer;
font-size: 2em;
height: 0.8em;
width: 0.8em;
text-indent: 20em;
overflow: hidden;
border: 0;
background-color:inherit;
}
.modal-close::after {
position: absolute;
line-height: 0.5;
top: 0.14em;
left: 0.12em;
text-indent: 0;
content: "\\00D7";
}
    `;
    }
    render() {
        return html `
<div class="modal">
  <div tabindex="0" class="modal-body">
    <button class="modal-close">close</button>
    <slot name="modal-content"></slot>
  </div>
</div>
    `;
    }
    showModalAndWaitForClose() {
        return new Promise(resolve => {
            const toggleModal = () => {
                if (!this.dom.modal.classList.contains("show-modal")) {
                    return this.setAttribute("show-modal", "");
                }
                else {
                    this.removeAttribute("show-modal");
                    this.dom.modalClose.removeEventListener("click", toggleModal);
                    this.removeEventListener("modalClose", toggleModal);
                    this.dom.modal.removeEventListener("click", handleClickOnModalWindow);
                    resolve();
                }
            };
            const handleClickOnModalWindow = (event) => {
                if (event.target === this.dom.modal) {
                    toggleModal();
                }
            };
            this.dom.modalClose.addEventListener("click", toggleModal);
            this.addEventListener("modalClose", toggleModal);
            this.dom.modal.addEventListener("click", handleClickOnModalWindow);
            toggleModal();
        });
    }
};
__decorate([
    property({ type: Array })
], ModalWindow.prototype, "items", void 0);
__decorate([
    property({ type: String, attribute: "button-value" })
], ModalWindow.prototype, "buttonValue", void 0);
__decorate([
    property({ type: String, attribute: "button-name" })
], ModalWindow.prototype, "buttonName", void 0);
ModalWindow = __decorate([
    customElement("modal-window")
], ModalWindow);
export { ModalWindow };

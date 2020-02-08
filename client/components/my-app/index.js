import styleText from "./styles.scss";

const sheet = new CSSStyleSheet();
sheet.replaceSync(styleText);
export default class MyApp extends HTMLElement {
  constructor() {
    super();
    this.shadowObj = this.attachShadow({ mode: "open" });
    this.shadowObj.adoptedStyleSheets = [sheet];
    this.render();
  }

  render() {
    var template = document.getElementById("template");
    let templateContent = template.content;
    // this.shadowObj.innerHTML = this.getTemplate();
    this.shadowObj.appendChild(document.importNode(templateContent, true));
  }
}

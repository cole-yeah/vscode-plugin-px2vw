import {} from "vscode";
import { IConfig } from "./type";

const reg = /(\d+(\.\d+)?)px/;

export default class Process {
  config: IConfig;
  constructor(config: IConfig) {
    this.config = config;
  }
  getRatio() {
    const { width, height, decimal } = this.config;
    const wRatio = 100 / width;
    const hRatio = 100 / height;
    return [wRatio, hRatio];
  }
  px2vw(text: string) {
    const num = parseFloat(text);
    const { decimal } = this.config;
    const [wRatio, hRatio] = this.getRatio();
    const vw = (num * wRatio).toFixed(decimal);
    const vh = (num * hRatio).toFixed(decimal);
    return [`${vw}vw`, `${vh}vh`];
  }
  convert(text: string) {
    const match = text.match(reg);
    if (!match) return "";
    const [numWithPx, num] = match;
    const [vw, vh] = this.px2vw(num);
    console.log("xxxxxxxxxxxxxxxxxxx convert", vw, vh);
    return text.replace(numWithPx, vw);
  }
  convertAll(text: string) {}
}

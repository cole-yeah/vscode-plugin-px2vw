import {} from "vscode";
import { IConfig } from "./type";

const reg = /(\d+(\.\d+)?)px/;

export default class Process {
  config: IConfig;
  constructor(config: IConfig) {
    this.config = config;
  }
  private getRatio() {
    const { width, height, decimal } = this.config;
    const wRatio = 100 / width;
    const hRatio = 100 / height;
    return [wRatio, hRatio];
  }
  px2vw(text: string): [number, number, number] {
    const num = parseFloat(text);
    const { decimal } = this.config;
    const [wRatio, hRatio] = this.getRatio();
    const vw = Number((num * wRatio).toFixed(decimal));
    const vh = Number((num * hRatio).toFixed(decimal));
    return [num, vw, vh];
  }
  convert(text: string) {
    const match = text.match(reg);
    if (!match) return "";
    const [numWithPx, num] = match;
    const [, vw, vh] = this.px2vw(num);
    return text.replace(numWithPx, `${vw}vw`);
  }
  convertAll(text: string) {}
}

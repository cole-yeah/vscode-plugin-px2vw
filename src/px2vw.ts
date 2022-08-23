import {} from "vscode";
import { IConfig } from "./type";

const reg = /(\d+(\.\d+)?)p(x)?/;
const gReg = /(\d+(\.\d+)?)p(x)?/g;

const vwReg = /(\d+(\.\d+)?)(vw|vh)/;
const VW_SIGN = "vw";
const VH_SIGN = "vh";

export default class Process {
  config: IConfig;
  constructor(config: IConfig) {
    this.config = config;
  }
  private fixedNumber(num: number, decimal?: number): number {
    return Number(num.toFixed(decimal ?? 3));
  }
  private getRatio() {
    const { width, height } = this.config;
    const wRatio = this.fixedNumber(100 / width);
    const hRatio = this.fixedNumber(100 / height);
    return [wRatio, hRatio];
  }
  px2vw(text: string): [number, number, number] {
    const strNumber = this.matchNumber(text);
    if (!strNumber) return [0, 0, 0];
    const num = parseFloat(strNumber);
    const { decimal } = this.config;
    const [wRatio, hRatio] = this.getRatio();
    const vw = this.fixedNumber(num * wRatio, decimal);
    const vh = this.fixedNumber(num * hRatio, decimal);
    return [num, vw, vh];
  }
  vw2px(text: string): [number, number, string] {
    const strNumber = this.matchNumberByVw(text);
    if (!strNumber) return [0, 0, ""];
    const num = parseFloat(strNumber);
    const [wRatio, hRatio] = this.getRatio();
    const isVw = text.includes(VW_SIGN);
    const val = this.fixedNumber(num / (isVw ? wRatio : hRatio), 2);
    return [num, val, isVw ? "vw" : "vh"];
  }
  private matchNumberByVw(text: string) {
    const match = text.match(vwReg);
    if (!match) return "";
    return match[1];
  }
  private matchNumber(text: string) {
    const match = text.match(reg);
    if (!match) return "";
    return match[1];
  }
  private convert(text: string) {
    const [, vw, vh] = this.px2vw(text);
    return text.replace(reg, `${vw}vw`);
  }
  convertAll(text: string) {
    if (!text) return text;
    return text.replace(gReg, (str: string) => {
      return this.convert(str);
    });
  }
}

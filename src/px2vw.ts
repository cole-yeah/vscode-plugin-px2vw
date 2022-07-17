import {} from "vscode";
import { IConfig } from "./type";

export default class Process {
  config: IConfig;
  constructor(config: IConfig) {
    this.config = config;
  }
  px2vw(text: string) {
    const num = parseFloat(text);
    // const vw =
  }
  convert(text: string) {
    const res = text.match(/(\d+)p(x)?/);
    if (!res) return "";
  }
  convertAll(text: string) {}
}

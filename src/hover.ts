import {
  CancellationToken,
  Hover,
  HoverProvider,
  MarkdownString,
  Position,
  ProviderResult,
  TextDocument,
} from "vscode";
import Process from "./px2vw";

const reg = /(\d+(\.\d+)?)(vw|vh)/;

export default class implements HoverProvider {
  constructor(private process: Process) {}
  provideHover(
    doc: TextDocument,
    pos: Position,
    token: CancellationToken
  ): ProviderResult<Hover> {
    const { getText } = doc;
    const line = doc.lineAt(pos.line).text.trim();

    const isVwOrVh = reg.test(line);

    if (!isVwOrVh) return;
    const [origin, target, unit] = this.process.vw2px(line);
    if (!origin) return;
    const md = new MarkdownString(`${origin}${unit} 由 ${target}px 转换得到`);
    return new Hover(md);
  }
}

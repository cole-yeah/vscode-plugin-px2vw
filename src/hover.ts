import {
  CancellationToken,
  Hover,
  HoverProvider,
  MarkdownString,
  Position,
  ProviderResult,
  TextDocument,
} from "vscode";

export default class implements HoverProvider {
  provideHover(
    doc: TextDocument,
    pos: Position,
    token: CancellationToken
  ): ProviderResult<Hover> {
    const { getText } = doc;
    const line = doc.lineAt(pos.line).text.trim();
    const text = getText();
    return new Hover(new MarkdownString(""));
  }
}

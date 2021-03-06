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
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): ProviderResult<Hover> {
    const { getText } = document;
    const text = getText();
    console.log("xxxxxxxxxxxx", text);
    return new Hover(new MarkdownString(""));
  }
}

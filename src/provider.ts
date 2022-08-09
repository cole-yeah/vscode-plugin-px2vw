import * as vscode from "vscode";
import Process from "./px2vw";

export class CssViewportProvider implements vscode.CompletionItemProvider {
  constructor(private process: Process) {}

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<
    vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>
  > {
    return new Promise((resolve, reject) => {
      const wordAtPosition = document.getWordRangeAtPosition(position);
      let word = "";
      if (
        wordAtPosition &&
        wordAtPosition.start.character < position.character
      ) {
        const allWord = document.getText(wordAtPosition);
        word = allWord.substring(
          0,
          position.character - wordAtPosition.start.character
        );
      }
      const res = this.process.px2vw(word);
      if (!res?.length) return resolve([]);
      const [px, vw, vh] = res;
      const item = new vscode.CompletionItem(
        `${px}px -> ${vw}vw`,
        vscode.CompletionItemKind.Snippet
      );
      item.insertText = `${vw}vw`;
      item.detail = "Value";
      return resolve([item]);
    });
  }
}

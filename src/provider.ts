import * as vscode from "vscode";
import Process from "./px2vw";

const UNIT_ARRAY = ["vw", "vh"];

export class CssViewportProvider implements vscode.CompletionItemProvider {
  constructor(private process: Process) {}

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.ProviderResult<
    vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>
  > {
    return new Promise((resolve) => {
      const lineText = document.getText(
        new vscode.Range(position.with(undefined, 0), position)
      );
      const [num, ...rest] = this.process.px2vw(lineText);

      if (!num) {
        return resolve([]);
      }
      return resolve(
        rest.map((val, i) => {
          const unit = UNIT_ARRAY[i]!;
          const item = new vscode.CompletionItem(
            `${num}px --> ${val}${unit}`,
            vscode.CompletionItemKind.Snippet
          );
          item.insertText = `${val}${unit}`;
          return item;
        })
      );
    });
  }
}

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import Process from "./px2vw";
import { IConfig } from "./type";

let config: IConfig = {
  width: 1920,
  height: 1080,
  decimal: 2,
};

export function activate(context: vscode.ExtensionContext) {
  console.log(">>>>>>>>>> 程序运行");
  const configFromVscode = vscode.workspace.getConfiguration(
    "px-to-vw"
  ) as unknown as IConfig;
  if (configFromVscode) {
    config = configFromVscode;
  }
  const process = new Process(config);
  const disposable = vscode.commands.registerTextEditorCommand(
    "extension.px2vw",
    (textEditor, edit) => {
      const { document, selection } = textEditor;
      // if(selection.isEmpty)

      const text = document.getText(selection);
      textEditor.edit((builder) => {
        builder.replace(selection, process.convert(text));
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

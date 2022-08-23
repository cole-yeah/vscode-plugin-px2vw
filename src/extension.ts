// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import Process from "./px2vw";
import { CssViewportProvider } from "./provider";
import { IConfig } from "./type";
import HoverProvider from "./hover";

let config: IConfig = {
  width: 1920,
  height: 1080,
  decimal: 2,
};

// 好坑啊这个postcss，普通的.css文件需要在数组内增加postcss才能生效
const LANS = ["css", "postcss", "ts", "tsx"];

export function activate(context: vscode.ExtensionContext) {
  const configFromVscode = vscode.workspace.getConfiguration(
    "px-to-vw"
  ) as unknown as IConfig;
  if (configFromVscode) {
    config = {
      ...config,
      ...configFromVscode,
    };
  }
  const process = new Process(config);
  const provider = new CssViewportProvider(process);
  const hoverProvider = new HoverProvider(process);

  for (let lan of LANS) {
    const completionDisposable =
      vscode.languages.registerCompletionItemProvider(lan, provider);
    const hoverDispoable = vscode.languages.registerHoverProvider(
      lan,
      hoverProvider
    );
    context.subscriptions.push(completionDisposable, hoverDispoable);
  }

  // vscode.languages.registerHoverProvider();

  vscode.commands.registerTextEditorCommand(
    "extension.px2vw",
    (textEditor, edit) => {
      const { document: doc } = textEditor;
      let selection: vscode.Selection | vscode.Range = textEditor.selection;
      const start = new vscode.Position(0, 0);
      const end = new vscode.Position(
        doc.lineCount - 1,
        doc.lineAt(doc.lineCount - 1).text.length
      );
      selection = new vscode.Range(start, end);
      const text = doc.getText(selection);
      textEditor.edit((builder) => {
        builder.replace(selection, process.convertAll(text));
      });
    }
  );

  const disposable = vscode.commands.registerTextEditorCommand(
    "extension.px2vwWhenSelection",
    (textEditor, edit) => {
      const { document: doc } = textEditor;
      let selection: vscode.Selection | vscode.Range = textEditor.selection;
      if (selection.isEmpty) {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(
          doc.lineCount - 1,
          doc.lineAt(doc.lineCount - 1).text.length
        );
        selection = new vscode.Range(start, end);
      }
      const text = doc.getText(selection);
      textEditor.edit((builder) => {
        builder.replace(selection, process.convertAll(text));
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

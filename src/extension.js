const vscode = require('vscode');
const moment = require("moment");

var decorationTypes = [];

function activate(context) {
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('extension.showList', editor => {
        searchTasks(editor);
    }));

    context.subscriptions.push(vscode.commands.registerTextEditorCommand('extension.insertDate', () => {
        var today = moment();
        let snippet = new vscode.SnippetString("[${1:" + today.format("YYYY") + "}-${2:" + today.format("MM") + "}-${3:" + today.format("DD") + "}]");
        vscode.window.activeTextEditor.insertSnippet(snippet);
    }));

    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((event) => {
        update(event.document);
    }));

    var timeout = null;
    function update(document) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            updateDecoration(document);
        }, 500);
    }

    let editor = vscode.window.activeTextEditor;
    if (editor) {
        update(editor.document);
    }
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;

function searchTasks(editor) {
    let lines = editor.document.getText().split(/\r?\n/);
    var paths = [];
    var items = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let title = line.match(/(^#+)\s(.*)/);
        if (title) {
            paths = paths.filter((d, i) => { return i <= (title[i].length - 2); });
            paths[title[1].length - 1] = title[2];
        }

        let task = line.match(/\[[\s]\]\s(.*)\[([12][90]\d{2}\-[01][0-9]\-[0-3][0-9])\]/);

        if (task) {
            items.push({
                label: task[1],                   // title
                description: task[2],             // date
                detail: "/ " + paths.join(" / "), // path
                line: i                           // lineNumber
            });
        }
    }

    items.sort((a, b) => {
        if (a.description == b.description) {
            return (a.line > b.line) ? 1 : -1;
        }
        return (a.description > b.description) ? 1 : -1;
    });
    let options = {
        matchOnDescription: true,
        matchOnDetail: true
    };
    vscode.window.showQuickPick(items, options).then((selected) => {
        if (selected) {
            var selection = new vscode.Position(selected.line, 0);
            editor.selections = [new vscode.Selection(selection, selection)];
            vscode.commands.executeCommand("revealLine", { lineNumber: selected.line, at: "center" });
        }
    });
}

function updateDecoration(document) {
    var editor = vscode.window.activeTextEditor;

    var buildDecorationType = function (backgroundColor) {
        return vscode.window.createTextEditorDecorationType({
            "backgroundColor": backgroundColor,
            "dark": {
                "color": "black"
            },
            "light": {
                "color": "white"
            }
        });
    };

    var getColor = function (key) {
        return vscode.workspace.getConfiguration("mdtasks").get(key);
    }

    var decoration = [
        {
            "color": getColor("colorOfToday"),
            "conditions": (date) => { return date == moment().format("YYYY-MM-DD"); }
        },
        {
            "color": getColor("colorOfTomorrow"),
            "conditions": (date) => { return date == moment().add(1, "day").format("YYYY-MM-DD"); }
        },
        {
            "color": getColor("colorOfPastday"),
            "conditions": (date) => { return date < moment().format("YYYY-MM-DD"); }
        },
        {
            "color": getColor("colorOfThisWeek"),
            "conditions": (date) => { return date < moment().add(7, "day").format("YYYY-MM-DD"); }
        },
    ];

    var regexDate = /\[ \].*\[([12][90]\d{2}\-[01][0-9]\-[0-3][0-9])\]/g;
    var text = document.getText();

    for (const i in decorationTypes) {
        decorationTypes[i].dispose();
    }
    decorationTypes = [];

    var match;
    while ((match = regexDate.exec(text)) !== null) {
        let range = { range: buildRange(document, match.index + match[0].length - match[1].length - 1, match[1].length) };
        let date = match[1];
        for (const i in decoration) {
            if (decoration[i].conditions(date)) {
                if (!decoration[i].data) { decoration[i].data = []; }
                decoration[i].data.push(range);
                break;
            }
        }
    }

    for (const i in decoration) {
        if (decoration[i].data) {
            let decorationType = buildDecorationType(decoration[i].color);
            editor.setDecorations(decorationType, decoration[i].data);
            decorationTypes.push(decorationType);
        }
    }

}

function buildRange(document, index, length) {
    let startPos = document.positionAt(index);
    let endPos = document.positionAt(index + length);
    return new vscode.Range(startPos, endPos);
}
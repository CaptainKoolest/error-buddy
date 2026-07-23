// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const errorExplanations = require('./errors');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "error-buddy" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('error-buddy.explainError', 
		
		async function () {
		// The code you place here will be executed every time your command is executed

	let selectedText = '';

const editor = vscode.window.activeTextEditor;

if (editor && !editor.selection.isEmpty) {
	selectedText = editor.document.getText(editor.selection);
} else if (vscode.window.activeTerminal) {
	const previousClipboardText = await vscode.env.clipboard.readText();

	await vscode.commands.executeCommand(
	'workbench.action.terminal.copySelection'
);

await new Promise(function (resolve) {
	setTimeout(resolve, 100);
});

selectedText = await vscode.env.clipboard.readText();

	if (selectedText === previousClipboardText) {
		selectedText = '';
	}
}
if (!selectedText.trim()) {
	vscode.window.showWarningMessage(
		'Highlight an error in the editor or terminal first.'
	);
	return;
}


	if (!selectedText) {
		vscode.window.showWarningMessage(
			`highlight an error message first`
		); 
		return;
	}	
	console.log('Error Buddy received:', JSON.stringify(selectedText));
	const normalizedSelectedText = selectedText
	.trim()
	.toLowerCase();

const matchingError = errorExplanations.find(function (error) {
	if (error.regex) {
		return error.regex.test(selectedText);
	}

	return normalizedSelectedText.includes(
		error.phrase.toLowerCase()
	);
});

if (!matchingError) {
	vscode.window.showWarningMessage(
		`Error Buddy could not recognize: "${selectedText.trim()}"`
	);
	return;
}

		if (matchingError) {
	const fixesText = matchingError.fixes
		.map(function (fix, index) {
			return `${index + 1}. ${fix}`;
		})
		.join('\n');

	const message =
		`Error Buddy\n\n` +
		`What it means:\n${matchingError.explanation}\n\n` +
		`Things to try:\n${fixesText}`;

	vscode.window.showInformationMessage(message, {
		modal: true
	});
} else {
	vscode.window.showInformationMessage(
		`I do not recognize this error yet: ${selectedText}`
	);
}
	}
);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

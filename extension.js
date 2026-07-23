// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const errorExplanations = require('./errors');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "error-buddy" is now active!');

	const disposable = vscode.commands.registerCommand('error-buddy.explainError', 
		
		async function () {

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

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

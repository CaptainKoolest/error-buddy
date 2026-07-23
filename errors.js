const errorExplanations = [
	// Specific JavaScript TypeErrors
	// Keep specific errors before general errors.


	{
		regex: /Cannot read properties of undefined (?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Cannot read properties of undefined',
		title: 'Cannot Read Properties of Undefined',
		explanation:
			'Your code tried to access a property or method on a value that is undefined.',
		fixes: [
			'Use console.log() on the variable immediately before the failing line.',
			'Make sure the variable receives a value before you use it.',
			'Check whether a function forgot to return a value.',
			'Use optional chaining, such as user?.name, when the value may be missing.'
		]
	},
	{
		regex: /Cannot read properties of null (?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Cannot read properties of null',
		title: 'Cannot Read Properties of Null',
		explanation:
			'Your variable currently contains null, but your code tried to use it like an object.',
		fixes: [
			'Check why the variable contains null.',
			'Test the value before using it with an if statement.',
			'If you are working with HTML, make sure your DOM selector found an element.',
			'Use optional chaining when null is an acceptable possibility.'
		]
	},
	{
		regex: /Cannot set properties of undefined (?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Cannot set properties of undefined',
		title: 'Cannot Set Properties of Undefined',
		explanation:
			'Your code tried to create or change a property on a value that is undefined.',
		fixes: [
			'Make sure the object exists before changing one of its properties.',
			'Check the spelling of the object variable.',
			'Initialize the object first, such as const user = {}.',
			'Log the object before the failing line to see its current value.'
		]
	},
	{
		regex: /Cannot set properties of null (?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Cannot set properties of null',
		title: 'Cannot Set Properties of Null',
		explanation:
			'Your code tried to change a property on a value whose current value is null.',
		fixes: [
			'Check why the value is null.',
			'Make sure an object is assigned before changing its properties.',
			'If using the DOM, confirm that the selected element exists.',
			'Add a null check before the property assignment.'
		]
	},
	{
		regex: /is not a function(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'is not a function',
		title: 'Value Is Not a Function',
		explanation:
			'Your code used parentheses to call a value, but that value is not actually a function.',
		fixes: [
			'Use console.log() to inspect the value before calling it.',
			'Check the spelling and capitalization of the function name.',
			'Verify that the function was imported correctly.',
			'Make sure another variable did not replace the function.'
		]
	},
	{
		regex: /is not iterable(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'is not iterable',
		title: 'Value Is Not Iterable',
		explanation:
			'Your code tried to loop through or spread a value that cannot be treated like a list.',
		fixes: [
			'Check whether the value is actually an array, string, map, or set.',
			'Log the value before using a for...of loop or spread syntax.',
			'Make sure an API response contains the array you expected.',
			'Use Object.keys(), Object.values(), or Object.entries() for plain objects.'
		]
	},
	{
		regex: /Cannot convert undefined or null to object(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Cannot convert undefined or null to object',
		title: 'Cannot Convert Missing Value to Object',
		explanation:
			'An object-related operation received undefined or null instead of a real object.',
		fixes: [
			'Log the value being passed into Object.keys(), Object.values(), or a similar method.',
			'Check that the object was created before using it.',
			'Provide a fallback object, such as value || {}.',
			'Trace where the missing value came from.'
		]
	},
	{
		regex: /Assignment to constant variable(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Assignment to constant variable',
		title: 'Assignment to Constant Variable',
		explanation:
			'Your code tried to assign a new value to a variable that was declared with const.',
		fixes: [
			'Use let instead of const if the variable needs to be reassigned.',
			'Remove the later assignment if the value should stay constant.',
			'Check whether you accidentally reused the same variable name.',
			'Remember that a const object can be modified, but the variable cannot point to a new object.'
		]
	},
	{
		regex: /Cannot access '(.+)' before initialization(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Cannot access',
		title: 'Variable Accessed Before Initialization',
		explanation:
			'Your code tried to use a let, const, class, or imported value before JavaScript finished creating it.',
		fixes: [
			'Move the declaration above the line where the value is used.',
			'Check for circular imports between files.',
			'Do not use a let or const variable before its declaration.',
			'Follow the error message to identify the exact variable name.'
		]
	},

	// ==================================================
	// Reference and declaration errors
	// ==================================================

	{
		regex: /is not defined(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'is not defined',
		title: 'Variable Is Not Defined',
		explanation:
			'JavaScript cannot find the variable or function in the current scope.',
		fixes: [
			'Check the spelling and capitalization of the name.',
			'Declare the variable before using it.',
			'Make sure the variable is accessible inside the current function or block.',
			'Check whether you forgot to import it from another file.'
		]
	},
	{
		regex: /Identifier has already been declared(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Identifier has already been declared',
		title: 'Identifier Already Declared',
		explanation:
			'The same variable, function, or class name was declared more than once in the same scope.',
		fixes: [
			'Search the current file for another declaration with the same name.',
			'Rename one of the variables.',
			'Remove the duplicate declaration.',
			'Use assignment without let or const if you meant to update an existing variable.'
		]
	},
	{
		regex: /Missing initializer in const declaration(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Missing initializer in const declaration',
		title: 'Const Is Missing a Starting Value',
		explanation:
			'A variable declared with const must receive a value immediately.',
		fixes: [
			'Assign a value on the same line as the const declaration.',
			'Use let if the value will only be assigned later.',
			'Check whether an equals sign or value was accidentally removed.'
		]
	},

	// ==================================================
	// Syntax errors
	// ==================================================

	{
		regex: /Unexpected end of input(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Unexpected end of input',
		title: 'Unexpected End of Input',
		explanation:
			'JavaScript reached the end of the file while still expecting more code.',
		fixes: [
			'Look for a missing closing brace, bracket, or parenthesis.',
			'Check for an unfinished string or template literal.',
			'Use VS Code bracket highlighting to find unmatched symbols.',
			'Format the document to make the unfinished section easier to see.'
		]
	},
	{
		regex: /Invalid or unexpected token(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Invalid or unexpected token',
		title: 'Invalid or Unexpected Token',
		explanation:
			'JavaScript found a character or piece of text that is not valid in that location.',
		fixes: [
			'Look for mismatched quotation marks.',
			'Delete and retype suspicious symbols copied from a website or document.',
			'Check for an unfinished string.',
			'Inspect the line before the reported line because the mistake may start there.'
		]
	},
	{
		regex: /Unexpected token(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Unexpected token',
		title: 'Unexpected Token',
		explanation:
			'JavaScript found syntax it did not expect, usually because punctuation is missing or misplaced.',
		fixes: [
			'Check for missing commas, parentheses, braces, or brackets.',
			'Look at the line directly before the reported error.',
			'Make sure every opening symbol has a matching closing symbol.',
			'Run Format Document to make unusual code structure easier to spot.'
		]
	},
	{
		regex: /Unexpected identifier(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Unexpected identifier',
		title: 'Unexpected Identifier',
		explanation:
			'JavaScript found a variable or name where it expected punctuation, an operator, or another value.',
		fixes: [
			'Check for a missing comma between values.',
			'Check for a missing operator between expressions.',
			'Look for an unfinished statement on the previous line.',
			'Make sure two words or variables were not placed beside each other accidentally.'
		]
	},
	{
		regex: /Unexpected string(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Unexpected string',
		title: 'Unexpected String',
		explanation:
			'JavaScript found a string in a location where a string was not expected.',
		fixes: [
			'Check for a missing comma before the string.',
			'Check for a missing plus sign when joining strings.',
			'Look for a quotation mark that ended the previous string too early.',
			'Inspect the previous line for incomplete syntax.'
		]
	},
	{
		regex: /Unexpected number(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Unexpected number',
		title: 'Unexpected Number',
		explanation:
			'JavaScript found a number where it expected an operator, separator, or another piece of syntax.',
		fixes: [
			'Check for a missing operator before the number.',
			'Check for a missing comma in an array or function call.',
			'Look for two numbers accidentally written beside each other.',
			'Inspect the previous line for an unfinished statement.'
		]
	},
	{
		regex: /Unexpected reserved word(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Unexpected reserved word',
		title: 'Unexpected Reserved Word',
		explanation:
			'You used a JavaScript keyword in a location where it is not allowed.',
		fixes: [
			'Check whether the keyword is being used as a variable name.',
			'Verify that import and export are being used in a module.',
			'Check whether await is inside an async function.',
			'Review the correct syntax for the keyword shown in the error.'
		]
	},
	{
		regex: /await is only valid(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'await is only valid',
		title: 'Await Used Outside an Async Function',
		explanation:
			'The await keyword was used somewhere that does not allow asynchronous waiting.',
		fixes: [
			'Add async before the surrounding function.',
			'Move the await expression inside an async function.',
			'Use an ES module if you intend to use top-level await.',
			'Check whether await was placed inside a normal callback function.'
		]
	},

	// ==================================================
	// Node.js and module errors
	// ==================================================

	{
		regex: /Cannot find module(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Cannot find module',
		title: 'Cannot Find Module',
		explanation:
			'Node.js could not locate a package or local file requested by require() or import.',
		fixes: [
			'Check the spelling of the package or file path.',
			'Run npm install if the dependency is missing.',
			'Use ./ at the beginning when importing a local file.',
			'Check capitalization because file names may be case-sensitive.'
		]
	},
	{
		regex: /ERR_MODULE_NOT_FOUND(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'ERR_MODULE_NOT_FOUND',
		title: 'ES Module Not Found',
		explanation:
			'Node.js could not locate a module referenced by an import statement.',
		fixes: [
			'Check the import path and file name.',
			'Include the file extension if your module setup requires it.',
			'Install the package if it is a dependency.',
			'Confirm that the file exists in the expected folder.'
		]
	},
	{
		regex: /ERR_REQUIRE_ESM(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'ERR_REQUIRE_ESM',
		title: 'ES Module Cannot Be Loaded With Require',
		explanation:
			'Your code tried to load an ES module using require(), which belongs to the CommonJS module system.',
		fixes: [
			'Replace require() with an import statement.',
			'Check the package documentation for CommonJS instructions.',
			'Configure the project module type in package.json if appropriate.',
			'Use a compatible package version only when that makes sense for your project.'
		]
	},
	{
		regex: /ENOENT(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'ENOENT',
		title: 'File or Folder Not Found',
		explanation:
			'Node.js tried to access a file or folder that does not exist at the specified path.',
		fixes: [
			'Print the path and verify that it is correct.',
			'Check the current working directory.',
			'Confirm that the file or folder actually exists.',
			'Create the required folder before writing a file inside it.'
		]
	},
	{
		regex: /EACCES(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'EACCES',
		title: 'Permission Denied',
		explanation:
			'The operating system refused access to a file, folder, port, or command.',
		fixes: [
			'Check that your account has permission to access the resource.',
			'Choose a folder owned by your user account.',
			'Check whether another application is locking the resource.',
			'Avoid running as administrator unless it is truly necessary.'
		]
	},
	{
		regex: /EADDRINUSE(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'EADDRINUSE',
		title: 'Address or Port Already in Use',
		explanation:
			'Your program tried to use a network port that another process is already using.',
		fixes: [
			'Stop the other server using the same port.',
			'Choose a different port number.',
			'Check whether an older copy of your program is still running.',
			'Restart the terminal if a previous process did not shut down correctly.'
		]
	},
	{
		regex: /npm is not recognized(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'npm is not recognized',
		title: 'npm Is Not Recognized',
		explanation:
			'Windows cannot find the npm command, usually because Node.js is missing or its installation folder is not in PATH.',
		fixes: [
			'Install or reinstall the LTS version of Node.js.',
			'Close and reopen VS Code after installing Node.js.',
			'Run node -v and npm -v to test the installation.',
			'Check that the Node.js installation folder is included in your PATH.'
		]
	},

	// ==================================================
	// Recursion, JSON, and promise errors
	// ==================================================

	{
		regex: /Maximum call stack size exceeded(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Maximum call stack size exceeded',
		title: 'Maximum Call Stack Size Exceeded',
		explanation:
			'Too many functions were called without finishing, often because recursion never stops.',
		fixes: [
			'Check whether a function is calling itself without a stopping condition.',
			'Confirm that each recursive call moves toward the stopping condition.',
			'Look for two functions that repeatedly call each other.',
			'Add console.log() statements to track how often the function runs.'
		]
	},
	{
		regex: /Received HTML instead of JSON(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Received HTML Instead of JSON',
		title: 'Received HTML Instead of JSON',
		explanation:
			'Your code tried to parse a response as JSON, but the response probably contained HTML instead.',
		fixes: [
			'Log the raw response before calling JSON.parse() or response.json().',
			'Check that the API URL is correct.',
			'Look for a server error page or login page being returned.',
			'Check the response status before parsing the response body.'
		]
	},
	{
		regex: /Unexpected token in JSON(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'Unexpected token in JSON',
		title: 'Invalid JSON',
		explanation:
			'Your code tried to parse text as JSON, but the text was not valid JSON.',
		fixes: [
			'Log the raw text before parsing it.',
			'Check for missing commas, quotes, braces, or brackets.',
			'Remember that JSON property names must use double quotes.',
			'Use a JSON validator to inspect the data.'
		]
	},
	{
		regex: /UnhandledPromiseRejection(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'UnhandledPromiseRejection',
		title: 'Unhandled Promise Rejection',
		explanation:
			'An asynchronous operation failed, but your code did not handle the error.',
		fixes: [
			'Add a catch() handler to the promise.',
			'Use try...catch around awaited code.',
			'Read the rest of the error message to find the original failure.',
			'Make sure every promise that can fail has error handling.'
		]
	},

	// ==================================================
	// General fallback errors
	// These should remain near the bottom.
	// ==================================================

	{
		regex: /ReferenceError(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'ReferenceError',
		title: 'Reference Error',
		explanation:
			'JavaScript attempted to use a variable or function that is unavailable in the current scope.',
		fixes: [
			'Read the rest of the error message to identify the missing name.',
			'Check the spelling and capitalization.',
			'Declare or import the missing value.',
			'Make sure the value is accessible inside the current block or function.'
		]
	},
	{
		regex: /TypeError(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'TypeError',
		title: 'Type Error',
		explanation:
			'A value was used in a way that is not compatible with its current type.',
		fixes: [
			'Read the full message to see which operation failed.',
			'Log the value and inspect it with typeof.',
			'Trace where the value was created or returned.',
			'Place specific TypeError entries before this general entry.'
		]
	},
	{
		regex: /SyntaxError(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'SyntaxError',
		title: 'Syntax Error',
		explanation:
			'JavaScript could not understand the structure of your code.',
		fixes: [
			'Check the reported line and the line directly before it.',
			'Look for missing or extra punctuation.',
			'Check for unclosed strings, brackets, parentheses, or braces.',
			'Format the document to make the code structure clearer.'
		]
	},
	{
		regex: /RangeError(?: \(reading ['"`].+?['"`]\))?/i,
		phrase: 'RangeError',
		title: 'Range Error',
		explanation:
			'A value was outside the range JavaScript allows for that operation.',
		fixes: [
			'Read the complete message to determine which value is invalid.',
			'Log the number or length being passed into the operation.',
			'Check loop boundaries and array sizes.',
			'Validate numeric input before using it.'
		]
	}
];

module.exports = errorExplanations;
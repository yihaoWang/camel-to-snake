# CamelCase to SnakeCase Conversion Tool for PHP
This tool provides an interactive and user-friendly way to convert PHP variable names from camelCase to snake_case, ensuring consistency across your codebase and adherence to PSR coding standards.

## Features
- **Accurate Parsing**: Reliably identifies camelCase variable names, even in complex code structures.
- **User-Friendly Output**: Offers a color-coded, easy-to-read CLI output, enhancing user experience.
- **Code Consistency**: Promotes a standardized codebase by ensuring adherence to PSR coding standards.

## Installation

To install the CamelCase to SnakeCase Conversion Tool, follow these steps:

1. Clone the repository
```sh
git clone https://github.com/yourusername/camel-to-snake.git
```
2. Navigate to the project directory
```sh
cd camel-to-snake
```
3. Install the required dependencies:
```sh
npm install
```

## Compilation
This tool is written in TypeScript. To compile the TypeScript files to JavaScript, run:
```
tsc
```

## Usage
1. Ensure you have compiled the TypeScript files to JavaScript.
2. Run the tool using the following command:
```sh
node dist/convert.js /path/to/your/php/file.php
```
Replace /path/to/your/php/file.php with the path to the PHP file you want to convert.
3. Follow the interactive prompts to review and apply the suggested variable name changes.




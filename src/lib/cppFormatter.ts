/**
 * C++ Code Formatter Utility
 * Automatically adjusts indentation and spacing for C++ source code.
 */

export function formatCppCode(rawCode: string, indentSize: number = 2): string {
  if (!rawCode || rawCode.trim() === '') return rawCode;

  const lines = rawCode.split(/\r?\n/);
  const formattedLines: string[] = [];
  let indentLevel = 0;
  let inMultiLineComment = false;

  const indentStr = ' '.repeat(indentSize);

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // 1. Preserve and handle multiline comments (/* ... */)
    if (inMultiLineComment) {
      formattedLines.push(indentStr.repeat(Math.max(0, indentLevel)) + line);
      if (line.includes('*/')) {
        inMultiLineComment = false;
      }
      continue;
    }

    if (line.startsWith('/*')) {
      if (!line.includes('*/')) {
        inMultiLineComment = true;
      }
      formattedLines.push(indentStr.repeat(Math.max(0, indentLevel)) + line);
      continue;
    }

    // 2. Normalize consecutive blank lines
    if (line === '') {
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
        formattedLines.push('');
      }
      continue;
    }

    // 3. Preprocessor directives (e.g. #include, #define, #ifndef) stay at column 0
    if (line.startsWith('#')) {
      line = line.replace(/^#\s*include\s+/, '#include ');
      line = line.replace(/^#\s*define\s+/, '#define ');
      formattedLines.push(line);
      continue;
    }

    // 4. Single-line comments (// ...)
    if (line.startsWith('//')) {
      formattedLines.push(indentStr.repeat(Math.max(0, indentLevel)) + line);
      continue;
    }

    // 5. Count opening and closing braces on this line (outside string/char literals)
    let openBraces = 0;
    let closeBraces = 0;
    let inString = false;
    let stringChar = '';

    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      const prevChar = c > 0 ? line[c - 1] : '';

      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (stringChar === char) {
          inString = false;
        }
      } else if (!inString) {
        if (char === '/' && line[c + 1] === '/') {
          break; // Ignore rest of line in comment
        }
        if (char === '{') openBraces++;
        if (char === '}') closeBraces++;
      }
    }

    // 6. Check for leading closing braces on current line
    let leadingCloseBraces = 0;
    for (let c = 0; c < line.length; c++) {
      if (line[c] === '}') {
        leadingCloseBraces++;
      } else if (!/\s/.test(line[c])) {
        break;
      }
    }

    if (leadingCloseBraces > 0) {
      indentLevel = Math.max(0, indentLevel - leadingCloseBraces);
    }

    // 7. Access specifiers (public:, private:, protected:) and switch labels (case X:, default:)
    const isAccessSpecifier = /^(public|private|protected)\s*:/.test(line);
    const isCaseOrLabel = /^(case\s+[^:]+|default)\s*:/.test(line);

    let currentLineIndent = indentLevel;
    if (isAccessSpecifier || isCaseOrLabel) {
      currentLineIndent = Math.max(0, indentLevel - 1);
    }

    // 8. Normalize spacing around common C++ keywords and tokens
    line = line.replace(/\b(if|for|while|switch|catch)\s*\(/g, '$1 (');
    line = line.replace(/\)\s*\{/g, ') {');
    line = line.replace(/\belse\s*\{/g, 'else {');
    line = line.replace(/\belse\s+if\s*\(/g, 'else if (');

    // Add normalized indentation
    const indentation = indentStr.repeat(Math.max(0, currentLineIndent));
    formattedLines.push(indentation + line);

    // 9. Update indentLevel for subsequent lines
    const remainingClose = closeBraces - leadingCloseBraces;
    indentLevel = Math.max(0, indentLevel + openBraces - remainingClose);
  }

  // Return clean formatted code terminating with single newline
  return formattedLines.join('\n').trim() + '\n';
}

const code = `
    // TODO: Overflow check (if stackTop < size - 1)
    if (stackTop < size - 1) {
`;
const codeWithoutComments = code.replace(/\/\/.*/g, '');
console.log("Without comments:");
console.log(codeWithoutComments);

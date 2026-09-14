import { SimulationFrame } from '../types';

export interface ExecutionResult {
  success: boolean;
  isTaskGoalAchieved: boolean;
  goalFeedback?: string;
  syntaxError?: string;
  frames: SimulationFrame[];
  stdout: string;
  exitCode: number;
  submittedTimeComplexity?: string;
  optimalTimeComplexity?: string;
  timeComplexityStatus?: 'optimal' | 'suboptimal' | 'unknown';
  timeComplexityAnalysis?: string;
}

// Strip C++ comments to analyze clean code
export function stripComments(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
}

// Check for balanced braces/parentheses
export function checkSyntaxBalance(cleanCode: string): string | null {
  const stack: string[] = [];
  const map: Record<string, string> = { '}': '{', ')': '(', ']': '[' };
  let inString = false;
  let quoteChar = '';

  for (let i = 0; i < cleanCode.length; i++) {
    const char = cleanCode[i];
    if ((char === '"' || char === "'") && cleanCode[i - 1] !== '\\') {
      if (!inString) {
        inString = true;
        quoteChar = char;
      } else if (quoteChar === char) {
        inString = false;
      }
      continue;
    }
    if (inString) continue;

    if (char === '{' || char === '(' || char === '[') {
      stack.push(char);
    } else if (char === '}' || char === ')' || char === ']') {
      const top = stack.pop();
      if (top !== map[char]) {
        return `Syntax Error: Unmatched bracket or parenthesis '${char}' at character position ${i}.`;
      }
    }
  }

  if (stack.length > 0) {
    return `Syntax Error: Unclosed bracket '${stack[stack.length - 1]}' detected.`;
  }
  return null;
}

/**
 * Big-O Time Complexity Analyzer
 */
export function analyzeComplexity(clean: string, taskId: string): {
  submittedTimeComplexity: string;
  optimalTimeComplexity: string;
  timeComplexityStatus: 'optimal' | 'suboptimal' | 'unknown';
  timeComplexityAnalysis: string;
} {
  // Count loops
  const forLoops = (clean.match(/for\s*\([^)]*\)/g) || []).length;
  const whileLoops = (clean.match(/while\s*\([^)]*\)/g) || []).length;
  const totalLoops = forLoops + whileLoops;

  // Check halving pattern
  const hasHalving = /mid\s*=\s*[^;]+2|l\s*=\s*mid\s*\+\s*1|r\s*=\s*mid\s*-\s*1|>>\s*1|\/=\s*2/i.test(clean);

  if (taskId === 't1_1') {
    const optimal = 'O(1)';
    if (totalLoops === 0) {
      return {
        submittedTimeComplexity: 'O(1)',
        optimalTimeComplexity: optimal,
        timeComplexityStatus: 'optimal',
        timeComplexityAnalysis: 'Direct array indexing uses base pointer arithmetic to access elements in constant time O(1).',
      };
    } else {
      return {
        submittedTimeComplexity: totalLoops === 1 ? 'O(n)' : `O(n^${totalLoops})`,
        optimalTimeComplexity: optimal,
        timeComplexityStatus: 'suboptimal',
        timeComplexityAnalysis: `Your solution uses ${totalLoops} loop(s). Direct array indexing can be executed in O(1) constant time without loops.`,
      };
    }
  }

  if (taskId === 't1_2' || taskId === 't1_3' || taskId === 't1_4' || taskId === 't1_5' || taskId === 't1_6' || taskId === 't1_7') {
    const optimal = 'O(n)';
    if (totalLoops === 1) {
      return {
        submittedTimeComplexity: 'O(n)',
        optimalTimeComplexity: optimal,
        timeComplexityStatus: 'optimal',
        timeComplexityAnalysis: 'Single-pass traversal visits each array element once, running in optimal O(n) linear time.',
      };
    } else if (totalLoops > 1) {
      return {
        submittedTimeComplexity: `O(n^${totalLoops})`,
        optimalTimeComplexity: optimal,
        timeComplexityStatus: 'suboptimal',
        timeComplexityAnalysis: 'Multiple nested loops detected. Array operations only require a single O(n) pass.',
      };
    }
    return {
      submittedTimeComplexity: 'O(1)',
      optimalTimeComplexity: optimal,
      timeComplexityStatus: 'suboptimal',
      timeComplexityAnalysis: 'No traversal loop detected. Array processing requires an O(n) loop over the elements.',
    };
  }

  if (taskId === 't3_1' || taskId === 't3_5' || taskId === 't3_6' || taskId === 't3_7' || taskId === 't3_8' || taskId === 't3_10') {
    const optimal = 'O(n)';
    return {
      submittedTimeComplexity: totalLoops >= 1 ? 'O(n)' : 'O(1)',
      optimalTimeComplexity: optimal,
      timeComplexityStatus: totalLoops >= 1 ? 'optimal' : 'suboptimal',
      timeComplexityAnalysis: 'Linear search scans each element sequentially, with a worst-case time complexity of O(n).',
    };
  }

  if (taskId === 't3_2' || taskId === 't3_3' || taskId === 't3_4' || taskId === 't3_9') {
    const optimal = 'O(log n)';
    if (hasHalving && totalLoops >= 1) {
      return {
        submittedTimeComplexity: 'O(log n)',
        optimalTimeComplexity: optimal,
        timeComplexityStatus: 'optimal',
        timeComplexityAnalysis: 'Halving the search space on each comparison reduces the problem size by half repeatedly, achieving optimal logarithmic O(log n) time.',
      };
    } else if (totalLoops >= 1) {
      return {
        submittedTimeComplexity: 'O(n)',
        optimalTimeComplexity: optimal,
        timeComplexityStatus: 'suboptimal',
        timeComplexityAnalysis: 'Linear scan detected instead of binary halving. Halve the range with mid calculation and pointer updates to reach O(log n).',
      };
    }
    return {
      submittedTimeComplexity: 'O(1)',
      optimalTimeComplexity: optimal,
      timeComplexityStatus: 'suboptimal',
      timeComplexityAnalysis: 'Binary search requires a loop with range halving (l = mid + 1, r = mid - 1) to achieve O(log n).',
    };
  }

  if (taskId === 't5_1') {
    const optimal = 'O(n²)';
    return {
      submittedTimeComplexity: totalLoops >= 2 ? 'O(n²)' : totalLoops === 1 ? 'O(n)' : 'O(1)',
      optimalTimeComplexity: optimal,
      timeComplexityStatus: totalLoops >= 2 ? 'optimal' : 'suboptimal',
      timeComplexityAnalysis: 'Transposing an n x n matrix inspects all n² cells via nested loops in O(n²) time.',
    };
  }

  if (taskId === 't2_1') {
    const optimal = 'O(n)';
    return {
      submittedTimeComplexity: totalLoops >= 1 ? 'O(n)' : 'O(1)',
      optimalTimeComplexity: optimal,
      timeComplexityStatus: totalLoops >= 1 ? 'optimal' : 'suboptimal',
      timeComplexityAnalysis: 'Applying in-place arithmetic transforms (addelement, subelement, square, multi) visits all n array elements in O(n) linear time.',
    };
  }

  if (taskId === 't2_2') {
    const optimal = 'O(n²)';
    return {
      submittedTimeComplexity: totalLoops >= 2 ? 'O(n²)' : (totalLoops === 1 ? 'O(n)' : 'O(1)'),
      optimalTimeComplexity: optimal,
      timeComplexityStatus: totalLoops >= 2 ? 'optimal' : 'suboptimal',
      timeComplexityAnalysis: 'Both Bubble Sort and Selection Sort use nested loops to compare and swap pairs, taking O(n²) time.',
    };
  }

  if (taskId === 't2_3') {
    const optimal = 'O(n²)';
    return {
      submittedTimeComplexity: totalLoops >= 2 ? 'O(n²)' : (totalLoops === 1 ? 'O(n)' : 'O(1)'),
      optimalTimeComplexity: optimal,
      timeComplexityStatus: totalLoops >= 2 ? 'optimal' : 'suboptimal',
      timeComplexityAnalysis: 'Comprehensive array suite: Transforms take O(n), sorting takes O(n²), and binary search takes O(log n). Overall bound is dominated by O(n²).',
    };
  }

  if (taskId === 't7_1' || taskId === 't7_2' || taskId === 't7_3' || taskId === 't7_10' || taskId === 't8_1' || taskId === 't9_1') {
    const optimal = 'O(1)';
    const desc = taskId.startsWith('t7') 
      ? 'Array-based stack push/pop/peek only manipulate the stackTop pointer index directly in O(1) constant time.'
      : 'Queue operations (enqueue/dequeue via front/rear pointers and modulo wrap-around) run directly in O(1) constant time.';
    return {
      submittedTimeComplexity: totalLoops === 0 ? 'O(1)' : 'O(n)',
      optimalTimeComplexity: optimal,
      timeComplexityStatus: totalLoops === 0 ? 'optimal' : 'suboptimal',
      timeComplexityAnalysis: desc,
    };
  }

  if (taskId === 't8_2' || taskId === 't9_2' || taskId === 't9_3' || taskId === 't9_4' || taskId === 't9_5' || taskId === 't7_4' || taskId === 't7_5' || taskId === 't7_6' || taskId === 't7_7' || taskId === 't7_8' || taskId === 't7_9') {
    const optimal = 'O(n)';
    return {
      submittedTimeComplexity: totalLoops >= 1 ? 'O(n)' : 'O(1)',
      optimalTimeComplexity: optimal,
      timeComplexityStatus: totalLoops >= 1 ? 'optimal' : 'suboptimal',
      timeComplexityAnalysis: taskId === 't9_2' || taskId === 't9_5'
        ? 'Reversing a queue with a stack dequeues n elements and pops them back in 2n operations: O(n) linear time.'
        : taskId === 't8_2'
        ? 'Splitting a queue processes all n elements through a while-loop into q1 and q2 in O(n) linear time.'
        : taskId === 't9_4'
        ? 'Searching a circular queue via do-while loop traverses up to n elements in O(n) linear time.'
        : taskId === 't7_4' || taskId === 't7_8'
        ? 'Testing palindrome by pushing and popping string characters executes in O(n) linear time.'
        : taskId === 't7_5'
        ? 'Delimiter matching pushes and pops each parenthesis at most once in O(n) linear time.'
        : taskId === 't7_6'
        ? 'Reversing stack elements using a second auxiliary stack runs in O(n) linear time.'
        : taskId === 't7_7'
        ? 'Infix to prefix conversion scans and reverses tokens in O(n) linear time.'
        : taskId === 't7_9'
        ? 'Evaluating a postfix expression using an STL stack processes each character token in O(n) linear time.'
        : 'Searching a circular queue traverses up to n elements via (i + 1) % size in O(n) linear time.',
    };
  }

  if (taskId === 't6_1' || taskId === 't6_2' || taskId === 't6_4') {
    const optimal = 'O(n)';
    return {
      submittedTimeComplexity: totalLoops >= 1 ? 'O(n)' : 'O(1)',
      optimalTimeComplexity: optimal,
      timeComplexityStatus: totalLoops >= 1 ? 'optimal' : 'suboptimal',
      timeComplexityAnalysis: taskId === 't6_1' || taskId === 't6_4'
        ? 'Traversing the car object array for tabular printing, maximum model search, and linear search runs in O(n) linear time.'
        : 'Filtering cars with model > 2000 and template array reversal both traverse n elements in O(n) linear time.',
    };
  }

  if (taskId === 't6_3') {
    const optimal = 'O(1)';
    return {
      submittedTimeComplexity: 'O(1)',
      optimalTimeComplexity: optimal,
      timeComplexityStatus: 'optimal',
      timeComplexityAnalysis: 'Direct arithmetic calculations inside Calculator member functions execute in O(1) constant time.',
    };
  }

  if (taskId === 't10_1') {
    const optimal = 'O(1)';
    return {
      submittedTimeComplexity: 'O(1)',
      optimalTimeComplexity: optimal,
      timeComplexityStatus: 'optimal',
      timeComplexityAnalysis: 'Head and tail pointer manipulations execute in O(1) constant time, while predecessor traversal for arbitrary node deletion runs in O(n).',
    };
  }

  if (taskId === 't10_2' || taskId === 't10_3' || taskId === 't10_5') {
    const optimal = 'O(n)';
    return {
      submittedTimeComplexity: totalLoops >= 1 ? 'O(n)' : 'O(1)',
      optimalTimeComplexity: optimal,
      timeComplexityStatus: totalLoops >= 1 ? 'optimal' : 'suboptimal',
      timeComplexityAnalysis: taskId === 't10_2'
        ? 'Traversing nodes for count, maximum value calculation, and zero filtering runs in O(n) linear time.'
        : taskId === 't10_3'
        ? 'Partitioning 15 nodes by parity into even and odd lists inspects each node once in O(n) linear time.'
        : 'Pairwise summing two 5-node linked lists concurrently traverses n elements in O(n) linear time.',
    };
  }

  if (taskId === 't10_4') {
    const optimal = 'O(n²)';
    return {
      submittedTimeComplexity: totalLoops >= 2 ? 'O(n²)' : (totalLoops === 1 ? 'O(n)' : 'O(1)'),
      optimalTimeComplexity: optimal,
      timeComplexityStatus: totalLoops >= 2 ? 'optimal' : 'suboptimal',
      timeComplexityAnalysis: 'In-place sorting of a singly linked list with nested loops performs n(n-1)/2 node comparisons: O(n²) time.',
    };
  }

  // Generic fallback
  const subComplexity = totalLoops === 0 ? 'O(1)' : totalLoops === 1 ? (hasHalving ? 'O(log n)' : 'O(n)') : `O(n^${totalLoops})`;
  return {
    submittedTimeComplexity: subComplexity,
    optimalTimeComplexity: 'O(1)',
    timeComplexityStatus: 'unknown',
    timeComplexityAnalysis: `Estimated complexity based on loop depth (${totalLoops} loop(s)).`,
  };
}

export function executeCppCode(code: string, taskId: string): ExecutionResult {
  const clean = stripComments(code);

  // 1. Basic syntax balance check
  const balanceError = checkSyntaxBalance(clean);
  if (balanceError) {
    return {
      success: false,
      isTaskGoalAchieved: false,
      syntaxError: balanceError,
      frames: [{ description: "Compilation Failed", array: [] }],
      stdout: balanceError,
      exitCode: 1,
      submittedTimeComplexity: 'N/A',
      optimalTimeComplexity: 'N/A',
      timeComplexityStatus: 'unknown',
      timeComplexityAnalysis: 'Compilation failed due to bracket syntax errors.',
    };
  }

  const complexity = analyzeComplexity(clean, taskId);

  let result: ExecutionResult;
  if (taskId === 't1_1') {
    result = simulateArrayFundamentals(code, clean);
  } else if (taskId === 't1_2') {
    result = simulateArrayTraversal(code, clean);
  } else if (taskId === 't1_3') {
    result = simulatePrintArray(code, clean);
  } else if (taskId === 't1_4') {
    result = simulateAddElement(code, clean);
  } else if (taskId === 't1_5') {
    result = simulateMultiArray(code, clean);
  } else if (taskId === 't1_6') {
    result = simulateSquareElement(code, clean);
  } else if (taskId === 't1_7') {
    result = simulateSubElement(code, clean);
  } else if (taskId === 't2_1') {
    result = simulateArrayTransformations(code, clean);
  } else if (taskId === 't2_2') {
    result = simulateArraySorting(code, clean);
  } else if (taskId === 't2_3') {
    result = simulateComprehensiveArrayLab(code, clean);
  } else if (taskId === 't3_1') {
    result = simulateLinearSearch(code, clean);
  } else if (taskId === 't3_2') {
    result = simulateBinarySearch(code, clean);
  } else if (taskId === 't3_3') {
    result = simulateBinarySearchWithRange(code, clean);
  } else if (taskId === 't3_4') {
    result = simulateBooleanBinarySearch(code, clean);
  } else if (taskId === 't3_5') {
    result = simulatePositionSearch(code, clean);
  } else if (taskId === 't3_6') {
    result = simulateAllPosition(code, clean);
  } else if (taskId === 't3_7') {
    result = simulateSearchValue(code, clean);
  } else if (taskId === 't3_8') {
    result = simulateGenericSearch(code, clean);
  } else if (taskId === 't3_9') {
    result = simulateBinarySearchIterRec(code, clean);
  } else if (taskId === 't3_10') {
    result = simulateLinearSearchUnsorted(code, clean);
  } else if (taskId === 't5_1') {
    result = simulateMatrixTranspose(code, clean);
  } else if (taskId === 't6_1') {
    result = simulateCarClass(code, clean);
  } else if (taskId === 't6_2') {
    result = simulateCarAssignment(code, clean);
  } else if (taskId === 't6_3') {
    result = simulateCalculatorClass(code, clean);
  } else if (taskId === 't6_4') {
    result = simulateCarInventorySystem(code, clean);
  } else if (taskId === 't7_1') {
    result = simulateStack(code, clean);
  } else if (taskId === 't7_2') {
    result = simulateStackTop(code, clean);
  } else if (taskId === 't7_3') {
    result = simulateStackFundamentals(code, clean);
  } else if (taskId === 't7_4') {
    result = simulatePalindromeStack(code, clean);
  } else if (taskId === 't7_5') {
    result = simulateDelimiterMatching(code, clean);
  } else if (taskId === 't7_6') {
    result = simulateTwoStackReversal(code, clean);
  } else if (taskId === 't7_7') {
    result = simulateInfixToPrefix(code, clean);
  } else if (taskId === 't7_8') {
    result = simulateSTLStackPalindrome(code, clean);
  } else if (taskId === 't7_9') {
    result = simulatePostfixEvaluation(code, clean);
  } else if (taskId === 't7_10') {
    result = simulateStackMenuOperations(code, clean);
  } else if (taskId === 't8_1') {
    result = simulateQueuePushPop(code, clean);
  } else if (taskId === 't8_2') {
    result = simulateSplitQueue(code, clean);
  } else if (taskId === 't9_1') {
    result = simulateCircularQueue(code, clean);
  } else if (taskId === 't9_2') {
    result = simulateReverseQueue(code, clean);
  } else if (taskId === 't9_3') {
    result = simulateCircularQueueSearch(code, clean);
  } else if (taskId === 't9_4') {
    result = simulateCircularQueueClass(code, clean);
  } else if (taskId === 't9_5') {
    result = simulateQueueReversalSTL(code, clean);
  } else if (taskId === 't10_1') {
    result = simulateSLLCore(code, clean);
  } else if (taskId === 't10_2') {
    result = simulateSLLFilterAndStats(code, clean);
  } else if (taskId === 't10_3') {
    result = simulateSLLSplitParity(code, clean);
  } else if (taskId === 't10_4') {
    result = simulateSLLSort(code, clean);
  } else if (taskId === 't10_5') {
    result = simulateSLLSumTwoLists(code, clean);
  } else {
    result = simulateGeneric(code, clean);
  }

  return {
    ...result,
    ...complexity,
  };
}

/**
 * Module 1: Array Fundamentals & Memory Management (t1_1)
 */
function simulateArrayFundamentals(rawCode: string, clean: string): ExecutionResult {
  const declMatch = clean.match(/(?:(?:static\s+)?int)\s+([a-zA-Z_]\w*)\s*\[\s*(\d+)\s*\]/);
  
  if (!declMatch) {
    return {
      success: false,
      isTaskGoalAchieved: false,
      syntaxError: "Missing array declaration! Please declare an integer array of size 5 (e.g. `int arr[5];`).",
      frames: [{ description: "No array declared", array: [] }],
      stdout: "Error: No array declared in main()",
      exitCode: 1,
    };
  }

  const arrayName = declMatch[1];
  const arraySize = parseInt(declMatch[2], 10);
  const memoryArray: (number | string | null)[] = Array(arraySize).fill(null);
  const frames: SimulationFrame[] = [];
  const stdoutLines: string[] = [];

  frames.push({
    description: `Allocated contiguous memory for '${arrayName}' with ${arraySize} integer slots (Size: ${arraySize * 4} bytes).`,
    array: [...memoryArray],
    highlightIndices: [],
    variables: { [`sizeof(${arrayName})`]: `${arraySize * 4} bytes`, length: arraySize },
  });

  const assignRegex = new RegExp(`${arrayName}\\s*\\[\\s*(\\d+)\\s*\\]\\s*=\\s*([^;]+);`, 'g');
  let match;
  const assignments: { index: number; value: number }[] = [];

  while ((match = assignRegex.exec(clean)) !== null) {
    const idx = parseInt(match[1], 10);
    const expr = match[2].trim();
    let val: number;
    try {
      val = Function(`'use strict'; return (${expr})`)();
    } catch {
      val = parseInt(expr, 10) || 0;
    }
    assignments.push({ index: idx, value: val });
  }

  for (const assign of assignments) {
    if (assign.index >= 0 && assign.index < arraySize) {
      memoryArray[assign.index] = assign.value;
      frames.push({
        description: `Executed: ${arrayName}[${assign.index}] = ${assign.value}; (Memory Offset: +${assign.index * 4} bytes)`,
        array: [...memoryArray],
        highlightIndices: [assign.index],
        variables: { [`${arrayName}[${assign.index}]`]: assign.value },
      });
    } else {
      frames.push({
        description: `Runtime Warning: Index [${assign.index}] out of bounds for array of size ${arraySize}!`,
        array: [...memoryArray],
        variables: { error: "IndexOutOfBounds" },
      });
      stdoutLines.push(`[Runtime Warning]: Segmentation fault / Index ${assign.index} out of bounds!`);
    }
  }

  const coutMatches = clean.matchAll(/cout\s*<<\s*([^;]+);/g);
  for (const cMatch of coutMatches) {
    const parts = cMatch[1].split('<<').map(p => p.trim());
    let lineOutput = '';
    for (const part of parts) {
      if (part === 'endl' || part === '"\\n"') {
        lineOutput += '\n';
      } else if (part.startsWith('"') && part.endsWith('"')) {
        lineOutput += part.slice(1, -1);
      } else {
        const arrAccess = part.match(new RegExp(`${arrayName}\\s*\\[\\s*(\\d+)\\s*\\]`));
        if (arrAccess) {
          const idx = parseInt(arrAccess[1], 10);
          lineOutput += memoryArray[idx] !== null ? String(memoryArray[idx]) : '0 (uninitialized garbage)';
        } else {
          lineOutput += part;
        }
      }
    }
    stdoutLines.push(lineOutput.trim());
    frames.push({
      description: `cout: ${lineOutput.trim()}`,
      array: [...memoryArray],
      variables: { stdout: lineOutput.trim() },
    });
  }

  const returnMatch = clean.match(/return\s+(\d+)\s*;/);
  const exitCode = returnMatch ? parseInt(returnMatch[1], 10) : 0;

  frames.push({
    description: `Process finished with return code ${exitCode}. Memory in valid state.`,
    array: [...memoryArray],
    variables: { [`Process Return`]: exitCode },
  });

  const isGoal = arraySize === 5 && memoryArray[0] === 10;
  let goalFeedback = "";
  if (isGoal) {
    goalFeedback = "Task goal achieved! Integer array of size 5 created and arr[0] initialized to 10.";
  } else {
    goalFeedback = `Code executed successfully with your custom values! Memory array updated.\n(Goal Note: To pass the specific exercise challenge, declare arr[5] and set arr[0] = 10).`;
  }

  const fullStdout = stdoutLines.length > 0 
    ? stdoutLines.join('\n') + `\n\nProcess returned ${exitCode} (0x${exitCode.toString(16).toUpperCase()})`
    : `[No stdout produced]\nProcess returned ${exitCode}`;

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback,
    frames,
    stdout: fullStdout,
    exitCode,
  };
}

/**
 * Task t1_2: Array Traversal & Accumulation
 */
function simulateArrayTraversal(rawCode: string, clean: string): ExecutionResult {
  const arr = [2, 4, 6, 8, 10];
  const frames: SimulationFrame[] = [];
  let sum = 0;

  const hasSumInLoop = /sum\s*(\+=|=.*?\+)\s*arr\s*\[\s*i\s*\]/.test(clean);

  frames.push({
    description: "Array initialized with 5 elements. sum initialized to 0.",
    array: [...arr],
    variables: { sum: 0 },
  });

  for (let i = 0; i < arr.length; i++) {
    if (hasSumInLoop) {
      sum += arr[i];
    }
    frames.push({
      description: `Step ${i + 1}: Loop at index i = ${i}. Visiting arr[${i}] = ${arr[i]}. Accumulator sum = ${sum}.`,
      array: [...arr],
      pointers: { i },
      highlightIndices: [i],
      variables: { i, "arr[i]": arr[i], sum },
    });
  }

  const isGoal = hasSumInLoop;
  const stdout = `Sum: ${sum}\n\nProcess returned 0 (0x0)`;

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Array traversal and summation completed successfully!"
      : "Traversal executed. Make sure to accumulate into `sum += arr[i];` inside the loop to finish the task.",
    frames,
    stdout,
    exitCode: 0,
  };
}

/**
 * Module 2: Array Operations & Sorting Algorithms Lab (t2_1)
 */
function simulateArrayTransformations(rawCode: string, clean: string): ExecutionResult {
  const hasAdd = /arra\[i\]\s*\+=\s*ele|arra\[i\]\s*=\s*arra\[i\]\s*\+\s*ele/.test(clean);
  const hasSub = /arra\[i\]\s*-=\s*ele|arra\[i\]\s*=\s*arra\[i\]\s*-\s*ele/.test(clean);
  const hasSquare = /arra\[i\]\s*\*=\s*arra\[i\]|arra\[i\]\s*=\s*arra\[i\]\s*\*\s*arra\[i\]/.test(clean);
  const hasMulti = /arra\[i\]\s*\*=\s*2|arra\[i\]\s*=\s*arra\[i\]\s*\*\s*2/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Initial Array: [1, 2, 3, 4, 5]",
      array: [1, 2, 3, 4, 5],
      variables: { size: 5, state: "Initial elements" }
    },
    {
      description: "addelement(arra, 3): Every element increased by 3 -> [4, 5, 6, 7, 8]",
      array: [4, 5, 6, 7, 8],
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { operation: "+= 3", state: "After addition" }
    },
    {
      description: "subelement(arra, 1): Every element decreased by 1 -> [3, 4, 5, 6, 7]",
      array: [3, 4, 5, 6, 7],
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { operation: "-= 1", state: "After subtraction" }
    },
    {
      description: "squareelement(arra): Every element squared (x*x) -> [9, 16, 25, 36, 49]",
      array: [9, 16, 25, 36, 49],
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { operation: "arra[i] *= arra[i]", state: "After squaring" }
    },
    {
      description: "multiarray(arra): Every element doubled -> [18, 32, 50, 72, 98]",
      array: [18, 32, 50, 72, 98],
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { operation: "arra[i] *= 2", state: "After multiplication" }
    }
  ];

  const isGoal = hasAdd && hasSub && hasSquare && hasMulti;

  const stdout = `Initial array:\n` +
    `the element 1 = 1\nthe element 2 = 2\nthe element 3 = 3\nthe element 4 = 4\nthe element 5 = 5\n\n` +
    `Add 3 to elements:\nthe element 1 = 4\nthe element 2 = 5\nthe element 3 = 6\nthe element 4 = 7\nthe element 5 = 8\n\n` +
    `Subtract 1 from elements:\nthe element 1 = 3\nthe element 2 = 4\nthe element 3 = 5\nthe element 4 = 6\nthe element 5 = 7\n\n` +
    `Square elements:\nthe element 1 = 9\nthe element 2 = 16\nthe element 3 = 25\nthe element 4 = 36\nthe element 5 = 49\n\n` +
    `Multiply elements by 2:\nthe element 1 = 18\nthe element 2 = 32\nthe element 3 = 50\nthe element 4 = 72\nthe element 5 = 98\n\n` +
    `Process returned 0 (0x0)`;

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Array transformations (addelement, subelement, squareelement, multiarray) executed successfully!"
      : "Complete all 4 transformation functions (addelement +=, subelement -=, squareelement *= arra[i], multiarray *= 2) to pass the task.",
    frames,
    stdout,
    exitCode: 0,
  };
}

/**
 * Module 2: Array Operations & Sorting Algorithms Lab (t2_2)
 */
function simulateArraySorting(rawCode: string, clean: string): ExecutionResult {
  const hasBubbleSwap = /temp\s*=\s*arra\[i\];\s*arra\[i\]\s*=\s*arra\[j\];\s*arra\[j\]\s*=\s*temp;/.test(clean);
  const hasSelectSwap = /temp\s*=\s*arra\[i\];\s*arra\[i\]\s*=\s*arra\[index\];\s*arra\[index\]\s*=\s*temp;/.test(clean);
  const hasBubble = /bubblesort/.test(clean);
  const hasSelect = /selectionsort/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Original Unsorted Array: [64, 25, 12, 22, 11]",
      array: [64, 25, 12, 22, 11],
      variables: { status: "Unsorted" }
    },
    {
      description: "Pass 1: Minimum element 11 placed at index 0 -> [11, 64, 25, 22, 12]",
      array: [11, 64, 25, 22, 12],
      pointers: { sorted: 0 },
      highlightIndices: [0],
      variables: { minFound: 11, sortedIndex: 0 }
    },
    {
      description: "Pass 2: Next minimum 12 placed at index 1 -> [11, 12, 64, 25, 22]",
      array: [11, 12, 64, 25, 22],
      pointers: { sorted: 1 },
      highlightIndices: [1],
      variables: { minFound: 12, sortedIndex: 1 }
    },
    {
      description: "Pass 3: Next minimum 22 placed at index 2 -> [11, 12, 22, 64, 25]",
      array: [11, 12, 22, 64, 25],
      pointers: { sorted: 2 },
      highlightIndices: [2],
      variables: { minFound: 22, sortedIndex: 2 }
    },
    {
      description: "Final Result: Array sorted in ascending order: [11, 12, 22, 25, 64]",
      array: [11, 12, 22, 25, 64],
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { status: "Sorted Ascending" }
    }
  ];

  const isGoal = hasBubble && hasSelect && (hasBubbleSwap || clean.includes("temp")) && (hasSelectSwap || clean.includes("index"));

  const stdout = `Original Array: [ 64 , 25 , 12 , 22 , 11 ]\n` +
    `After Bubble Sort: [ 11 , 12 , 22 , 25 , 64 ]\n` +
    `After Selection Sort: [ 11 , 12 , 22 , 25 , 64 ]\n\n` +
    `Process returned 0 (0x0)`;

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Bubble Sort and Selection Sort algorithms verified successfully!"
      : "Ensure both Bubble Sort (comparing arra[j] < arra[i]) and Selection Sort (finding index of minimum element) swap elements correctly.",
    frames,
    stdout,
    exitCode: 0,
  };
}

/**
 * Module 2: Array Operations & Sorting Algorithms Lab (t2_3 - Comprehensive arra.cpp)
 */
function simulateComprehensiveArrayLab(rawCode: string, clean: string): ExecutionResult {
  const hasAdd = /addelement/.test(clean);
  const hasSub = /subelement/.test(clean);
  const hasSquare = /squareelement/.test(clean);
  const hasMulti = /multiarray/.test(clean);
  const hasSimpleSearch = /simplesearch/.test(clean);
  const hasPosSearch = /positionsearch/.test(clean);
  const hasAllPos = /allposition/.test(clean);
  const hasBubble = /bubblesort/.test(clean);
  const hasSelect = /selectionsort/.test(clean);
  const hasBinary = /binarysearch/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Array Input & Initialization: [1, 2, 3, 4, 5]",
      array: [1, 2, 3, 4, 5],
      variables: { size: 5, state: "Initial elements" }
    },
    {
      description: "addelement(arra, 3): Elements become [4, 5, 6, 7, 8]",
      array: [4, 5, 6, 7, 8],
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { operation: "+= 3" }
    },
    {
      description: "subelement(arra, 1): Elements become [3, 4, 5, 6, 7]",
      array: [3, 4, 5, 6, 7],
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { operation: "-= 1" }
    },
    {
      description: "squareelement(arra): Elements squared -> [9, 16, 25, 36, 49]",
      array: [9, 16, 25, 36, 49],
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { operation: "arra[i] * arra[i]" }
    },
    {
      description: "multiarray(arra): Elements doubled -> [18, 32, 50, 72, 98]",
      array: [18, 32, 50, 72, 98],
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { operation: "*= 2" }
    },
    {
      description: "simplesearch(arra, 50) & positionsearch(arra, 50): Found at index 2 (x = true)",
      array: [18, 32, 50, 72, 98],
      pointers: { targetIndex: 2 },
      highlightIndices: [2],
      variables: { target: 50, position: 2, found: "true" }
    },
    {
      description: "bubblesort / selectionsort: Array verified in ascending sorted order [18, 32, 50, 72, 98]",
      array: [18, 32, 50, 72, 98],
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { sorted: "true" }
    },
    {
      description: "binarysearch(arra, 72): l=0, r=4, mid=2 (50 < 72 -> l=3). mid=3 (72 == 72 -> return 3)!",
      array: [18, 32, 50, 72, 98],
      pointers: { l: 3, r: 4, mid: 3 },
      highlightIndices: [3],
      variables: { target: 72, returnIndex: 3 }
    }
  ];

  const isGoal = hasAdd && hasSub && hasSquare && hasMulti && hasSimpleSearch && hasPosSearch && hasAllPos && (hasBubble || hasSelect) && hasBinary;

  const stdout = `print the elements of array\n ` +
    `the element 1 = 1\nthe element 2 = 2\nthe element 3 = 3\nthe element 4 = 4\nthe element 5 = 5\n` +
    `please add number 3 to the elements of array\n` +
    `print the elements of array after the operation\n` +
    `the element 1 = 4\nthe element 2 = 5\nthe element 3 = 6\nthe element 4 = 7\nthe element 5 = 8\n` +
    `please subtract number 1 from the elements of array\n` +
    `print the elements of array after the operation\n` +
    `the element 1 = 3\nthe element 2 = 4\nthe element 3 = 5\nthe element 4 = 6\nthe element 5 = 7\n` +
    `please square the elements of array\n` +
    `print the elements of array after the operation\n` +
    `the element 1 = 9\nthe element 2 = 16\nthe element 3 = 25\nthe element 4 = 36\nthe element 5 = 49\n` +
    `please multiply the elements of array\n` +
    `print the elements of array after the operation\n` +
    `the element 1 = 18\nthe element 2 = 32\nthe element 3 = 50\nthe element 4 = 72\nthe element 5 = 98\n` +
    `search for number: 50\nthe number 50 is found\n` +
    `the number 50 is found in position 2\n` +
    `the positions of number:50  are : 2  \n\n` +
    `the array after sorting : [ 18 , 32 , 50 , 72 , 98 ]\n\n` +
    `binary search for number: 72\n` +
    `the number 72 is found in position 3\n\n` +
    `Process returned 0 (0x0)`;

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Comprehensive Array Lab Suite compiled and executed successfully across all transformation, searching, sorting, and binary search modules!"
      : "Ensure all lab methods (transformations, searches, sorting, and binary search) are declared and implemented.",
    frames,
    stdout,
    exitCode: 0,
  };
}

/**
 * Task t3_1: Linear Search
 */
function simulateLinearSearch(rawCode: string, clean: string): ExecutionResult {
  const arr = [15, 8, 42, 4, 16];
  const target = 42;
  const frames: SimulationFrame[] = [];
  let foundIdx = -1;

  const hasReturnI = /if\s*\([^)]*arr\[i\]\s*==\s*target[^)]*\)\s*(?:\{\s*)?return\s+i\s*;/.test(clean);

  frames.push({
    description: `Linear Search: Looking for target ${target} sequentially in array of 5 elements.`,
    array: [...arr],
    variables: { target },
  });

  for (let i = 0; i < arr.length; i++) {
    const isTarget = arr[i] === target;
    frames.push({
      description: `Index [${i}]: arr[${i}] = ${arr[i]}. ${isTarget ? 'Match found!' : 'Does not match target.'}`,
      array: [...arr],
      pointers: { i },
      highlightIndices: [i],
      variables: { i, "arr[i]": arr[i], target, match: String(isTarget) },
    });
    if (isTarget) {
      foundIdx = i;
      break;
    }
  }

  const isGoal = hasReturnI;
  const stdout = `Result index: ${hasReturnI ? foundIdx : -1}\n\nProcess returned 0 (0x0)`;

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Linear Search successfully checked elements and returned target index 2!"
      : "Linear search loop executed. Make sure to `return i;` when `arr[i] == target`.",
    frames,
    stdout,
    exitCode: 0,
  };
}

/**
 * Module 3: Searching Algorithms (t3_2)
 */
function simulateBinarySearch(rawCode: string, clean: string): ExecutionResult {
  let arr: number[] = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const arrMatch = clean.match(/int\s+arr(?:\[\d*\])?\s*=\s*\{([^}]+)\}/);
  if (arrMatch) {
    arr = arrMatch[1].split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
  }

  let target = 7;
  const targetMatch = clean.match(/binarysearch\s*\(\s*arr\s*,\s*(\d+)\s*\)/);
  if (targetMatch) {
    target = parseInt(targetMatch[1], 10);
  }

  const hasMidCalc = /mid\s*=\s*[^;]+2\s*;/.test(clean);
  const hasHalveRight = /l\s*=\s*mid\s*\+\s*1\s*;/.test(clean);
  const hasHalveLeft = /r\s*=\s*mid\s*-\s*1\s*;/.test(clean);

  if (!hasMidCalc) {
    return {
      success: false,
      isTaskGoalAchieved: false,
      syntaxError: "Missing mid calculation: Inside the while loop, calculate `mid = l + (r - l) / 2;` or `mid = (l + r) / 2;`.",
      frames: [{ description: "Error in binarysearch()", array: arr }],
      stdout: "Error: `mid` was not computed in binarysearch()",
      exitCode: 1,
    };
  }

  const frames: SimulationFrame[] = [];
  let l = 0;
  let r = arr.length - 1;
  let foundIdx = -1;
  let step = 1;

  frames.push({
    description: `Initial State: Searching for Target (${target}) in sorted array of size ${arr.length}.`,
    array: [...arr],
    pointers: { l, r },
    variables: { target, l, r },
  });

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    frames.push({
      description: `Step ${step}: Calculated mid = (${l} + ${r}) / 2 = ${mid}. arr[${mid}] = ${arr[mid]}.`,
      array: [...arr],
      pointers: { l, r, mid },
      highlightIndices: [mid],
      variables: { target, l, r, mid, [`arr[${mid}]`]: arr[mid] },
    });

    if (arr[mid] === target) {
      foundIdx = mid;
      frames.push({
        description: `Target (${target}) == arr[mid] (${arr[mid]})! Element found at index ${mid}.`,
        array: [...arr],
        pointers: { l, r, mid },
        highlightIndices: [mid],
        variables: { target, foundIndex: mid, return: mid },
      });
      break;
    } else if (arr[mid] < target) {
      l = mid + 1;
      frames.push({
        description: `Target (${target}) > arr[${mid}] (${arr[mid]}). Halving search to right half: l = mid + 1 (${l}).`,
        array: [...arr],
        pointers: { l, r },
        variables: { target, l, r },
      });
    } else {
      r = mid - 1;
      frames.push({
        description: `Target (${target}) < arr[${mid}] (${arr[mid]}). Halving search to left half: r = mid - 1 (${r}).`,
        array: [...arr],
        pointers: { l, r },
        variables: { target, l, r },
      });
    }
    step++;
  }

  if (foundIdx === -1) {
    frames.push({
      description: `Target (${target}) not found in array. binarysearch() returns -1.`,
      array: [...arr],
      variables: { target, return: -1 },
    });
  }

  const isGoal = hasMidCalc && hasHalveRight && hasHalveLeft;
  const stdout = `Searching for ${target} in array...\nResult Index: ${foundIdx}\n\nProcess returned 0 (0x0)`;

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Binary Search logic implemented perfectly! Halving conditions verified."
      : "Binary Search ran, but make sure range halving logic (l = mid + 1 and r = mid - 1) is complete to pass the exercise.",
    frames,
    stdout,
    exitCode: 0,
  };
}

/**
 * Module 6: OOP & Object Arrays — Lab 1 (t6_1)
 */
function simulateCarClass(rawCode: string, clean: string): ExecutionResult {
  const hasModel = /int\s+model\s*;/.test(clean);
  const hasPrice = /float\s+price\s*;/.test(clean);
  const hasMotor = /string\s+motor_size\s*;/.test(clean);
  const hasSearch = /search\s*\(\s*string\s+n\s*\)/.test(clean);
  const hasSearchReturn = /return\s*\(?\s*name\s*==\s*n\s*\)?\s*;|return\s+(true|1)/.test(clean);
  const hasNameThree = /name_three\s*\(\s*\)/.test(clean);
  const hasStrlen = /strlen\s*\(\s*name\s*\)\s*>\s*3/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Class `car` defined with contiguous attributes: name[20], model, price, motor_size. 3 instances allocated.",
      array: ["Corolla (2018)", "BMW (2022)", "Camry (2020)"],
      variables: {
        size: 3,
        "c[0]": "Corolla, 2018, $15000, 4v",
        "c[1]": "BMW, 2022, $45000, 6v",
        "c[2]": "Camry, 2020, $22000, 4v"
      }
    },
    {
      description: "Finding most modern car: Comparing models [2018, 2022, 2020]. Maximum model is 2022 at index 1 (BMW).",
      array: ["Corolla (2018)", "BMW (2022)", "Camry (2020)"],
      pointers: { modernCar: 1 },
      highlightIndices: [1],
      variables: { mostModern: "BMW", modelYear: 2022, index: 1 }
    },
    {
      description: "Linear Search: Searching for car name 'BMW'. Compared index 0 ('Corolla' != 'BMW'), matched at index 1 ('BMW' == 'BMW')!",
      array: ["Corolla (2018)", "BMW (2022)", "Camry (2020)"],
      pointers: { matchIndex: 1 },
      highlightIndices: [1],
      variables: { searchTarget: "BMW", status: "Found at index [1]" }
    },
    {
      description: "Name Length Filter: Checking strlen(name) > 3. 'Corolla' (7 > 3: Print), 'BMW' (3 > 3: No, Skip), 'Camry' (5 > 3: Print).",
      array: ["Corolla (7 chars)", "BMW (3 chars)", "Camry (5 chars)"],
      highlightIndices: [0, 2],
      variables: { "Corolla (7)": "Displayed", "BMW (3)": "Excluded", "Camry (5)": "Displayed" }
    }
  ];

  const isGoal = hasSearch && (hasSearchReturn || clean.includes("==")) && (hasNameThree && hasStrlen);

  const stdout = `information about the car in records\n\n` +
    `name      model     price     motor     \n\n` +
    `Corolla   2018      15000     4v        \n` +
    `BMW       2022      45000     6v        \n` +
    `Camry     2020      22000     4v        \n\n` +
    `the modern car is : \n` +
    `BMW       2022      45000     6v        \n\n` +
    `please enter name to search: BMW\n` +
    `this car found into index [1]\n\n` +
    `information about the car which have more than 3 char\n\n` +
    `Corolla   2018      15000     4v        \n` +
    `Camry     2020      22000     4v        \n\n\n` +
    `\t\t\t^_^ GOOD LUCK MY STUDENTS ^_^ \n\n` +
    `Process returned 0 (0x0)`;

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Class `car`, records display, modern car search, and name filtering (> 3 chars) implemented correctly!"
      : "Complete both `search(string n)` returning (name == n) and `name_three()` checking strlen(name) > 3 to pass the exercise.",
    frames,
    stdout,
    exitCode: 0,
  };
}

/**
 * Module 6: OOP & Object Arrays — Lab 1 Assignment (t6_2)
 */
function simulateCarAssignment(rawCode: string, clean: string): ExecutionResult {
  const hasTemplate = /template\s*<\s*(?:typename|class)\s+T\s*>/.test(clean);
  const hasReverseFunc = /reverseArray\s*\(/.test(clean);
  const hasReverseLogic = /dest\[i\]\s*=\s*src\[n\s*-\s*1\s*-\s*i\]|dest\[n\s*-\s*1\s*-\s*i\]\s*=\s*src\[i\]/.test(clean);
  const hasModelCheck = /2000/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Initial Car Array: [Sunny (1998), Corolla (2019), Prado (2023)].",
      array: ["Sunny (1998)", "Corolla (2019)", "Prado (2023)"],
      variables: { size: 3, "c[0]": "Sunny (1998)", "c[1]": "Corolla (2019)", "c[2]": "Prado (2023)" }
    },
    {
      description: "Filter Model > 2000: Sunny (1998 <= 2000: Skip), Corolla (2019 > 2000: Match), Prado (2023 > 2000: Match).",
      array: ["Sunny (1998)", "Corolla (2019)", "Prado (2023)"],
      highlightIndices: [1, 2],
      variables: { filteredMatches: "Corolla (2019), Prado (2023)" }
    },
    {
      description: "Template Reversal Step 1: dest[0] = src[2] -> 'Prado' copied to new array index 0.",
      array: ["Prado (2023)", null, null],
      pointers: { dest: 0, src: 2 },
      highlightIndices: [0],
      variables: { copied: "src[2] -> dest[0]" }
    },
    {
      description: "Template Reversal Step 2: dest[1] = src[1] -> 'Corolla' copied to new array index 1.",
      array: ["Prado (2023)", "Corolla (2019)", null],
      pointers: { dest: 1, src: 1 },
      highlightIndices: [1],
      variables: { copied: "src[1] -> dest[1]" }
    },
    {
      description: "Template Reversal Complete: dest[2] = src[0] -> 'Sunny' copied. Reversed array: [Prado, Corolla, Sunny].",
      array: ["Prado (2023)", "Corolla (2019)", "Sunny (1998)"],
      pointers: { dest: 2, src: 0 },
      highlightIndices: [0, 1, 2],
      variables: { reversalStatus: "Complete", genericType: "T = car" }
    }
  ];

  const isGoal = hasTemplate && hasReverseFunc && (hasReverseLogic || clean.includes("dest")) && hasModelCheck;

  const stdout = `Cars with model > 2000:\n` +
    `Corolla   2019      18000     2.0L      \n` +
    `Prado     2023      65000     4.0L      \n\n` +
    `Original Cars Before Reversal:\n` +
    `Sunny     1998      4000      1.6L      \n` +
    `Corolla   2019      18000     2.0L      \n` +
    `Prado     2023      65000     4.0L      \n\n` +
    `New Array After Reversal:\n` +
    `Prado     2023      65000     4.0L      \n` +
    `Corolla   2019      18000     2.0L      \n` +
    `Sunny     1998      4000      1.6L      \n\n` +
    `Process returned 0 (0x0)`;

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "C++ template array reversal and model > 2000 filtering executed accurately!"
      : "Ensure your `template<typename T> void reverseArray(...)` copies elements from `src[n - 1 - i]` into `dest[i]` to pass the exercise.",
    frames,
    stdout,
    exitCode: 0,
  };
}

/**
 * Module 6: OOP & Object Arrays — Calculator Class (t6_3)
 */
function simulateCalculatorClass(rawCode: string, clean: string): ExecutionResult {
  const hasSum = /s\s*=\s*x\s*\+\s*y/.test(clean);
  const hasSub = /s\s*=\s*x\s*-\s*y/.test(clean);
  const hasMult = /s\s*=\s*x\s*\*\s*y/.test(clean);
  const hasDiv = /s\s*=\s*.*?x\s*\/\s*y/.test(clean);
  const hasGet = /return\s+s\s*;/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Calculator object initialized in memory: x = 10, y = 4, s = 0.0 (private encapsulation).",
      array: [10, 4, 0.0],
      variables: { x: 10, y: 4, s: "0.0", object: "calc" }
    },
    {
      description: "calc.sum(): 10 + 4 = 14. Member variable s updated to 14.0.",
      array: [10, 4, 14.0],
      highlightIndices: [2],
      variables: { operation: "10 + 4", result: "14.0" }
    },
    {
      description: "calc.sub(): 10 - 4 = 6. Member variable s updated to 6.0.",
      array: [10, 4, 6.0],
      highlightIndices: [2],
      variables: { operation: "10 - 4", result: "6.0" }
    },
    {
      description: "calc.mult(): 10 * 4 = 40. Member variable s updated to 40.0.",
      array: [10, 4, 40.0],
      highlightIndices: [2],
      variables: { operation: "10 * 4", result: "40.0" }
    },
    {
      description: "calc.div(): 10 / 4 = 2.5. Member variable s updated to 2.5.",
      array: [10, 4, 2.5],
      highlightIndices: [2],
      variables: { operation: "10 / 4", result: "2.5" }
    }
  ];

  const isGoal = hasSum && hasSub && hasMult && hasDiv && hasGet;

  const stdout = `the sum is 14\n` +
    `the sub is 6\n` +
    `the multi is 40\n` +
    `the div is 2.5\n\n` +
    `Process returned 0 (0x0)`;

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Calculator class arithmetic methods (sum, sub, mult, div) and encapsulation verified successfully!"
      : "Make sure all arithmetic operations assign into `s` (sum: x+y, sub: x-y, mult: x*y, div: (float)x/y) and `get()` returns `s`.",
    frames,
    stdout,
    exitCode: 0,
  };
}

/**
 * Module 7: The Stack Data Structure (t7_1)
 */
function simulateStack(rawCode: string, clean: string): ExecutionResult {
  let size = 5;
  const sizeMatch = clean.match(/#define\s+size\s+(\d+)/);
  if (sizeMatch) size = parseInt(sizeMatch[1], 10);

  const hasPushOverflow = /stackTop\s*<\s*size\s*-\s*1|stackTop\s*\+=\s*1\s*<\s*size/i.test(clean);
  const hasPushAssign = /list\s*\[\s*stackTop\s*\]\s*=\s*data/i.test(clean);
  const hasPopUnderflow = /stackTop\s*>=\s*0|stackTop\s*>\s*-1/i.test(clean);
  const hasPopAssign = /list\s*\[\s*stackTop\s*\]/i.test(clean);

  const stackArray: (number | string | null)[] = Array(size).fill(null);
  const frames: SimulationFrame[] = [];

  frames.push({
    description: `Stack initialized: stackTop = -1. Capacity = ${size}. Empty array.`,
    array: [...stackArray],
    pointers: { stackTop: -1 },
    variables: { stackTop: -1, capacity: size, status: "Empty" },
  });

  stackArray[0] = 10;
  frames.push({
    description: "Push(10): Overflow check passed (stackTop < size - 1). Incremented stackTop to 0 and stored 10.",
    array: [...stackArray],
    pointers: { stackTop: 0 },
    highlightIndices: [0],
    variables: { stackTop: 0, "list[0]": 10 },
  });

  stackArray[1] = 20;
  frames.push({
    description: "Push(20): Overflow check passed. Incremented stackTop to 1 and stored 20.",
    array: [...stackArray],
    pointers: { stackTop: 1 },
    highlightIndices: [1],
    variables: { stackTop: 1, "list[1]": 20 },
  });

  frames.push({
    description: "Pop(): Underflow check passed (stackTop >= 0). Retrieved 20 from list[stackTop] and decremented stackTop to 0.",
    array: [...stackArray],
    pointers: { stackTop: 0 },
    highlightIndices: [1],
    variables: { stackTop: 0, poppedValue: 20, return: 20 },
  });

  const isGoal = (hasPushOverflow || hasPushAssign) && (hasPopUnderflow || hasPopAssign);

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal 
      ? "Stack Push (with overflow check) and Pop (with underflow check) implemented correctly!"
      : "Stack simulator updated! Make sure your Push overflow and Pop underflow checks are complete to pass the exercise.",
    frames,
    stdout: `Push(10) -> Success (stackTop = 0)\nPush(20) -> Success (stackTop = 1)\nPop() -> Returned 20 (stackTop = 0)\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task t7_2: Stack Peek & isEmpty
 */
function simulateStackTop(rawCode: string, clean: string): ExecutionResult {
  const hasIsEmpty = /stackTop\s*==\s*-1/.test(clean);
  const hasTopReturn = /list\s*\[\s*stackTop\s*\]/.test(clean);

  const stackArray: (number | string | null)[] = [5, 12, 18, null, null];
  const frames: SimulationFrame[] = [
    {
      description: "Stack currently contains elements [5, 12, 18] with stackTop at index 2.",
      array: [...stackArray],
      pointers: { stackTop: 2 },
      highlightIndices: [2],
      variables: { stackTop: 2, capacity: 5 },
    },
    {
      description: "Calling isEmpty(): checks if (stackTop == -1). Evaluates to false.",
      array: [...stackArray],
      pointers: { stackTop: 2 },
      variables: { isEmpty: "false", stackTop: 2 },
    },
    {
      description: "Calling Top(): accesses list[stackTop] -> returns 18 without modifying stackTop.",
      array: [...stackArray],
      pointers: { stackTop: 2 },
      highlightIndices: [2],
      variables: { TopValue: 18, stackTop: 2 },
    }
  ];

  const isGoal = hasIsEmpty && hasTopReturn;

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Stack isEmpty() and Top() methods implemented correctly!"
      : "Ensure isEmpty() returns `stackTop == -1` and Top() returns `list[stackTop]`.",
    frames,
    stdout: `isEmpty() -> false\nTop() -> 18 (stackTop remains 2)\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task t8_1: Static Queue: Push & Pop
 */
function simulateQueuePushPop(rawCode: string, clean: string): ExecutionResult {
  const hasIsFull = /rear\s*==\s*size\s*-\s*1/i.test(clean);
  const hasIsEmpty = /front\s*==\s*-1/i.test(clean);
  const hasInsertion = /rear\+\+|a\s*\[\s*(?:\+\+rear|rear)\s*\]/i.test(clean);
  const hasDeletion = /a\s*\[\s*front\s*\]/i.test(clean) && (/front\+\+|front\s*=\s*rear/i.test(clean));

  const isGoal = (hasIsFull || hasIsEmpty) && (hasInsertion || hasDeletion);

  const frames: SimulationFrame[] = [
    {
      description: "Queue initialized: front = -1, rear = -1. Capacity = 5.",
      array: [null, null, null, null, null],
      pointers: {},
      variables: { front: -1, rear: -1, status: "Empty" },
    },
    {
      description: "insertion('A'): front set to 0, rear incremented to 0. a[0] = 'A'.",
      array: ['A', null, null, null, null],
      pointers: { front: 0, rear: 0 },
      highlightIndices: [0],
      variables: { front: 0, rear: 0, "a[0]": "'A'" },
    },
    {
      description: "insertion('B'): rear incremented to 1. a[1] = 'B'.",
      array: ['A', 'B', null, null, null],
      pointers: { front: 0, rear: 1 },
      highlightIndices: [1],
      variables: { front: 0, rear: 1, "a[1]": "'B'" },
    },
    {
      description: "insertion('C'): rear incremented to 2. a[2] = 'C'.",
      array: ['A', 'B', 'C', null, null],
      pointers: { front: 0, rear: 2 },
      highlightIndices: [2],
      variables: { front: 0, rear: 2, "a[2]": "'C'" },
    },
    {
      description: "deletion(): Dequeued 'A' from front. front incremented to index 1.",
      array: ['A', 'B', 'C', null, null],
      pointers: { front: 1, rear: 2 },
      highlightIndices: [0],
      variables: { front: 1, rear: 2, deletedItem: "'A'" },
    },
    {
      description: "firstel(): Front of queue points to index 1 containing 'B'.",
      array: ['A', 'B', 'C', null, null],
      pointers: { front: 1, rear: 2 },
      highlightIndices: [1],
      variables: { frontValue: "'B'", front: 1, rear: 2 },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Static Queue insertion, deletion, and pointer boundary checks implemented successfully!"
      : "Complete the `insertion()` and `deletion()` methods with proper isfull and isempty checks.",
    frames,
    stdout: `insertion('A') -> front: 0, rear: 0\ninsertion('B') -> front: 0, rear: 1\ninsertion('C') -> front: 0, rear: 2\nDeleted: A\nFirst element: B\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task t8_2: Split Queue into Two Halves
 */
function simulateSplitQueue(rawCode: string, clean: string): ExecutionResult {
  const hasHalf = /elements\(\)\s*\/\s*2|half/i.test(clean);
  const hasWhile = /while\s*\(\s*!q\.is(?:empty|Empty)\(\)\s*\)/i.test(clean);
  const hasSplitInsert = /q1\.(?:insertion|insearion).*?q2\.(?:insertion|insearion)/is.test(clean);

  const isGoal = hasHalf && (hasWhile || hasSplitInsert);

  const frames: SimulationFrame[] = [
    {
      description: "Source queue q with 4 elements: ['A', 'B', 'C', 'D']. half = 4 / 2 = 2.",
      array: ['A', 'B', 'C', 'D', null],
      pointers: { front: 0, rear: 3 },
      variables: { count: 4, half: 2, c: 0 },
    },
    {
      description: "c = 0 (< half): Dequeued 'A' from q, inserted into sub-queue q1.",
      array: ['A', 'B', 'C', 'D', null],
      pointers: { front: 1 },
      highlightIndices: [0],
      variables: { c: 0, half: 2, item: "'A'", destination: "q1" },
    },
    {
      description: "c = 1 (< half): Dequeued 'B' from q, inserted into sub-queue q1.",
      array: ['A', 'B', 'C', 'D', null],
      pointers: { front: 2 },
      highlightIndices: [1],
      variables: { c: 1, half: 2, item: "'B'", destination: "q1" },
    },
    {
      description: "c = 2 (>= half): Dequeued 'C' from q, inserted into sub-queue q2.",
      array: ['A', 'B', 'C', 'D', null],
      pointers: { front: 3 },
      highlightIndices: [2],
      variables: { c: 2, half: 2, item: "'C'", destination: "q2" },
    },
    {
      description: "c = 3 (>= half): Dequeued 'D' from q, inserted into sub-queue q2.",
      array: ['A', 'B', 'C', 'D', null],
      pointers: { front: 3 },
      highlightIndices: [3],
      variables: { c: 3, half: 2, item: "'D'", destination: "q2" },
    },
    {
      description: "Split Complete: q1 has ['A', 'B'], q2 has ['C', 'D'].",
      array: ['A', 'B', 'C', 'D', null],
      variables: { "q1 contents": "A    B", "q2 contents": "C    D", status: "Split Successful" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Queue successfully split into two balanced sub-queues (q1 and q2)!"
      : "Calculate half = q.elements() / 2 and transfer items into q1 and q2 inside a while(!q.isempty()) loop.",
    frames,
    stdout: `Original Queue elements: A    B    C    D\nthe first queue : A    B\nthe second queue: C    D\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task t9_1: Circular Queue: Modulo Wrap-Around
 */
function simulateCircularQueue(rawCode: string, clean: string): ExecutionResult {
  const hasFullCheck = /\(rear\s*\+\s*1\)\s*%\s*size\s*==\s*front/i.test(clean);
  const hasRearWrap = /rear\s*=\s*\(rear\s*\+\s*1\)\s*%\s*size/i.test(clean);
  const hasFrontWrap = /front\s*=\s*\(front\s*\+\s*1\)\s*%\s*size/i.test(clean);

  const isGoal = (hasFullCheck || hasRearWrap) && hasFrontWrap;

  const frames: SimulationFrame[] = [
    {
      description: "Circular Queue initialized: front = -1, rear = -1. Size = 5.",
      array: [null, null, null, null, null],
      pointers: {},
      variables: { front: -1, rear: -1, capacity: 5 },
    },
    {
      description: "insert(10), insert(20), insert(30): front = 0, rear = 2.",
      array: [10, 20, 30, null, null],
      pointers: { front: 0, rear: 2 },
      highlightIndices: [0, 1, 2],
      variables: { front: 0, rear: 2 },
    },
    {
      description: "del(): Dequeued 10 from index 0. front wrapped to index (0 + 1) % 5 = 1.",
      array: [10, 20, 30, null, null],
      pointers: { front: 1, rear: 2 },
      highlightIndices: [0],
      variables: { deleted: 10, front: 1, rear: 2 },
    },
    {
      description: "insert(40), insert(50): rear reaches end index 4.",
      array: [10, 20, 30, 40, 50],
      pointers: { front: 1, rear: 4 },
      highlightIndices: [3, 4],
      variables: { front: 1, rear: 4 },
    },
    {
      description: "insert(60): Modulo wrap-around! rear = (4 + 1) % 5 = 0. Reuses free index 0!",
      array: [60, 20, 30, 40, 50],
      pointers: { front: 1, rear: 0 },
      highlightIndices: [0],
      variables: { wrappedRear: 0, front: 1, item: 60, status: "False overflow eliminated!" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Circular Queue implemented with modulo wrap-around logic!"
      : "Ensure (rear + 1) % size == front is used for full check and front/rear update with (x + 1) % size.",
    frames,
    stdout: `insert(10) -> front: 0, rear: 0\ninsert(20) -> front: 0, rear: 1\ninsert(30) -> front: 0, rear: 2\nElement deleted: 10 (front moved to 1)\ninsert(40) -> rear: 3\ninsert(50) -> rear: 4\ninsert(60) -> Circular wrap-around! rear: 0\nFront item: 20\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task t9_2: Reverse a Queue Using a Stack
 */
function simulateReverseQueue(rawCode: string, clean: string): ExecutionResult {
  const hasQueueToStack = /s\.push\s*\(\s*q\.delet/i.test(clean);
  const hasStackToQueue = /q\.insert.*s\.top\(\)/is.test(clean) || (/s\.top\(\)/i.test(clean) && /s\.pop\(\)/i.test(clean));

  const isGoal = hasQueueToStack && hasStackToQueue;

  const frames: SimulationFrame[] = [
    {
      description: "Initial Queue: ['A', 'B', 'C', 'D']. front = 0, rear = 3.",
      array: ['A', 'B', 'C', 'D', null],
      pointers: { front: 0, rear: 3 },
      variables: { step: "1. Initial FIFO Queue" },
    },
    {
      description: "Step 1: Dequeued all items and pushed onto Stack. Stack Top is 'D', Bottom is 'A'.",
      array: [null, null, null, null, null],
      variables: { stackTop: "'D'", "stack items": "D, C, B, A", queue: "Empty" },
    },
    {
      description: "Step 2a: Popped 'D' from Stack -> enqueued into Queue at a[0].",
      array: ['D', null, null, null, null],
      pointers: { front: 0, rear: 0 },
      highlightIndices: [0],
      variables: { popped: "'D'", front: 0, rear: 0 },
    },
    {
      description: "Step 2b: Popped 'C' from Stack -> enqueued into Queue at a[1].",
      array: ['D', 'C', null, null, null],
      pointers: { front: 0, rear: 1 },
      highlightIndices: [1],
      variables: { popped: "'C'", front: 0, rear: 1 },
    },
    {
      description: "Step 2c: Popped 'B' from Stack -> enqueued into Queue at a[2].",
      array: ['D', 'C', 'B', null, null],
      pointers: { front: 0, rear: 2 },
      highlightIndices: [2],
      variables: { popped: "'B'", front: 0, rear: 2 },
    },
    {
      description: "Step 2d: Popped 'A' from Stack -> enqueued into Queue at a[3].",
      array: ['D', 'C', 'B', 'A', null],
      pointers: { front: 0, rear: 3 },
      highlightIndices: [3],
      variables: { popped: "'A'", front: 0, rear: 3 },
    },
    {
      description: "Queue Reversal Complete: Original ['A','B','C','D'] is now ['D','C','B','A']!",
      array: ['D', 'C', 'B', 'A', null],
      pointers: { front: 0, rear: 3 },
      variables: { result: "Reversed Successfully via Stack LIFO" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Queue reversed successfully using an auxiliary LIFO stack!"
      : "Step 1: Dequeue each element into stack (`s.push(q.deletion())`). Step 2: Pop from stack back into queue (`q.insertion(s.top()); s.pop();`).",
    frames,
    stdout: `Initial Queue: A B C D\nTransferring to Stack (LIFO)...\nPopping from Stack back into Queue...\nReversed Queue: D C B A\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task t9_3: Search in a Circular Queue
 */
function simulateCircularQueueSearch(rawCode: string, clean: string): ExecutionResult {
  const hasModuloLoop = /\(i\s*\+\s*1\)\s*%\s*size/i.test(clean);
  const hasTargetComparison = /==\s*target/i.test(clean);

  const isGoal = hasModuloLoop && hasTargetComparison;

  const frames: SimulationFrame[] = [
    {
      description: "Circular Queue with elements [10, 20, 30]. Searching for target = 20.",
      array: [10, 20, 30, null, null],
      pointers: { front: 0, rear: 2 },
      variables: { target: 20, front: 0, rear: 2 },
    },
    {
      description: "Step 1: Inspect index i = 0 (cqueue_arr[0] = 10 != 20). Next index = (0 + 1) % 5 = 1.",
      array: [10, 20, 30, null, null],
      pointers: { i: 0 },
      highlightIndices: [0],
      variables: { i: 0, "cqueue_arr[i]": 10, match: "false" },
    },
    {
      description: "Step 2: Inspect index i = 1 (cqueue_arr[1] = 20 == 20). Target found!",
      array: [10, 20, 30, null, null],
      pointers: { i: 1 },
      highlightIndices: [1],
      variables: { i: 1, "cqueue_arr[i]": 20, match: "true", returnIndex: 1 },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Circular Queue search algorithm correctly locates target element using modulo traversal!"
      : "Traverse from front to rear using `i = (i + 1) % size`, check `cqueue_arr[i] == target`, and return index if matched.",
    frames,
    stdout: `Circular Queue: [10, 20, 30] (front = 0, rear = 2)\nSearching for target value: 20\nInspecting index [0]: 10 != 20\nInspecting index [1]: 20 == 20 (Found!)\nIndex of 20: 1\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Module 10 Task 1: Singly Linked List Core Operations (Lab 8 Q1)
 */
function simulateSLLCore(rawCode: string, clean: string): ExecutionResult {
  const hasAddToHead = /addToHead\s*\([^)]*\)\s*\{[\s\S]*?(?:head\s*=\s*new|new\s+IntSLLNode\s*\(el)/.test(clean);
  const hasAddToTail = /addToTail\s*\([^)]*\)\s*\{[\s\S]*?(?:tail->next\s*=\s*new|tail\s*=\s*new|head\s*=\s*tail)/.test(clean);
  const hasDeleteHead = /deleteFromHead\s*\(\)\s*\{[\s\S]*?(?:head\s*=\s*head->next|delete\s+tmp)/.test(clean);
  const hasDeleteTail = /deleteFromTail\s*\(\)\s*\{[\s\S]*?(?:tail\s*=\s*tmp|delete\s+tail)/.test(clean);
  const hasDeleteNode = /deleteNode\s*\([^)]*\)\s*\{[\s\S]*?(?:pred->next\s*=\s*tmp->next|delete\s+tmp)/.test(clean);
  const hasSearch = /isInList\s*\([^)]*\)\s*\{[\s\S]*?(?:tmp->info\s*==\s*el|==\s*el)/.test(clean);

  const isGoal = hasAddToHead && hasAddToTail && hasDeleteHead && hasDeleteTail && hasDeleteNode && hasSearch;

  const frames: SimulationFrame[] = [
    {
      description: "Empty Linked List initialized: head = 0 (null), tail = 0 (null).",
      array: [],
      pointers: {},
      variables: { head: "0x0 (null)", tail: "0x0 (null)", status: "Empty" },
    },
    {
      description: "addToHead(44): Single node created. Both head and tail point to [44].",
      array: [44],
      pointers: { head: 0, tail: 0 },
      highlightIndices: [0],
      variables: { headVal: 44, tailVal: 44, length: 1 },
    },
    {
      description: "addToTail(10, 20, 30, 40): Linked list populated with 5 nodes in contiguous chain.",
      array: [44, 10, 20, 30, 40],
      pointers: { head: 0, tail: 4 },
      highlightIndices: [1, 2, 3, 4],
      variables: { head: 44, tail: 40, length: 5 },
    },
    {
      description: "deleteFromHead(): Deallocated node 44. head advances to index 0 containing 10.",
      array: [10, 20, 30, 40],
      pointers: { head: 0, tail: 3 },
      highlightIndices: [0],
      variables: { deleted: 44, newHead: 10 },
    },
    {
      description: "deleteFromTail(): Predecessor traversal finds node 30. tail reassigned to 30; node 40 deleted.",
      array: [10, 20, 30],
      pointers: { head: 0, tail: 2 },
      highlightIndices: [2],
      variables: { deleted: 40, newTail: 30 },
    },
    {
      description: "deleteNode(20): pred points to 10, tmp points to 20. pred->next = tmp->next unlinks 20 cleanly.",
      array: [10, 30],
      pointers: { head: 0, tail: 1 },
      highlightIndices: [1],
      variables: { unlinkedNode: 20, size: 2 },
    },
    {
      description: "isInList(30): Linear traversal inspects node 30 -> match confirmed! Returns true.",
      array: [10, 30],
      pointers: { head: 0, tail: 1, tmp: 1 },
      highlightIndices: [1],
      variables: { target: 30, found: "true" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Singly Linked List core operations (head/tail insertions, deletions, search) implemented with precision!"
      : "Ensure all member functions (addToHead, addToTail, deleteFromHead, deleteFromTail, deleteNode, isInList) are implemented to pass all criteria.",
    frames,
    stdout: `44 10 20 30 40 \n10 30 \nSearch 30: Found\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Module 10 Task 2: Node Filtering, Count & Maximum Element (Lab 8 Q2)
 */
function simulateSLLFilterAndStats(rawCode: string, clean: string): ExecutionResult {
  const hasZeroCheck = /check_zero\s*\(\)\s*\{[\s\S]*?(?:p->info\s*==\s*0|deleteNode)/.test(clean);
  const hasLarge = /large\s*\(\)\s*\{[\s\S]*?(?:<\s*q->info|q->info\s*>\s*x)/.test(clean);
  const hasCount = /count\s*\(\)\s*\{[\s\S]*?(?:c\+\+|count\+\+|\+\+c)/.test(clean);

  const isGoal = hasZeroCheck && hasLarge && hasCount;

  const frames: SimulationFrame[] = [
    {
      description: "List initialized with zero-value noise: [15, 0, 42, 0, 8, 99, 0]. Node count = 7.",
      array: [15, 0, 42, 0, 8, 99, 0],
      pointers: { head: 0, tail: 6 },
      variables: { count: 7, head: 15, tail: 0 },
    },
    {
      description: "count() executed: Traversed all 7 nodes from head to tail. Total count = 7.",
      array: [15, 0, 42, 0, 8, 99, 0],
      pointers: { q: 6 },
      highlightIndices: [0, 1, 2, 3, 4, 5, 6],
      variables: { nodeCount: 7 },
    },
    {
      description: "large() executed: Scanned nodes, tracking max value: 15 -> 42 -> 99. Max = 99.",
      array: [15, 0, 42, 0, 8, 99, 0],
      pointers: { maxNode: 5 },
      highlightIndices: [5],
      variables: { maxValue: 99 },
    },
    {
      description: "check_zero(): Found node with info == 0 at index 1. Unlinked and deallocated.",
      array: [15, 42, 0, 8, 99, 0],
      pointers: { head: 0, p: 1 },
      highlightIndices: [1],
      variables: { zeroRemoved: 0 },
    },
    {
      description: "check_zero(): Found node with info == 0 at index 2. Unlinked and deallocated.",
      array: [15, 42, 8, 99, 0],
      pointers: { head: 0, p: 2 },
      highlightIndices: [2],
      variables: { zeroRemoved: 0 },
    },
    {
      description: "check_zero(): Found tail node with info == 0. Tail adjusted to node 99.",
      array: [15, 42, 8, 99],
      pointers: { head: 0, tail: 3 },
      highlightIndices: [3],
      variables: { cleanTail: 99, totalPurged: 3 },
    },
    {
      description: "Filtering Complete: List has 4 valid nodes [15, 42, 8, 99]. All zeros removed.",
      array: [15, 42, 8, 99],
      pointers: { head: 0, tail: 3 },
      variables: { remainingNodes: 4, max: 99 },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Filtering, counting, and maximum calculation verified successfully!"
      : "Complete check_zero() (filtering 0 nodes), count() (returning node count), and large() (returning maximum value).",
    frames,
    stdout: `Initial list: 15 0 42 0 8 99 0 \nTotal nodes: 7\nLargest element: 99\nAfter check_zero: 15 42 8 99 \nNodes remaining: 4\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Module 10 Task 3: Split Linked List by Parity (Lab 8 Q3)
 */
function simulateSLLSplitParity(rawCode: string, clean: string): ExecutionResult {
  const hasCheck = /check\s*\(\)\s*\{[\s\S]*?(?:%\s*2\s*==\s*0|addToTail1|addToTail2)/.test(clean);
  const hasEvenOdd = /addToTail1[\s\S]*?addToTail2|addToTail2[\s\S]*?addToTail1/.test(clean);

  const isGoal = hasCheck && hasEvenOdd;

  const frames: SimulationFrame[] = [
    {
      description: "Main list populated with 15 nodes: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42].",
      array: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42],
      pointers: { head: 0, tail: 14 },
      variables: { totalNodes: 15, head: 0, tail: 42 },
    },
    {
      description: "check(): Processing node 0 (0 % 2 == 0 -> Even). Enqueued into Even List (head1).",
      array: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42],
      highlightIndices: [0],
      variables: { node: 0, parity: "Even", destination: "head1" },
    },
    {
      description: "check(): Processing node 3 (3 % 2 != 0 -> Odd). Enqueued into Odd List (head2).",
      array: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42],
      highlightIndices: [1],
      variables: { node: 3, parity: "Odd", destination: "head2" },
    },
    {
      description: "Splitting in progress... Nodes partitioned into Even (list1) and Odd (list2) sublists.",
      array: [0, 6, 12, 18, 24, 30, 36, 42],
      highlightIndices: [0, 1, 2, 3, 4, 5, 6, 7],
      variables: { evenCount: 8, oddCount: 7 },
    },
    {
      description: "Split Complete! Even List: [0, 6, 12, 18, 24, 30, 36, 42] | Odd List: [3, 9, 15, 21, 27, 33, 39] | Main List: Empty.",
      array: [0, 6, 12, 18, 24, 30, 36, 42],
      pointers: { head1: 0, tail1: 7 },
      variables: { evenList: "0, 6, 12, 18, 24, 30, 36, 42", oddList: "3, 9, 15, 21, 27, 33, 39", mainList: "Empty" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Linked list partitioned into even (head1) and odd (head2) sublists properly!"
      : "Implement check() using p->info % 2 == 0 to append to addToTail1 or addToTail2 and delete from main list.",
    frames,
    stdout: `Before split:\nMain list: 0 3 6 9 12 15 18 21 24 27 30 33 36 39 42 \nAfter split:\nMain list: Empty\nEven list: 0 6 12 18 24 30 36 42 \nOdd list: 3 9 15 21 27 33 39 \n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Module 10 Task 4: Sort Singly Linked List Ascending (Lab 8 Assignment Q1)
 */
function simulateSLLSort(rawCode: string, clean: string): ExecutionResult {
  const hasOuterLoop = /for\s*\(\s*IntSLLNode\s*\*\s*i\s*=\s*head/.test(clean);
  const hasInnerLoop = /for\s*\(\s*IntSLLNode\s*\*\s*j\s*=\s*i->next/.test(clean);
  const hasSwap = /i->info\s*>\s*j->info|swap\s*\(/.test(clean);

  const isGoal = hasOuterLoop && hasInnerLoop && hasSwap;

  const frames: SimulationFrame[] = [
    {
      description: "Unsorted list of 10 nodes: [64, 34, 25, 12, 22, 11, 90, 88, 45, 50].",
      array: [64, 34, 25, 12, 22, 11, 90, 88, 45, 50],
      pointers: { head: 0, tail: 9 },
      variables: { status: "Unsorted" },
    },
    {
      description: "Pass 1: Comparing i (64) with j (34, 25, 12, 11). Smallest value 11 swapped into head!",
      array: [11, 64, 34, 25, 22, 12, 90, 88, 45, 50],
      pointers: { i: 0 },
      highlightIndices: [0],
      variables: { headValue: 11 },
    },
    {
      description: "Pass 2: Pointer i advances to index 1. Smallest in remaining list (12) placed into index 1.",
      array: [11, 12, 64, 34, 25, 22, 90, 88, 45, 50],
      pointers: { i: 1 },
      highlightIndices: [1],
      variables: { sortedPrefix: "11, 12" },
    },
    {
      description: "Pass 3-5: Elements 22, 25, and 34 sorted into proper node positions.",
      array: [11, 12, 22, 25, 34, 64, 90, 88, 45, 50],
      pointers: { i: 4 },
      highlightIndices: [2, 3, 4],
      variables: { activeIndex: 4 },
    },
    {
      description: "Pass 6-9: Remaining elements [45, 50, 64, 88, 90] bubble into ascending positions.",
      array: [11, 12, 22, 25, 34, 45, 50, 64, 88, 90],
      pointers: { i: 8 },
      highlightIndices: [5, 6, 7, 8, 9],
      variables: { status: "Almost Sorted" },
    },
    {
      description: "Sorting Complete: Singly linked list of 10 nodes fully sorted in ascending order!",
      array: [11, 12, 22, 25, 34, 45, 50, 64, 88, 90],
      pointers: { head: 0, tail: 9 },
      highlightIndices: [0, 9],
      variables: { min: 11, max: 90, status: "Ascending" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Singly linked list ascending sort executed successfully in-place!"
      : "Traverse with pointer i from head and j from i->next, swapping values when i->info > j->info.",
    frames,
    stdout: `Before Sorting: 64 34 25 12 22 11 90 88 45 50 \nAfter Sorting (Ascending): 11 12 22 25 34 45 50 64 88 90 \n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Module 10 Task 5: Pairwise Sum of Two Linked Lists (Lab 8 Assignment Q2)
 */
function simulateSLLSumTwoLists(rawCode: string, clean: string): ExecutionResult {
  const hasBothTraversal = /p1\s*!=\s*0\s*&&\s*p2\s*!=\s*0|p1\s*&&\s*p2/.test(clean);
  const hasSumAndInsert = /p1->info\s*\+\s*p2->info|addToTail/.test(clean);

  const isGoal = hasBothTraversal && hasSumAndInsert;

  const frames: SimulationFrame[] = [
    {
      description: "List 1: [10, 20, 30, 40, 50] | List 2: [5, 15, 25, 35, 45]. List 3 initialized as empty.",
      array: [null, null, null, null, null],
      variables: { "List 1": "10, 20, 30, 40, 50", "List 2": "5, 15, 25, 35, 45", "List 3": "Empty" },
    },
    {
      description: "Node 0: p1->info (10) + p2->info (5) = 15. Added 15 to List 3.",
      array: [15, null, null, null, null],
      pointers: { p1: 0, p2: 0, l3_tail: 0 },
      highlightIndices: [0],
      variables: { "p1->info": 10, "p2->info": 5, sum: 15 },
    },
    {
      description: "Node 1: p1->info (20) + p2->info (15) = 35. Added 35 to List 3.",
      array: [15, 35, null, null, null],
      pointers: { p1: 1, p2: 1, l3_tail: 1 },
      highlightIndices: [1],
      variables: { "p1->info": 20, "p2->info": 15, sum: 35 },
    },
    {
      description: "Node 2: p1->info (30) + p2->info (25) = 55. Added 55 to List 3.",
      array: [15, 35, 55, null, null],
      pointers: { p1: 2, p2: 2, l3_tail: 2 },
      highlightIndices: [2],
      variables: { "p1->info": 30, "p2->info": 25, sum: 55 },
    },
    {
      description: "Node 3: p1->info (40) + p2->info (35) = 75. Added 75 to List 3.",
      array: [15, 35, 55, 75, null],
      pointers: { p1: 3, p2: 3, l3_tail: 3 },
      highlightIndices: [3],
      variables: { "p1->info": 40, "p2->info": 35, sum: 75 },
    },
    {
      description: "Node 4: p1->info (50) + p2->info (45) = 95. Added 95 to List 3.",
      array: [15, 35, 55, 75, 95],
      pointers: { p1: 4, p2: 4, l3_tail: 4 },
      highlightIndices: [4],
      variables: { "p1->info": 50, "p2->info": 45, sum: 95 },
    },
    {
      description: "Pairwise Sum Complete! List 3 contains [15, 35, 55, 75, 95].",
      array: [15, 35, 55, 75, 95],
      pointers: { l3_head: 0, l3_tail: 4 },
      variables: { resultList: "15, 35, 55, 75, 95", status: "Success" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Pairwise summing of corresponding linked list nodes completed accurately!"
      : "Traverse p1 and p2 concurrently using while (p1 != 0 && p2 != 0), computing p1->info + p2->info and calling l3.addToTail().",
    frames,
    stdout: `List 1: 10 20 30 40 50 \nList 2: 5 15 25 35 45 \nList 3 (Pairwise Sums): 15 35 55 75 95 \n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * t3_3: Binary Search Range with Midpoint Overflow Protection
 */
function simulateBinarySearchWithRange(rawCode: string, clean: string): ExecutionResult {
  const hasRangeCalc = /left\s*\+\s*\(right\s*-\s*left\)\s*\/\s*2|\(left\s*\+\s*right\)\s*\/\s*2/.test(clean);
  const hasUpdates = /left\s*=\s*mid\s*\+\s*1/.test(clean) && /right\s*=\s*mid\s*-\s*1/.test(clean);
  const hasLoop = /while\s*\(\s*left\s*<=\s*right\s*\)/.test(clean);
  const isGoal = hasRangeCalc && hasUpdates && hasLoop;

  const arr = [2, 10, 25, 30, 45, 50, 65, 75, 80, 95];
  const target = 50;

  const frames: SimulationFrame[] = [
    {
      description: `Initial sorted array of 10 numbers. Searching for target = ${target} across range [0, 9].`,
      array: [...arr],
      pointers: { left: 0, right: 9 },
      variables: { left: 0, right: 9, target },
    },
    {
      description: "Iteration 1: mid = 0 + (9 - 0) / 2 = 4. arr[4] = 45 < 50. Narrow search range: left = mid + 1 = 5.",
      array: [...arr],
      pointers: { left: 5, mid: 4, right: 9 },
      highlightIndices: [4],
      variables: { left: 5, right: 9, mid: 4, "arr[mid]": 45, comparison: "45 < 50" },
    },
    {
      description: "Iteration 2: mid = 5 + (9 - 5) / 2 = 7. arr[7] = 75 > 50. Narrow search range: right = mid - 1 = 6.",
      array: [...arr],
      pointers: { left: 5, mid: 7, right: 6 },
      highlightIndices: [7],
      variables: { left: 5, right: 6, mid: 7, "arr[mid]": 75, comparison: "75 > 50" },
    },
    {
      description: "Iteration 3: mid = 5 + (6 - 5) / 2 = 5. arr[5] = 50 == 50. Target found at index 5!",
      array: [...arr],
      pointers: { left: 5, mid: 5, right: 6 },
      highlightIndices: [5],
      variables: { left: 5, right: 6, mid: 5, "arr[mid]": 50, resultIndex: 5, status: "Found" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Binary search with safe midpoint calculation found target in O(log n)!"
      : "Calculate mid = left + (right - left) / 2, update left = mid + 1 and right = mid - 1 inside while (left <= right).",
    frames,
    stdout: `تم العثور على الرقم 50 في الفهرس (Index): 5\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * t3_4: Boolean Binary Search
 */
function simulateBooleanBinarySearch(rawCode: string, clean: string): ExecutionResult {
  const hasCheck = /value\s*==\s*a\[mid\]|a\[mid\]\s*==\s*value/.test(clean);
  const hasReturns = /return\s+true/i.test(clean) && /return\s+false/i.test(clean);
  const isGoal = hasCheck && hasReturns;

  const arr = [10, 20, 30, 40, 50, 60, 70, 80];

  const frames: SimulationFrame[] = [
    {
      description: "Array: [10, 20, 30, 40, 50, 60, 70, 80]. Test 1: binary_search(a, 8, 40).",
      array: [...arr],
      pointers: { low: 0, high: 7 },
      variables: { target: 40, low: 0, high: 7 },
    },
    {
      description: "Search 40: mid = (0 + 7) / 2 = 3. a[3] = 40. Matches target! Returns true.",
      array: [...arr],
      pointers: { match: 3 },
      highlightIndices: [3],
      variables: { target: 40, mid: 3, "a[mid]": 40, result: "true" },
    },
    {
      description: "Test 2: binary_search(a, 8, 99). Searching for target 99.",
      array: [...arr],
      pointers: { low: 0, high: 7 },
      variables: { target: 99, low: 0, high: 7 },
    },
    {
      description: "Search 99: Halving range -> mid 3 (40 < 99) -> mid 5 (60 < 99) -> mid 6 (70 < 99) -> mid 7 (80 < 99). low > high. Returns false.",
      array: [...arr],
      pointers: { low: 8, high: 7 },
      highlightIndices: [7],
      variables: { target: 99, status: "Not Found", result: "false" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Boolean binary search implemented with optimal halving!"
      : "Check value == a[mid] to return true, otherwise update low and high pointers and return false when low > high.",
    frames,
    stdout: `Value 40 found? True\nValue 99 found? False\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * t6_4: Interactive Car Inventory: 5-Feature Management System
 */
function simulateCarInventorySystem(rawCode: string, clean: string): ExecutionResult {
  const hasModern = /model\s*>\s*cars\[modern\]\.model|cars\[i\]\.model\s*>\s*cars\[modern\]\.model/.test(clean);
  const hasSearch = /searchName|cars\[i\]\.name/.test(clean);
  const hasLengthFilter = /length\(\)\s*>\s*3|cars\[i\]\.name\.length\(\)/.test(clean);
  const isGoal = hasModern && hasSearch && hasLengthFilter;

  const carModels = [2020, 2022, 2024];

  const frames: SimulationFrame[] = [
    {
      description: "Initialized 3 Car objects: [0] Corolla (2020), [1] Camry (2022), [2] BMW (2024).",
      array: [...carModels],
      pointers: { "cars[0]": 0, "cars[1]": 1, "cars[2]": 2 },
      variables: { count: 3, "cars[0]": "Corolla 2020", "cars[1]": "Camry 2022", "cars[2]": "BMW 2024" },
    },
    {
      description: "Feature 2: Finding most modern car. Comparing model years -> 2024 is maximum.",
      array: [...carModels],
      pointers: { modern: 2 },
      highlightIndices: [2],
      variables: { mostModern: "BMW", maxModel: 2024 },
    },
    {
      description: "Feature 3: Linear search for 'BMW'. Found at index 2 (Model: 2024).",
      array: [...carModels],
      pointers: { found: 2 },
      highlightIndices: [2],
      variables: { searchTarget: "BMW", foundIndex: 2, status: "Found" },
    },
    {
      description: "Feature 4: Filtering names with length > 3 characters: Corolla (7), Camry (5).",
      array: [...carModels],
      pointers: { match1: 0, match2: 1 },
      highlightIndices: [0, 1],
      variables: { matches: "Corolla (7 chars), Camry (5 chars)" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Car inventory 5-feature management system executed successfully!"
      : "Complete all 5 features: print all cars, find most modern car by model, linear search by name, and filter names longer than 3 characters.",
    frames,
    stdout: `Car 1: Corolla | Model: 2020\nCar 2: Camry | Model: 2022\nCar 3: BMW | Model: 2024\n\nMost modern car: BMW (2024)\n\nCar found: BMW | Model: 2024\n\nCars with name longer than 3 characters:\nCorolla (2020)\nCamry (2022)\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * t7_3: Stack Fundamentals (Class & Dynamic Operations)
 */
function simulateStackFundamentals(rawCode: string, clean: string): ExecutionResult {
  const hasPush = /stack\[\+\+top\]\s*=\s*value|\+\+top;?\s*stack\[top\]\s*=\s*value|top\+\+;?\s*stack\[top\]\s*=\s*value/.test(clean);
  const hasPop = /stack\[top--\]|top--;?\s*return/i.test(clean);
  const isGoal = hasPush && hasPop;

  const frames: SimulationFrame[] = [
    {
      description: "Stack initialized with capacity 5. top = -1.",
      array: [null, null, null, null, null],
      variables: { top: -1, capacity: 5 },
    },
    {
      description: "push(10), push(20), push(30): top increments to 2.",
      array: [10, 20, 30, null, null],
      pointers: { top: 2 },
      highlightIndices: [0, 1, 2],
      variables: { top: 2, topElement: 30 },
    },
    {
      description: "peek(): Inspecting stack[top] -> 30.",
      array: [10, 20, 30, null, null],
      pointers: { top: 2 },
      highlightIndices: [2],
      variables: { peekVal: 30, top: 2 },
    },
    {
      description: "pop(): Removed 30. top decrements to 1. New top element is 20.",
      array: [10, 20, null, null, null],
      pointers: { top: 1 },
      highlightIndices: [1],
      variables: { popped: 30, top: 1, currentTop: 20 },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Stack class push, pop, and peek operations verified successfully!"
      : "Implement push(value) with stack[++top] = value, pop() returning stack[top--], and peek() returning stack[top].",
    frames,
    stdout: `Top element = 30\nPopped element = 30\nTop element = 20\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * t7_4: Palindrome Verification Using a Stack
 */
function simulatePalindromeStack(rawCode: string, clean: string): ExecutionResult {
  const hasPushLoop = /push\s*\(\s*str\[i\]\s*\)/.test(clean);
  const hasPopLoop = /reverse\s*\+=\s*pop\(\)|reverse\s*\+=\s*s\.pop\(\)|s\.pop\(\)/.test(clean);
  const hasCheck = /str\s*==\s*reverse/.test(clean);
  const isGoal = hasPushLoop && hasCheck;

  const chars = ['r', 'a', 'd', 'a', 'r'];

  const frames: SimulationFrame[] = [
    {
      description: "Input string: 'radar'. Testing for palindrome with LIFO stack.",
      array: [null, null, null, null, null],
      variables: { input: "radar", length: 5 },
    },
    {
      description: "Pushed all characters of 'radar' onto stack. top = 4 ('r').",
      array: [...chars],
      pointers: { top: 4 },
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { stackContent: "r, a, d, a, r", topChar: 'r' },
    },
    {
      description: "Popping characters in LIFO order builds reverse string: 'r' -> 'a' -> 'd' -> 'a' -> 'r'.",
      array: [null, null, null, null, null],
      variables: { original: "radar", reversed: "radar" },
    },
    {
      description: "Comparison: 'radar' == 'radar' -> true! The string is a Palindrome.",
      array: [...chars],
      variables: { isPalindrome: "true", result: "The string is Palindrome" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Palindrome verification using Stack LIFO reversal succeeded!"
      : "Push each character str[i] to the stack, pop them into a reverse string, and compare str == reverse.",
    frames,
    stdout: `Testing string: radar\nThe string is Palindrome\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * t7_5: Delimiter & Parentheses Matching Using a Stack
 */
function simulateDelimiterMatching(rawCode: string, clean: string): ExecutionResult {
  const hasPushOpen = /push\s*\(\s*exp\[i\]\s*\)|push\s*\(\s*ch\s*\)/.test(clean);
  const hasMatchCheck = /isMatching|\(\s*open\s*==\s*'\(|c\s*==\s*'\)'/.test(clean);
  const hasEmptyCheck = /isEmpty\(\)|top\s*==\s*-1/.test(clean);
  const isGoal = hasPushOpen && (hasMatchCheck || hasEmptyCheck);

  const frames: SimulationFrame[] = [
    {
      description: "Testing expression: '{[()]}'. Stack begins empty.",
      array: [null, null, null, null, null],
      variables: { expression: "{[()]}", top: -1 },
    },
    {
      description: "Pushed opening delimiters: '{', '[', '('. Stack top = 2 ('(').",
      array: ['{', '[', '(', null, null],
      pointers: { top: 2 },
      highlightIndices: [0, 1, 2],
      variables: { top: 2, currentTop: '(' },
    },
    {
      description: "Encountered ')': Matches stack top '('. Popped '('.",
      array: ['{', '[', null, null, null],
      pointers: { top: 1 },
      highlightIndices: [1],
      variables: { matched: "()", top: 1, currentTop: '[' },
    },
    {
      description: "Encountered ']': Matches '['. Popped '['. Encountered '}': Matches '{'. Popped '{'.",
      array: [null, null, null, null, null],
      variables: { top: -1, isStackEmpty: "true", result: "Delimiters are matched" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Delimiter matching algorithm verified all paired brackets accurately!"
      : "Push opening brackets '(', '{', '['. When seeing a closing bracket, verify match with popped element.",
    frames,
    stdout: `Testing expression: {[()]}\nDelimiters are matched\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * t7_6: Reversing a Stack Using Another Stack
 */
function simulateTwoStackReversal(rawCode: string, clean: string): ExecutionResult {
  const hasTransferLoop = /while\s*\(\s*s1\.top\s*!=\s*-1\s*\)|while\s*\(\s*top1\s*!=\s*-1\s*\)|s2\.push\s*\(\s*s1\.pop\s*\(\s*\)\s*\)|push2\s*\(\s*pop1\s*\(\s*\)\s*\)/.test(clean);
  const isGoal = hasTransferLoop;

  const stackOriginal = [10, 20, 30, 40, 50];

  const frames: SimulationFrame[] = [
    {
      description: "Stack 1 filled with [10, 20, 30, 40, 50]. top1 = 4. Stack 2 is empty.",
      array: [...stackOriginal],
      pointers: { top1: 4 },
      variables: { top1: 4, top2: -1 },
    },
    {
      description: "Transferred elements: pop1() -> push2(). Stack 2 becomes [50, 40, 30, 20, 10].",
      array: [50, 40, 30, 20, 10],
      pointers: { top2: 4 },
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { top1: -1, top2: 4, "stack2 top": 10 },
    },
    {
      description: "Popping from Stack 2 produces the original bottom-to-top sequence: 10, 20, 30, 40, 50!",
      array: [50, 40, 30, 20, 10],
      variables: { reversedOutput: "10 20 30 40 50", status: "Completed" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Stack reversed using auxiliary stack successfully!"
      : "Transfer elements while top1 != -1 by executing push2(pop1()), then display stack2.",
    frames,
    stdout: `Reversed Stack:\n10 20 30 40 50 \n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * t7_7: Infix to Prefix Conversion Using a Stack
 */
function simulateInfixToPrefix(rawCode: string, clean: string): ExecutionResult {
  const hasReverse = /reverse\s*\(\s*exp\.begin\(\)/.test(clean);
  const hasSwap = /exp\[i\]\s*==\s*'\('/.test(clean) && /exp\[i\]\s*==\s*'\)'/.test(clean);
  const hasPostfix = /infixToPostfix/.test(clean);
  const isGoal = hasReverse && (hasSwap || hasPostfix);

  const frames: SimulationFrame[] = [
    {
      description: "Input Infix: (A+B)*(C-D). Step 1: Reverse string -> )D-C(*)B+A(",
      variables: { step: "Reverse", expression: ")D-C(*)B+A(" },
    },
    {
      description: "Step 2: Swap brackets -> (D-C)*(A+B)",
      variables: { step: "Swap parentheses", expression: "(D-C)*(A+B)" },
    },
    {
      description: "Step 3: Convert modified expression to postfix -> DC-AB+*",
      variables: { step: "Infix to Postfix", postfix: "DC-AB+*" },
    },
    {
      description: "Step 4: Reverse postfix result -> *+AB-CD (Final Prefix!)",
      variables: { step: "Final Prefix", prefix: "*+AB-CD" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Infix to Prefix conversion completed with correct 4-step algorithm!"
      : "Follow 4 steps: 1) reverse infix, 2) swap '(' and ')', 3) convert to postfix, 4) reverse to get prefix.",
    frames,
    stdout: `Infix expression: (A+B)*(C-D)\nPrefix expression = *+AB-CD\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * t9_4: Circular Queue with do-while Traversal & Search
 */
function simulateCircularQueueClass(rawCode: string, clean: string): ExecutionResult {
  const hasModulo = /\(rear\s*\+\s*1\)\s*%\s*SIZE\s*==\s*front|\(i\s*\+\s*1\)\s*%\s*SIZE/.test(clean);
  const hasDoWhile = /do\s*\{.*?\}\s*while/s.test(clean);
  const hasSearch = /search\s*\(/.test(clean);
  const isGoal = hasModulo && hasDoWhile && hasSearch;

  const queueData = [10, 20, 30, 40, null];

  const frames: SimulationFrame[] = [
    {
      description: "Enqueued [10, 20, 30, 40] into CircularQueue of SIZE 5. front = 0, rear = 3.",
      array: [...queueData],
      pointers: { front: 0, rear: 3 },
      variables: { front: 0, rear: 3, count: 4 },
    },
    {
      description: "display(): Traversing indices 0, 1, 2, 3 via do-while loop -> [10, 20, 30, 40].",
      array: [...queueData],
      highlightIndices: [0, 1, 2, 3],
      variables: { displayed: "10 20 30 40" },
    },
    {
      description: "search(30): Checking i = 0 (10), i = 1 (20), i = 2 (30 == 30). Match found at position 3 (index 2)!",
      array: [...queueData],
      pointers: { match: 2 },
      highlightIndices: [2],
      variables: { target: 30, foundAtPosition: 3, index: 2 },
    },
    {
      description: "search(99): Traversing until i == (rear + 1) % 5 = 4. 99 not found in queue.",
      array: [...queueData],
      variables: { target: 99, status: "Not Found" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Circular queue with modulo wrap-around and do-while search verified successfully!"
      : "Ensure enqueue checks (rear + 1) % SIZE == front, and search/display traverse with (i + 1) % SIZE until (rear + 1) % SIZE.",
    frames,
    stdout: `10 enqueued to queue\n20 enqueued to queue\n30 enqueued to queue\n40 enqueued to queue\nQueue elements: 10 20 30 40 \nElement 30 found at position: 3 (index: 2)\nElement 99 not found in the queue\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * t9_5: Reversing a Queue Using STL Queue & Stack
 */
function simulateQueueReversalSTL(rawCode: string, clean: string): ExecutionResult {
  const hasQueueToStack = /s\.push\s*\(\s*q\.front\s*\(\s*\)\s*\)/.test(clean) && /q\.pop\s*\(\s*\)/.test(clean);
  const hasStackToQueue = /q\.push\s*\(\s*s\.top\s*\(\s*\)\s*\)/.test(clean) && /s\.pop\s*\(\s*\)/.test(clean);
  const isGoal = hasQueueToStack && hasStackToQueue;

  const originalQueue = [10, 20, 30, 40, 50];
  const reversedQueue = [50, 40, 30, 20, 10];

  const frames: SimulationFrame[] = [
    {
      description: "Initial Queue: [10, 20, 30, 40, 50]. Stack is empty.",
      array: [...originalQueue],
      pointers: { front: 0, rear: 4 },
      variables: { "q.front()": 10, "q.back()": 50, stackSize: 0 },
    },
    {
      description: "Step 1: Pushed all queue elements onto stack. Stack top-to-bottom: [50, 40, 30, 20, 10].",
      array: [...reversedQueue],
      pointers: { "s.top()": 0 },
      variables: { "s.top()": 50, queueSize: 0 },
    },
    {
      description: "Step 2: Popped each element from stack and enqueued back into queue.",
      array: [...reversedQueue],
      pointers: { front: 0, rear: 4 },
      highlightIndices: [0, 1, 2, 3, 4],
      variables: { "reversed front": 50, "reversed back": 10 },
    },
    {
      description: "Result: Queue is completely reversed -> [50, 40, 30, 20, 10].",
      array: [...reversedQueue],
      variables: { output: "50 40 30 20 10", status: "Reversal Complete" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Queue reversed using STL queue and stack efficiently in O(n)!"
      : "Transfer elements while !q.empty() by pushing q.front() to s and popping q, then transfer back from s.top() to q.",
    frames,
    stdout: `Original Queue elements:\n10 20 30 40 50 \nReversed Queue elements:\n50 40 30 20 10 \n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 1_3: Array Output Function (printarray)
 */
function simulatePrintArray(rawCode: string, clean: string): ExecutionResult {
  const isGoal = clean.includes('arra[i]') &&
    (clean.includes('cout') || clean.includes('printf')) &&
    (clean.includes('size') || clean.includes('5'));

  const array = [10, 20, 30, 40, 50];
  const frames: SimulationFrame[] = array.map((val, idx) => ({
    description: `Traversing index ${idx}: printarray outputs 'the element ${idx + 1} = ${val}'.`,
    array: [...array],
    pointers: { i: idx },
    highlightIndices: [idx],
    variables: { i: idx, "arra[i]": val, output: `the element ${idx + 1} = ${val}` },
  }));

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Array successfully traversed and formatted via printarray in O(n)!"
      : "Loop through each index up to size and print 'the element ' << i + 1 << ' = ' << arra[i] << endl.",
    frames,
    stdout: `--- طباعة عناصر المصفوفة باستخدام الدالة ---\nthe element 1 = 10\nthe element 2 = 20\nthe element 3 = 30\nthe element 4 = 40\nthe element 5 = 50\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 1_4: In-Place Array Addition (addelement)
 */
function simulateAddElement(rawCode: string, clean: string): ExecutionResult {
  const isGoal = /arra\[i\]\s*(\+=|=.*?\+)\s*ele/.test(clean) || clean.includes('arra[i] += ele');

  const before = [10, 20, 30, 40, 50];
  const after = [17, 27, 37, 47, 57];

  const frames: SimulationFrame[] = [
    {
      description: "Initial array state before addition: [10, 20, 30, 40, 50].",
      array: [...before],
      variables: { status: "Before addition", ele: 7 },
    },
    ...after.map((val, idx) => {
      const intermediate = [...before];
      for (let j = 0; j <= idx; j++) intermediate[j] = after[j];
      return {
        description: `addelement: Adding 7 to arra[${idx}] -> ${intermediate[idx]}.`,
        array: intermediate,
        pointers: { i: idx },
        highlightIndices: [idx],
        variables: { i: idx, ele: 7, "arra[i]": intermediate[idx] },
      };
    }),
    {
      description: "Final array state after addition: [17, 27, 37, 47, 57].",
      array: [...after],
      variables: { status: "Addition complete" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Array modified in-place using addelement(arra, 7) in O(n)!"
      : "Iterate through each element in arra and increment it by ele (arra[i] += ele).",
    frames,
    stdout: `--- عناصر المصفوفة قبل الإضافة ---\nthe element 1 = 10\nthe element 2 = 20\nthe element 3 = 30\nthe element 4 = 40\nthe element 5 = 50\n\n--- جاري إضافة الرقم 7 لجميع العناصر... ---\n\n--- عناصر المصفوفة بعد الإضافة ---\nthe element 1 = 17\nthe element 2 = 27\nthe element 3 = 37\nthe element 4 = 47\nthe element 5 = 57\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 1_5: Array Doubling Function (multiarray)
 */
function simulateMultiArray(rawCode: string, clean: string): ExecutionResult {
  const isGoal = /arra\[i\]\s*(\*=|==.*?\*)\s*2/.test(clean) || clean.includes('arra[i] *= 2') || clean.includes('arra[i] = arra[i] * 2');

  const before = [5, 10, 15, 20, 25];
  const after = [10, 20, 30, 40, 50];

  const frames: SimulationFrame[] = [
    {
      description: "Initial array state before doubling: [5, 10, 15, 20, 25].",
      array: [...before],
      variables: { status: "Before doubling" },
    },
    ...after.map((val, idx) => {
      const intermediate = [...before];
      for (let j = 0; j <= idx; j++) intermediate[j] = after[j];
      return {
        description: `multiarray: Doubling arra[${idx}] -> ${intermediate[idx]}.`,
        array: intermediate,
        pointers: { i: idx },
        highlightIndices: [idx],
        variables: { i: idx, multiplier: 2, "arra[i]": intermediate[idx] },
      };
    }),
    {
      description: "Final array state after doubling: [10, 20, 30, 40, 50].",
      array: [...after],
      variables: { status: "Doubling complete" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Array elements doubled in-place using multiarray in O(n)!"
      : "Traverse each element in arra and multiply by 2 (arra[i] *= 2).",
    frames,
    stdout: `--- عناصر المصفوفة قبل المضاعفة ---\nthe element 1 = 5\nthe element 2 = 10\nthe element 3 = 15\nthe element 4 = 20\nthe element 5 = 25\n\n--- جاري مضاعفة جميع العناصر (الضرب في 2)... ---\n\n--- عناصر المصفوفة بعد المضاعفة ---\nthe element 1 = 10\nthe element 2 = 20\nthe element 3 = 30\nthe element 4 = 40\nthe element 5 = 50\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 3_5: Positional Linear Search with Global Status Flag (positionsearch)
 */
function simulatePositionSearch(rawCode: string, clean: string): ExecutionResult {
  const isGoal = clean.includes('arra[i] == ele') &&
    (clean.includes('x = true') || clean.includes('x=true')) &&
    clean.includes('return i');

  const array = [10, 20, 30, 40, 50];
  const target = 30;

  const frames: SimulationFrame[] = [
    {
      description: "Search started: Looking for 30 in [10, 20, 30, 40, 50]. Global flag x = false.",
      array: [...array],
      pointers: { i: 0 },
      highlightIndices: [0],
      variables: { i: 0, target, "arra[0]": 10, flag_x: "false", match: "false" },
    },
    {
      description: "Index 1: arra[1] = 20 != 30. Incrementing search index.",
      array: [...array],
      pointers: { i: 1 },
      highlightIndices: [1],
      variables: { i: 1, target, "arra[1]": 20, flag_x: "false", match: "false" },
    },
    {
      description: "Index 2: arra[2] = 30 == 30! Target found. Setting global flag x = true, returning index 2.",
      array: [...array],
      pointers: { i: 2 },
      highlightIndices: [2],
      variables: { i: 2, target, "arra[2]": 30, flag_x: "true", match: "true", returnIndex: 2 },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Position search with global flag 'x' completed successfully in O(n)!"
      : "Check if arra[i] == ele, set x = true, and return i immediately when found.",
    frames,
    stdout: `--- برنامج البحث عن موقع العنصر ---\nعناصر المصفوفة هي: 10, 20, 30, 40, 50 (في المواقع من 0 إلى 4)\n\nجاري البحث عن الرقم: 30...\nالنتيجة: الرقم 30 موجود في الفهرس رقم 2\n\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 7_8: STL Stack Palindrome Checker (std::stack<char>)
 */
function simulateSTLStackPalindrome(rawCode: string, clean: string): ExecutionResult {
  const isGoal = (clean.includes('s.push') || clean.includes('push')) &&
    (clean.includes('s.pop') || clean.includes('pop')) &&
    (clean.includes('s.top') || clean.includes('top'));

  const word = "noon";
  const chars = word.split('');

  const frames: SimulationFrame[] = [
    {
      description: `Input string: '${word}'. Pushing each character to std::stack<char>.`,
      array: ['n', 'o', 'o', 'n', null],
      pointers: { top: 3 },
      highlightIndices: [0, 1, 2, 3],
      variables: { input: word, stackSize: 4, topChar: 'n' },
    },
    {
      description: "Popping characters in LIFO order from stack into 'rev': 'n' -> 'o' -> 'o' -> 'n'.",
      array: [null, null, null, null, null],
      variables: { original: word, reversed: word, "s.empty()": "true" },
    },
    {
      description: "Comparison: str ('noon') == rev ('noon') -> Output: 'Palindrome'.",
      variables: { result: "Palindrome", matches: "true" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Palindrome verification using std::stack<char> executed in linear O(n) time!"
      : "Push string characters onto stack s, then pop into rev while !s.empty(), and compare str == rev.",
    frames,
    stdout: `Enter string: noon\nPalindrome\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 7_9: Postfix Expression Evaluation using STL Stack
 */
function simulatePostfixEvaluation(rawCode: string, clean: string): ExecutionResult {
  const isGoal = clean.includes('isdigit') &&
    clean.includes('s.push') &&
    clean.includes('s.pop') &&
    clean.includes('switch');

  const frames: SimulationFrame[] = [
    {
      description: "Expression: '23+4*'. Read '2' (digit): s.push(2).",
      array: [2, null, null, null, null],
      pointers: { top: 0 },
      highlightIndices: [0],
      variables: { symbol: '2', action: "push 2", stack: "[2]" },
    },
    {
      description: "Read '3' (digit): s.push(3).",
      array: [2, 3, null, null, null],
      pointers: { top: 1 },
      highlightIndices: [1],
      variables: { symbol: '3', action: "push 3", stack: "[2, 3]" },
    },
    {
      description: "Read '+': Operator! pop1 = 3, pop2 = 2. result = pop2 + pop1 = 2 + 3 = 5. s.push(5).",
      array: [5, null, null, null, null],
      pointers: { top: 0 },
      highlightIndices: [0],
      variables: { symbol: '+', pop1: 3, pop2: 2, result: 5, stack: "[5]" },
    },
    {
      description: "Read '4' (digit): s.push(4).",
      array: [5, 4, null, null, null],
      pointers: { top: 1 },
      highlightIndices: [1],
      variables: { symbol: '4', action: "push 4", stack: "[5, 4]" },
    },
    {
      description: "Read '*': Operator! pop1 = 4, pop2 = 5. result = pop2 * pop1 = 5 * 4 = 20. s.push(20).",
      array: [20, null, null, null, null],
      pointers: { top: 0 },
      highlightIndices: [0],
      variables: { symbol: '*', pop1: 4, pop2: 5, result: 20, stack: "[20]" },
    },
    {
      description: "Evaluation complete. Top of stack = 20.",
      array: [20, null, null, null, null],
      pointers: { top: 0 },
      variables: { result: 20, status: "Complete" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Postfix expression evaluated using std::stack<int> in O(n) time!"
      : "For digits push (symbol - '0'); for operators pop pop1 then pop2, evaluate pop2 [op] pop1, and push result.",
    frames,
    stdout: `Enter postfix expression: 23+4*\nResult = 20\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 1.6: squareelement (In-place squaring)
 */
function simulateSquareElement(rawCode: string, clean: string): ExecutionResult {
  const isGoal = /arra\[i\]\s*\*=\s*arra\[i\]|arra\[i\]\s*=\s*arra\[i\]\s*\*\s*arra\[i\]/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Initial array before squaring: [2, 3, 4, 5, 6].",
      array: [2, 3, 4, 5, 6],
      variables: { status: "Initial values" },
    },
    {
      description: "squareelement: arra[0] = 2 * 2 = 4, arra[1] = 3 * 3 = 9.",
      array: [4, 9, 4, 5, 6],
      pointers: { i: 1 },
      highlightIndices: [0, 1],
      variables: { i: 1, "arra[0]": 4, "arra[1]": 9 },
    },
    {
      description: "squareelement: arra[2] = 4 * 4 = 16, arra[3] = 5 * 5 = 25.",
      array: [4, 9, 16, 25, 6],
      pointers: { i: 3 },
      highlightIndices: [2, 3],
      variables: { i: 3, "arra[2]": 16, "arra[3]": 25 },
    },
    {
      description: "squareelement: arra[4] = 6 * 6 = 36. All elements squared in-place!",
      array: [4, 9, 16, 25, 36],
      pointers: { i: 4 },
      highlightIndices: [4],
      variables: { i: 4, "arra[4]": 36 },
    },
    {
      description: "Final array after squaring: [4, 9, 16, 25, 36].",
      array: [4, 9, 16, 25, 36],
      variables: { status: "Squaring complete" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "All elements squared in-place (arra[i] *= arra[i])!"
      : "Ensure squareelement multiplies each element by itself (arra[i] *= arra[i]).",
    frames,
    stdout: `--- عناصر المصفوفة قبل التربيع ---
the element 1 = 2
the element 2 = 3
the element 3 = 4
the element 4 = 5
the element 5 = 6

--- جاري تربيع جميع العناصر... ---

--- عناصر المصفوفة بعد التربيع ---
the element 1 = 4
the element 2 = 9
the element 3 = 16
the element 4 = 25
the element 5 = 36

Process returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 1.7: subelement (In-place scalar subtraction)
 */
function simulateSubElement(rawCode: string, clean: string): ExecutionResult {
  const isGoal = /arra\[i\]\s*-=\s*ele|arra\[i\]\s*=\s*arra\[i\]\s*-\s*ele/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Initial array before subtraction: [15, 25, 35, 45, 55]. ele = 5.",
      array: [15, 25, 35, 45, 55],
      variables: { status: "Before subtraction", ele: 5 },
    },
    {
      description: "subelement: arra[0] (15) - 5 = 10, arra[1] (25) - 5 = 20.",
      array: [10, 20, 35, 45, 55],
      pointers: { i: 1 },
      highlightIndices: [0, 1],
      variables: { i: 1, "arra[0]": 10, "arra[1]": 20 },
    },
    {
      description: "subelement: arra[2] (35) - 5 = 30, arra[3] (45) - 5 = 40.",
      array: [10, 20, 30, 40, 55],
      pointers: { i: 3 },
      highlightIndices: [2, 3],
      variables: { i: 3, "arra[2]": 30, "arra[3]": 40 },
    },
    {
      description: "subelement: arra[4] (55) - 5 = 50. All elements reduced by 5!",
      array: [10, 20, 30, 40, 50],
      pointers: { i: 4 },
      highlightIndices: [4],
      variables: { i: 4, "arra[4]": 50 },
    },
    {
      description: "Final array after subtraction: [10, 20, 30, 40, 50].",
      array: [10, 20, 30, 40, 50],
      variables: { status: "Subtraction complete" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "All elements subtracted by ele in-place (arra[i] -= ele)!"
      : "Ensure subelement subtracts ele from each element (arra[i] -= ele).",
    frames,
    stdout: `--- عناصر المصفوفة قبل الطرح ---
the element 1 = 15
the element 2 = 25
the element 3 = 35
the element 4 = 45
the element 5 = 55

--- جاري طرح الرقم 5 من جميع العناصر... ---

--- عناصر المصفوفة بعد الطرح ---
the element 1 = 10
the element 2 = 20
the element 3 = 30
the element 4 = 40
the element 5 = 50

Process returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 3.6: allposition (Finding all occurrences with global flag)
 */
function simulateAllPosition(rawCode: string, clean: string): ExecutionResult {
  const isGoal = /if\s*\(arra\[i\]\s*==\s*num\)/.test(clean) && /x\s*=\s*true/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Initial array: [15, 20, 15, 30, 15]. Target = 15. Flag x = false.",
      array: [15, 20, 15, 30, 15],
      pointers: { i: 0 },
      highlightIndices: [0],
      variables: { i: 0, target: 15, "arra[0]": 15, match: "true", outputIndices: "0" },
    },
    {
      description: "Index 1: arra[1] = 20 != 15. No match.",
      array: [15, 20, 15, 30, 15],
      pointers: { i: 1 },
      highlightIndices: [1],
      variables: { i: 1, "arra[1]": 20, match: "false" },
    },
    {
      description: "Index 2: arra[2] = 15 == 15! Match found at index 2.",
      array: [15, 20, 15, 30, 15],
      pointers: { i: 2 },
      highlightIndices: [2],
      variables: { i: 2, "arra[2]": 15, match: "true", outputIndices: "0, 2" },
    },
    {
      description: "Index 3: arra[3] = 30 != 15. No match.",
      array: [15, 20, 15, 30, 15],
      pointers: { i: 3 },
      highlightIndices: [3],
      variables: { i: 3, "arra[3]": 30, match: "false" },
    },
    {
      description: "Index 4: arra[4] = 15 == 15! Match found at index 4. All occurrences: 0, 2, 4.",
      array: [15, 20, 15, 30, 15],
      pointers: { i: 4 },
      highlightIndices: [4],
      variables: { i: 4, "arra[4]": 15, match: "true", outputIndices: "0, 2, 4", flag_x: "true" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "allposition correctly printed all match indices and updated global flag x!"
      : "Check if arra[i] == num, print index i, and set global flag x = true.",
    frames,
    stdout: `--- برنامج البحث عن جميع مواقع العنصر ---
عناصر المصفوفة هي: 15, 20, 15, 30, 15

the positions of number:15  are : 0  2  4  

Process returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 3.7: searchValue (Dynamic array linear search)
 */
function simulateSearchValue(rawCode: string, clean: string): ExecutionResult {
  const isGoal = /if\s*\(a\[i\]\s*==\s*value\)\s*\{\s*return\s+i;\s*\}|if\s*\(a\[i\]\s*==\s*value\)\s*return\s+i;/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Initial state: Array [12, 34, 56, 78, 90], searching for value 56.",
      array: [12, 34, 56, 78, 90],
      pointers: { i: 0 },
      highlightIndices: [0],
      variables: { i: 0, target: 56, "a[0]": 12, match: "false" },
    },
    {
      description: "Index 1: a[1] = 34 != 56. Advancing to index 2.",
      array: [12, 34, 56, 78, 90],
      pointers: { i: 1 },
      highlightIndices: [1],
      variables: { i: 1, "a[1]": 34, match: "false" },
    },
    {
      description: "Index 2: a[2] = 56 == 56! Match found at index 2. Returning 2.",
      array: [12, 34, 56, 78, 90],
      pointers: { i: 2 },
      highlightIndices: [2],
      variables: { i: 2, "a[2]": 56, match: "true", returnIndex: 2 },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "searchValue located target at index 2 in O(n) linear time!"
      : "Iterate through elements and return i if a[i] == value.",
    frames,
    stdout: `Searching for value: 56\nValue found at index: 2\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 3.8: search<T> (Generic Template Linear Search)
 */
function simulateGenericSearch(rawCode: string, clean: string): ExecutionResult {
  const isGoal = /template\s*<.*?typename|class\s+T>/.test(clean) && /arr\[i\]\s*==\s*target/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Generic Search Type 1 (int[]): Searching 30 in [10, 20, 30, 40, 50]. Found at index 2.",
      array: [10, 20, 30, 40, 50],
      pointers: { i: 2 },
      highlightIndices: [2],
      variables: { type: "int", target: 30, indexFound: 2 },
    },
    {
      description: "Generic Search Type 2 (string[]): Searching 'banana' in ['apple', 'banana', 'cherry']. Found at index 1.",
      array: ["apple", "banana", "cherry"],
      pointers: { i: 1 },
      highlightIndices: [1],
      variables: { type: "string", target: "banana", indexFound: 1 },
    },
    {
      description: "Generic Search Type 3 (double[]): Searching 2.5 in [1.5, 2.5, 3.5]. Found at index 1.",
      array: [1.5, 2.5, 3.5],
      pointers: { i: 1 },
      highlightIndices: [1],
      variables: { type: "double", target: 2.5, indexFound: 1 },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Generic template search<T> successfully verified across int, string, and double types!"
      : "Define template <typename T> int search(T arr[], int size, T target) and return i if arr[i] == target.",
    frames,
    stdout: `Index in nums: 2\nIndex in words: 1\nIndex in decimals: 1\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 3.9: Iterative & Recursive Binary Search with Overflow Guard
 */
function simulateBinarySearchIterRec(rawCode: string, clean: string): ExecutionResult {
  const isGoal = /mid\s*=\s*left\s*\+\s*\(right\s*-\s*left\)\s*\/\s*2/.test(clean) && /binarySearchRecursive/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Initial state: Array of 9 sorted elements. left = 0, right = 8, target = 65.",
      array: [10, 25, 35, 45, 55, 65, 75, 85, 95],
      pointers: { left: 0, right: 8, mid: 4 },
      highlightIndices: [4],
      variables: { left: 0, right: 8, mid: 4, "arr[mid]": 55, target: 65, action: "55 < 65 -> left = mid + 1 (5)" },
    },
    {
      description: "Iteration 2: Range [5..8]. mid = 5 + (8 - 5)/2 = 6. arr[6] = 75.",
      array: [10, 25, 35, 45, 55, 65, 75, 85, 95],
      pointers: { left: 5, right: 8, mid: 6 },
      highlightIndices: [6],
      variables: { left: 5, right: 8, mid: 6, "arr[mid]": 75, target: 65, action: "75 > 65 -> right = mid - 1 (5)" },
    },
    {
      description: "Iteration 3: Range [5..5]. mid = 5. arr[5] = 65 == 65! Target found at index 5.",
      array: [10, 25, 35, 45, 55, 65, 75, 85, 95],
      pointers: { left: 5, right: 5, mid: 5 },
      highlightIndices: [5],
      variables: { left: 5, right: 5, mid: 5, "arr[5]": 65, target: 65, returnIndex: 5, match: "true" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Binary search implemented with overflow-safe midpoint calculation and recursive alternative!"
      : "Calculate mid = left + (right - left) / 2 and implement both iterative and recursive branches.",
    frames,
    stdout: `القيمة 65 موجودة في الموقع: 5\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 3.10: Unsorted Array Linear Search
 */
function simulateLinearSearchUnsorted(rawCode: string, clean: string): ExecutionResult {
  const isGoal = /if\s*\(arr\[i\]\s*==\s*target\)/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Unsorted array: [45, 12, 78, 23, 67, 89, 34]. Target = 67.",
      array: [45, 12, 78, 23, 67, 89, 34],
      pointers: { i: 0 },
      highlightIndices: [0],
      variables: { i: 0, "arr[0]": 45, target: 67, match: "false" },
    },
    {
      description: "Scanning indices 1 to 3: [12, 78, 23] != 67.",
      array: [45, 12, 78, 23, 67, 89, 34],
      pointers: { i: 3 },
      highlightIndices: [1, 2, 3],
      variables: { i: 3, "arr[3]": 23, target: 67, match: "false" },
    },
    {
      description: "Index 4: arr[4] = 67 == 67! Match found. Returning index 4.",
      array: [45, 12, 78, 23, 67, 89, 34],
      pointers: { i: 4 },
      highlightIndices: [4],
      variables: { i: 4, "arr[4]": 67, target: 67, match: "true", returnIndex: 4 },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Linear search found 67 at index 4 in O(n) time!"
      : "Loop through elements and return i if arr[i] == target.",
    frames,
    stdout: `القيمة 67 موجودة في الموقع: 4\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 5.1: 4x4 Matrix Transposition
 */
function simulateMatrixTranspose(rawCode: string, clean: string): ExecutionResult {
  const isGoal = /transpose\[j\]\[i\]\s*=\s*x\[i\]\[j\]/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Original 4x4 matrix initialized in memory with 16 elements.",
      array: [13, 2, -3, 6, -1, 0, -2, 4, 7, 9, -8, 11, 4, -5, -1, 3],
      variables: { row0: "13, 2, -3, 6", row1: "-1, 0, -2, 4", row2: "7, 9, -8, 11", row3: "4, -5, -1, 3" },
    },
    {
      description: "Transposing Row 0 into Column 0: transpose[0][0]=13, transpose[1][0]=2, transpose[2][0]=-3, transpose[3][0]=6.",
      array: [13, -1, 7, 4, null, null, null, null, null, null, null, null, null, null, null, null],
      highlightIndices: [0, 1, 2, 3],
      variables: { col0: "13, 2, -3, 6" },
    },
    {
      description: "Transposing all rows complete: rows swapped with columns (transpose[j][i] = x[i][j]).",
      array: [13, -1, 7, 4, 2, 0, 9, -5, -3, -2, -8, -1, 6, 4, 11, 3],
      variables: { status: "Transposition Complete", dimensions: "4x4" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "4x4 matrix successfully transposed: transpose[j][i] = x[i][j] in O(n²) time!"
      : "Assign transpose[j][i] = x[i][j] in the nested loops.",
    frames,
    stdout: `Transposed Matrix:\n13\t-1\t7\t4\t\n2\t0\t9\t-5\t\n-3\t-2\t-8\t-1\t\n6\t4\t11\t3\t\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Task 7.10: Interactive Stack Operations & Menu System
 */
function simulateStackMenuOperations(rawCode: string, clean: string): ExecutionResult {
  const isGoal = /isEmpty/.test(clean) && /isFull/.test(clean) && /push/.test(clean) && /pop/.test(clean);

  const frames: SimulationFrame[] = [
    {
      description: "Initial Stack: Empty. top = -1. isEmpty() = true.",
      array: [null, null, null, null, null],
      pointers: { top: -1 },
      variables: { top: -1, isEmpty: "true", isFull: "false" },
    },
    {
      description: "push(10), push(20), push(30): top increments to 2. Stack: [10, 20, 30].",
      array: [10, 20, 30, null, null],
      pointers: { top: 2 },
      highlightIndices: [0, 1, 2],
      variables: { top: 2, topValue: 30, count: 3 },
    },
    {
      description: "peek(): Top element is 30. display(): Prints 30, 20, 10.",
      array: [10, 20, 30, null, null],
      pointers: { top: 2 },
      highlightIndices: [2],
      variables: { peekResult: 30, top: 2 },
    },
    {
      description: "pop(): Removed 30. top decrements to 1. Stack: [10, 20].",
      array: [10, 20, null, null, null],
      pointers: { top: 1 },
      highlightIndices: [1],
      variables: { poppedValue: 30, top: 1, remaining: "10, 20" },
    },
  ];

  return {
    success: true,
    isTaskGoalAchieved: isGoal,
    goalFeedback: isGoal
      ? "Stack menu system (push, pop, peek, isEmpty, isFull, display) operating in O(1) time!"
      : "Complete isEmpty, isFull, push, pop, and peek functions.",
    frames,
    stdout: `Value pushed successfully.\nValue pushed successfully.\nValue pushed successfully.\nStack:\n30\n20\n10\nTop value: 30\nRemoved: 30\nStack:\n20\n10\n\nProcess returned 0 (0x0)`,
    exitCode: 0,
  };
}

/**
 * Generic C++ Simulator fallback
 */
function simulateGeneric(rawCode: string, clean: string): ExecutionResult {
  const returnMatch = clean.match(/return\s+(\d+)\s*;/);
  const exitCode = returnMatch ? parseInt(returnMatch[1], 10) : 0;

  return {
    success: true,
    isTaskGoalAchieved: true,
    goalFeedback: "Code executed successfully.",
    frames: [
      {
        description: "Program executed in memory.",
        array: [1, 2, 3],
        variables: { exitCode },
      }
    ],
    stdout: `Program executed successfully.\nProcess returned ${exitCode} (0x${exitCode.toString(16).toUpperCase()})`,
    exitCode,
  };
}

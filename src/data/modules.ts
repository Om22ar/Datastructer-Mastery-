import { Module } from '../types';

export const modulesData: Module[] = [
  {
    id: "m1",
    title: "Module 1: Array Fundamentals",
    description: "Learn static array definition, direct indexing, and contiguous memory visualization.",
    tasks: [
      {
        id: "t1_1",
        title: "Define and Initialize",
        description: "Declare a static integer array of size 5 and initialize the first element to 10.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(1)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Direct index assignment executes in constant time O(1) via base pointer arithmetic.",
        initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n  // TODO: Declare integer array 'arr' of size 5\n  \n  \n  // TODO: Set first element to 10\n  \n  \n  cout << "First element: " << arr[0] << endl;\n  return 0;\n}`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n  // TODO: Declare integer array 'arr' of size 5\n  int arr[5];\n  \n  // TODO: Set first element to 10\n  arr[0] = 10;\n  \n  cout << "First element: " << arr[0] << endl;\n  return 0;\n}`,
        solutionRegex: "arr\\s*\\[\\s*5\\s*\\]\\s*;.*?arr\\s*\\[\\s*0\\s*\\]\\s*=\\s*10\\s*;",
        frames: [
          { description: "Initial State", array: [null, null, null, null, null] },
          { description: "Memory Allocated & Initialized", array: [10, null, null, null, null], highlightIndices: [0] }
        ]
      },
      {
        id: "t1_2",
        title: "Array Traversal & Accumulation",
        description: "Traverse an array of 5 numbers and compute their total sum using a single loop.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "A single pass visiting each of the n elements takes linear O(n) time.",
        initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[5] = {2, 4, 6, 8, 10};\n  int sum = 0;\n  \n  // TODO: Loop through array and accumulate sum\n  for (int i = 0; i < 5; i++) {\n    \n  }\n  \n  cout << "Sum: " << sum << endl;\n  return 0;\n}`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[5] = {2, 4, 6, 8, 10};\n  int sum = 0;\n  \n  // TODO: Loop through array and accumulate sum\n  for (int i = 0; i < 5; i++) {\n    sum += arr[i];\n  }\n  \n  cout << "Sum: " << sum << endl;\n  return 0;\n}`,
        solutionRegex: "sum\\s*\\+=\\s*arr\\[i\\]|sum\\s*=\\s*sum\\s*\\+\\s*arr\\[i\\]",
        frames: [
          { description: "Array initialized: [2, 4, 6, 8, 10], sum = 0", array: [2, 4, 6, 8, 10], pointers: { i: 0 }, highlightIndices: [0], variables: { i: 0, "arr[i]": 2, sum: 2 } },
          { description: "Iteration 1: added 4, sum = 6", array: [2, 4, 6, 8, 10], pointers: { i: 1 }, highlightIndices: [1], variables: { i: 1, "arr[i]": 4, sum: 6 } },
          { description: "Iteration 2: added 6, sum = 12", array: [2, 4, 6, 8, 10], pointers: { i: 2 }, highlightIndices: [2], variables: { i: 2, "arr[i]": 6, sum: 12 } },
          { description: "Iteration 3: added 8, sum = 20", array: [2, 4, 6, 8, 10], pointers: { i: 3 }, highlightIndices: [3], variables: { i: 3, "arr[i]": 8, sum: 20 } },
          { description: "Iteration 4: added 10, sum = 30", array: [2, 4, 6, 8, 10], pointers: { i: 4 }, highlightIndices: [4], variables: { i: 4, "arr[i]": 10, sum: 30 } }
        ]
      },
      {
        id: "t1_3",
        title: "Array Output Function (printarray)",
        description: "Implement a dedicated function printarray(int arra[]) that traverses an array of size 5 and prints each element in the format: 'the element (i+1) = value'.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Passing an array decays to a pointer to its base address. Iterating through all n elements requires linear O(n) time.",
        initialCode: `#include <iostream>
using namespace std;

// تحديد حجم المصفوفة ليكون ثابتاً في البرنامج كله
#define size 5 

// الإعلان عن الدالة قبل دالة main ليتعرف عليها المترجم (Compiler)
void printarray(int arra[]);

int main() {
    // تعريف مصفوفة وإعطاؤها قيم ابتدائية مباشرة
    int myArray[size] = {10, 20, 30, 40, 50};

    cout << "--- طباعة عناصر المصفوفة باستخدام الدالة ---" << endl;
    
    // استدعاء الدالة وتمرير المصفوفة لها
    printarray(myArray);

    return 0;
}

// بناء الدالة (Implementation)
void printarray(int arra[]) {
    // TODO: حلقة تكرار تمر على جميع عناصر المصفوفة
    // طباعة رقم العنصر (i+1) ثم قيمته:
    // "the element " << i + 1 << " = " << arra[i] << endl;
    for(int i = 0; i < size; i++) {
        
    }	
}`,
        solutionCode: `#include <iostream>
using namespace std;

// تحديد حجم المصفوفة ليكون ثابتاً في البرنامج كله
#define size 5 

// الإعلان عن الدالة قبل دالة main ليتعرف عليها المترجم (Compiler)
void printarray(int arra[]);

int main() {
    // تعريف مصفوفة وإعطاؤها قيم ابتدائية مباشرة
    int myArray[size] = {10, 20, 30, 40, 50};

    cout << "--- طباعة عناصر المصفوفة باستخدام الدالة ---" << endl;
    
    // استدعاء الدالة وتمرير المصفوفة لها
    printarray(myArray);

    return 0;
}

// بناء الدالة (Implementation)
void printarray(int arra[]) {
    // حلقة تكرار تمر على جميع عناصر المصفوفة
    for(int i = 0; i < size; i++) {
        // طباعة رقم العنصر (i+1) ثم قيمته
        cout << "the element " << i + 1 << " = " << arra[i] << endl;
    }	
}`,
        solutionRegex: "for\\s*\\(int\\s+i\\s*=\\s*0;\\s*i\\s*<\\s*size;\\s*i\\+\\+\\).*?cout\\s*<<.*?the element.*?<<\\s*arra\\[i\\]",
        frames: [
          {
            description: "myArray passed to printarray() as pointer: [10, 20, 30, 40, 50].",
            array: [10, 20, 30, 40, 50],
            pointers: { i: 0 },
            highlightIndices: [0],
            variables: { i: 0, "arra[0]": 10, output: "the element 1 = 10" }
          },
          {
            description: "Printing element 2 (index 1) = 20.",
            array: [10, 20, 30, 40, 50],
            pointers: { i: 1 },
            highlightIndices: [1],
            variables: { i: 1, "arra[1]": 20, output: "the element 2 = 20" }
          },
          {
            description: "Printing element 3 (index 2) = 30.",
            array: [10, 20, 30, 40, 50],
            pointers: { i: 2 },
            highlightIndices: [2],
            variables: { i: 2, "arra[2]": 30, output: "the element 3 = 30" }
          },
          {
            description: "Printing element 4 (index 3) = 40.",
            array: [10, 20, 30, 40, 50],
            pointers: { i: 3 },
            highlightIndices: [3],
            variables: { i: 3, "arra[3]": 40, output: "the element 4 = 40" }
          },
          {
            description: "Printing element 5 (index 4) = 50. Traversal complete.",
            array: [10, 20, 30, 40, 50],
            pointers: { i: 4 },
            highlightIndices: [4],
            variables: { i: 4, "arra[4]": 50, output: "the element 5 = 50" }
          }
        ]
      },
      {
        id: "t1_4",
        title: "In-Place Array Addition (addelement)",
        description: "Implement addelement(int arra[], int ele) which modifies an array in-place by adding ele (+7) to every item, then verify the change using printarray.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Arrays pass by reference as pointer to base address. Modifying each element in-place takes O(n) time and O(1) auxiliary space.",
        initialCode: `#include <iostream>
using namespace std;

// تحديد حجم المصفوفة ليكون ثابتاً
#define size 5 

// الإعلان عن الدوال قبل دالة main
void addelement(int arra[], int ele);
void printarray(int arra[]);

int main() {
    // تعريف مصفوفة وإعطاؤها قيم ابتدائية
    int myArray[size] = {10, 20, 30, 40, 50};

    cout << "--- عناصر المصفوفة قبل الإضافة ---" << endl;
    printarray(myArray);

    // استدعاء دالة الإضافة، وسنطلب منها إضافة الرقم (7) لكل عنصر
    cout << "\\n--- جاري إضافة الرقم 7 لجميع العناصر... ---" << endl;
    addelement(myArray, 7);

    cout << "\\n--- عناصر المصفوفة بعد الإضافة ---" << endl;
    printarray(myArray);

    return 0;
}

// بناء دالة الإضافة (addelement)
void addelement(int arra[], int ele) {
    // TODO: تمر الحلقة على كل عنصر وتضيف له القيمة الممررة (ele)
    for(int i = 0; i < size; i++) {
        
    }	
}

// بناء دالة الطباعة (printarray) لغرض عرض النتيجة
void printarray(int arra[]) {
    for(int i = 0; i < size; i++) {
        cout << "the element " << i + 1 << " = " << arra[i] << endl;
    }	
}`,
        solutionCode: `#include <iostream>
using namespace std;

// تحديد حجم المصفوفة ليكون ثابتاً
#define size 5 

// الإعلان عن الدوال قبل دالة main
void addelement(int arra[], int ele);
void printarray(int arra[]);

int main() {
    // تعريف مصفوفة وإعطاؤها قيم ابتدائية
    int myArray[size] = {10, 20, 30, 40, 50};

    cout << "--- عناصر المصفوفة قبل الإضافة ---" << endl;
    printarray(myArray);

    // استدعاء دالة الإضافة، وسنطلب منها إضافة الرقم (7) لكل عنصر
    cout << "\\n--- جاري إضافة الرقم 7 لجميع العناصر... ---" << endl;
    addelement(myArray, 7);

    cout << "\\n--- عناصر المصفوفة بعد الإضافة ---" << endl;
    printarray(myArray);

    return 0;
}

// بناء دالة الإضافة (addelement)
void addelement(int arra[], int ele) {
    // تمر الحلقة على كل عنصر وتضيف له القيمة الممررة (ele)
    for(int i = 0; i < size; i++) {
        arra[i] += ele; // هذه تعادل: arra[i] = arra[i] + ele;
    }	
}

// بناء دالة الطباعة (printarray) لغرض عرض النتيجة
void printarray(int arra[]) {
    for(int i = 0; i < size; i++) {
        cout << "the element " << i + 1 << " = " << arra[i] << endl;
    }	
}`,
        solutionRegex: "arra\\[i\\]\\s*\\+=\\s*ele|arra\\[i\\]\\s*=\\s*arra\\[i\\]\\s*\\+\\s*ele",
        frames: [
          {
            description: "Initial array before addition: [10, 20, 30, 40, 50].",
            array: [10, 20, 30, 40, 50],
            variables: { status: "Before addition", ele: 7 }
          },
          {
            description: "addelement: arra[0] (10) + 7 = 17.",
            array: [17, 20, 30, 40, 50],
            pointers: { i: 0 },
            highlightIndices: [0],
            variables: { i: 0, "arra[0]": 17 }
          },
          {
            description: "addelement: arra[1] (20) + 7 = 27, arra[2] (30) + 7 = 37.",
            array: [17, 27, 37, 40, 50],
            pointers: { i: 2 },
            highlightIndices: [1, 2],
            variables: { i: 2, "arra[2]": 37 }
          },
          {
            description: "addelement: arra[3] (40) + 7 = 47, arra[4] (50) + 7 = 57.",
            array: [17, 27, 37, 47, 57],
            pointers: { i: 4 },
            highlightIndices: [3, 4],
            variables: { i: 4, "arra[4]": 57 }
          },
          {
            description: "Final array after addition: [17, 27, 37, 47, 57].",
            array: [17, 27, 37, 47, 57],
            variables: { status: "After addition complete" }
          }
        ]
      },
      {
        id: "t1_5",
        title: "Array Doubling Function (multiarray)",
        description: "Implement multiarray(int arra[]) to double all elements in an array {5, 10, 15, 20, 25} in-place by multiplying each by 2.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Traversing n array elements and multiplying each by 2 runs in O(n) time.",
        initialCode: `#include <iostream>
using namespace std;

// تحديد حجم المصفوفة ليكون ثابتاً
#define size 5 

// الإعلان عن الدوال قبل دالة main
void multiarray(int arra[]);
void printarray(int arra[]);

int main() {
    // تعريف مصفوفة وإعطاؤها قيم ابتدائية
    int myArray[size] = {5, 10, 15, 20, 25};

    cout << "--- عناصر المصفوفة قبل المضاعفة ---" << endl;
    printarray(myArray);

    // استدعاء دالة المضاعفة
    cout << "\\n--- جاري مضاعفة جميع العناصر (الضرب في 2)... ---" << endl;
    multiarray(myArray);

    cout << "\\n--- عناصر المصفوفة بعد المضاعفة ---" << endl;
    printarray(myArray);

    return 0;
}

// بناء دالة المضاعفة (multiarray)
void multiarray(int arra[]) {
    // TODO: تمر الحلقة على كل عنصر وتضربه في 2
    for(int i = 0; i < size; i++) {
        
    }	
}

// بناء دالة الطباعة (printarray) لغرض عرض النتيجة
void printarray(int arra[]) {
    for(int i = 0; i < size; i++) {
        cout << "the element " << i + 1 << " = " << arra[i] << endl;
    }	
}`,
        solutionCode: `#include <iostream>
using namespace std;

// تحديد حجم المصفوفة ليكون ثابتاً
#define size 5 

// الإعلان عن الدوال قبل دالة main
void multiarray(int arra[]);
void printarray(int arra[]);

int main() {
    // تعريف مصفوفة وإعطاؤها قيم ابتدائية
    int myArray[size] = {5, 10, 15, 20, 25};

    cout << "--- عناصر المصفوفة قبل المضاعفة ---" << endl;
    printarray(myArray);

    // استدعاء دالة المضاعفة
    cout << "\\n--- جاري مضاعفة جميع العناصر (الضرب في 2)... ---" << endl;
    multiarray(myArray);

    cout << "\\n--- عناصر المصفوفة بعد المضاعفة ---" << endl;
    printarray(myArray);

    return 0;
}

// بناء دالة المضاعفة (multiarray)
void multiarray(int arra[]) {
    // تمر الحلقة على كل عنصر وتضربه في 2
    for(int i = 0; i < size; i++) {
        arra[i] *= 2; // هذه العبارة تعادل: arra[i] = arra[i] * 2;
    }	
}

// بناء دالة الطباعة (printarray) لغرض عرض النتيجة
void printarray(int arra[]) {
    for(int i = 0; i < size; i++) {
        cout << "the element " << i + 1 << " = " << arra[i] << endl;
    }	
}`,
        solutionRegex: "arra\\[i\\]\\s*\\*=\\s*2|arra\\[i\\]\\s*=\\s*arra\\[i\\]\\s*\\*\\s*2",
        frames: [
          {
            description: "Initial array before doubling: [5, 10, 15, 20, 25].",
            array: [5, 10, 15, 20, 25],
            variables: { status: "Original values" }
          },
          {
            description: "multiarray: arra[0] = 5 * 2 = 10, arra[1] = 10 * 2 = 20.",
            array: [10, 20, 15, 20, 25],
            pointers: { i: 1 },
            highlightIndices: [0, 1],
            variables: { i: 1, "arra[0]": 10, "arra[1]": 20 }
          },
          {
            description: "multiarray: arra[2] = 15 * 2 = 30, arra[3] = 20 * 2 = 40.",
            array: [10, 20, 30, 40, 25],
            pointers: { i: 3 },
            highlightIndices: [2, 3],
            variables: { i: 3, "arra[2]": 30, "arra[3]": 40 }
          },
          {
            description: "multiarray: arra[4] = 25 * 2 = 50. All elements doubled!",
            array: [10, 20, 30, 40, 50],
            pointers: { i: 4 },
            highlightIndices: [4],
            variables: { i: 4, "arra[4]": 50 }
          },
          {
            description: "Final array after doubling: [10, 20, 30, 40, 50].",
            array: [10, 20, 30, 40, 50],
            variables: { status: "Doubling complete" }
          }
        ]
      }
    ]
  },
  {
    id: "m2",
    title: "Module 2: Array Operations & Sorting Algorithms Lab",
    description: "In-place element transformations (add, sub, square, double), multi-mode linear & positional searching, Bubble Sort, Selection Sort, and Binary Search (arra.cpp).",
    tasks: [
      {
        id: "t2_1",
        title: "Array Transformations (addelement, subelement, square, multi)",
        description: "Implement in-place arithmetic transforms on an array of 5 integers: addelement (+ele), subelement (-ele), squareelement (x²), and multiarray (x*2).",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Single-pass in-place iteration over the array modifies all n elements in O(n) linear time.",
        initialCode: `#include <iostream>
using namespace std;
#define size 5

void addelement(int arra[], int ele) {
  // TODO: Add 'ele' to every element in arra
  
}

void subelement(int arra[], int ele) {
  // TODO: Subtract 'ele' from every element in arra
  
}

void squareelement(int arra[]) {
  // TODO: Square every element in arra (arra[i] = arra[i] * arra[i])
  
}

void multiarray(int arra[]) {
  // TODO: Multiply every element in arra by 2
  
}

void printarray(int arra[]) {
  for (int i = 0; i < size; i++) {
    cout << "the element " << i + 1 << " = " << arra[i] << endl;
  }
}

int main() {
  int arra[size] = {1, 2, 3, 4, 5};

  cout << "Initial array:\\n";
  printarray(arra);

  cout << "\\nAdd 3 to elements:\\n";
  addelement(arra, 3);
  printarray(arra);

  cout << "\\nSubtract 1 from elements:\\n";
  subelement(arra, 1);
  printarray(arra);

  cout << "\\nSquare elements:\\n";
  squareelement(arra);
  printarray(arra);

  cout << "\\nMultiply elements by 2:\\n";
  multiarray(arra);
  printarray(arra);

  return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;
#define size 5

void addelement(int arra[], int ele) {
  for (int i = 0; i < size; i++) {
    arra[i] += ele;
  }
}

void subelement(int arra[], int ele) {
  for (int i = 0; i < size; i++) {
    arra[i] -= ele;
  }
}

void squareelement(int arra[]) {
  for (int i = 0; i < size; i++) {
    arra[i] *= arra[i];
  }
}

void multiarray(int arra[]) {
  for (int i = 0; i < size; i++) {
    arra[i] *= 2;
  }
}

void printarray(int arra[]) {
  for (int i = 0; i < size; i++) {
    cout << "the element " << i + 1 << " = " << arra[i] << endl;
  }
}

int main() {
  int arra[size] = {1, 2, 3, 4, 5};

  cout << "Initial array:\\n";
  printarray(arra);

  cout << "\\nAdd 3 to elements:\\n";
  addelement(arra, 3);
  printarray(arra);

  cout << "\\nSubtract 1 from elements:\\n";
  subelement(arra, 1);
  printarray(arra);

  cout << "\\nSquare elements:\\n";
  squareelement(arra);
  printarray(arra);

  cout << "\\nMultiply elements by 2:\\n";
  multiarray(arra);
  printarray(arra);

  return 0;
}`,
        solutionRegex: "arra\\[i\\]\\s*\\+=\\s*ele.*?arra\\[i\\]\\s*-=\\s*ele.*?arra\\[i\\]\\s*\\*=\\s*arra\\[i\\].*?arra\\[i\\]\\s*\\*=\\s*2",
        frames: [
          {
            description: "Initial Array: [1, 2, 3, 4, 5]",
            array: [1, 2, 3, 4, 5],
            variables: { state: "Original values" }
          },
          {
            description: "addelement(arra, 3): Every element increased by 3 -> [4, 5, 6, 7, 8]",
            array: [4, 5, 6, 7, 8],
            highlightIndices: [0, 1, 2, 3, 4],
            variables: { operation: "+= 3", result: "[4, 5, 6, 7, 8]" }
          },
          {
            description: "subelement(arra, 1): Every element decreased by 1 -> [3, 4, 5, 6, 7]",
            array: [3, 4, 5, 6, 7],
            highlightIndices: [0, 1, 2, 3, 4],
            variables: { operation: "-= 1", result: "[3, 4, 5, 6, 7]" }
          },
          {
            description: "squareelement(arra): Every element squared (x*x) -> [9, 16, 25, 36, 49]",
            array: [9, 16, 25, 36, 49],
            highlightIndices: [0, 1, 2, 3, 4],
            variables: { operation: "*= arra[i]", result: "[9, 16, 25, 36, 49]" }
          },
          {
            description: "multiarray(arra): Every element multiplied by 2 -> [18, 32, 50, 72, 98]",
            array: [18, 32, 50, 72, 98],
            highlightIndices: [0, 1, 2, 3, 4],
            variables: { operation: "*= 2", result: "[18, 32, 50, 72, 98]" }
          }
        ]
      },
      {
        id: "t2_2",
        title: "Sorting Algorithms (bubblesort & selectionsort)",
        description: "Implement Bubble Sort (adjacent swap passes) and Selection Sort (minimum element index search and swap) for an array of size 5.",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n²)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Both Bubble Sort and Selection Sort use nested loops to order elements in O(n²) time.",
        initialCode: `#include <iostream>
using namespace std;
#define size 5

// TODO: Implement Bubble Sort
void bubblesort(int arra[]) {
  int temp;
  for (int i = 0; i < size - 1; i++) {
    for (int j = i + 1; j < size; j++) {
      if (arra[j] < arra[i]) {
        // Swap arra[i] and arra[j]
        
      }
    }
  }
}

// TODO: Implement Selection Sort
void selectionsort(int arra[]) {
  int temp;
  for (int i = 0; i < size - 1; i++) {
    int index = i;
    for (int j = i + 1; j < size; j++) {
      if (arra[j] < arra[index]) {
        index = j;
      }
    }
    // Swap arra[i] and arra[index]
    
  }
}

void printarray(int arra[]) {
  cout << "[ ";
  for (int i = 0; i < size; i++) {
    cout << arra[i] << (i < size - 1 ? " , " : " ");
  }
  cout << "]\\n";
}

int main() {
  int a[size] = {64, 25, 12, 22, 11};
  int b[size] = {64, 25, 12, 22, 11};

  cout << "Original Array: ";
  printarray(a);

  bubblesort(a);
  cout << "After Bubble Sort: ";
  printarray(a);

  selectionsort(b);
  cout << "After Selection Sort: ";
  printarray(b);

  return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;
#define size 5

void bubblesort(int arra[]) {
  int temp;
  for (int i = 0; i < size - 1; i++) {
    for (int j = i + 1; j < size; j++) {
      if (arra[j] < arra[i]) {
        temp = arra[i];
        arra[i] = arra[j];
        arra[j] = temp;
      }
    }
  }
}

void selectionsort(int arra[]) {
  int temp;
  for (int i = 0; i < size - 1; i++) {
    int index = i;
    for (int j = i + 1; j < size; j++) {
      if (arra[j] < arra[index]) {
        index = j;
      }
    }
    temp = arra[i];
    arra[i] = arra[index];
    arra[index] = temp;
  }
}

void printarray(int arra[]) {
  cout << "[ ";
  for (int i = 0; i < size; i++) {
    cout << arra[i] << (i < size - 1 ? " , " : " ");
  }
  cout << "]\\n";
}

int main() {
  int a[size] = {64, 25, 12, 22, 11};
  int b[size] = {64, 25, 12, 22, 11};

  cout << "Original Array: ";
  printarray(a);

  bubblesort(a);
  cout << "After Bubble Sort: ";
  printarray(a);

  selectionsort(b);
  cout << "After Selection Sort: ";
  printarray(b);

  return 0;
}`,
        solutionRegex: "temp\\s*=\\s*arra\\[i\\];\\s*arra\\[i\\]\\s*=\\s*arra\\[j\\];\\s*arra\\[j\\]\\s*=\\s*temp;.*?temp\\s*=\\s*arra\\[i\\];\\s*arra\\[i\\]\\s*=\\s*arra\\[index\\];\\s*arra\\[index\\]\\s*=\\s*temp;",
        frames: [
          {
            description: "Unsorted Array: [64, 25, 12, 22, 11]",
            array: [64, 25, 12, 22, 11],
            variables: { status: "Unsorted" }
          },
          {
            description: "Pass 1: Comparing and placing minimum element at index 0. [11, 64, 25, 22, 12]",
            array: [11, 64, 25, 22, 12],
            pointers: { sortedIndex: 0 },
            highlightIndices: [0],
            variables: { minFound: 11, index: 0 }
          },
          {
            description: "Pass 2: Next minimum 12 placed at index 1. [11, 12, 64, 25, 22]",
            array: [11, 12, 64, 25, 22],
            pointers: { sortedIndex: 1 },
            highlightIndices: [1],
            variables: { minFound: 12, index: 1 }
          },
          {
            description: "Pass 3: Next minimum 22 placed at index 2. [11, 12, 22, 64, 25]",
            array: [11, 12, 22, 64, 25],
            pointers: { sortedIndex: 2 },
            highlightIndices: [2],
            variables: { minFound: 22, index: 2 }
          },
          {
            description: "Final Pass: Sorted result: [11, 12, 22, 25, 64]",
            array: [11, 12, 22, 25, 64],
            highlightIndices: [0, 1, 2, 3, 4],
            variables: { status: "Sorted Ascending" }
          }
        ]
      },
      {
        id: "t2_3",
        title: "Comprehensive Array Lab Suite (arra.cpp)",
        description: "Full lab program integrating input, printarray, batch transformations (+3, -1, x², *2), 3 search variations (simple boolean, position search, all positions), sorting method selection (Bubble vs Selection), and binary search.",
        difficulty: "Advanced",
        optimalTimeComplexity: "O(n²)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Comprehensive suite: In-place transforms take O(n), sorting takes O(n²), and binary search takes O(log n).",
        initialCode: `#include<iostream>
using namespace std;
#define size 5 // const int size=5;
bool x=false;
void addelement(int arra[],int num);
void subelement(int arra[],int num);
void squareelement(int arra[]);
void multiarray(int arra[]);
void printarray(int arra[]);
bool simplesearch(int arra[],int num);
int positionsearch(int arra[],int num);
void allposition(int arra[],int num);
void bubblesort(int arra[]);
void selectionsort(int arra[]);
int binarysearch(int arra[],int num);

int main()
{
int arra[size] = {1, 2, 3, 4, 5};

// print elements of array
cout<<"print the elements of array\\n ";
printarray(arra);

//add number to elements of array
cout<<"please add number 3 to the elements of array\\n";
addelement(arra,3);
cout<<"print the elements of array after the operation\\n";
printarray(arra);

//subtract number of array elements
cout<<"please subtract number 1 from the elements of array\\n";
subelement(arra,1);
cout<<"print the elements of array after the operation\\n";
printarray(arra);

cout<<"please square the elements of array\\n";
//square the elements of array
squareelement(arra);
cout<<"print the elements of array after the operation\\n";
printarray(arra);

cout<<"please multiply the elements of array\\n";
//multiply the elements of array
multiarray(arra);
cout<<"print the elements of array after the operation\\n";
printarray(arra);

//linear search
int number = 50; bool res;
cout<<"search for number: " << number << endl;
res=simplesearch(arra,number);
if(res==true)
cout<<"the number "<<number<<" is found\\n";
else
cout<<"the number "<<number<<" is not found\\n";

//search for element's position
int posres;
x = false;
posres=positionsearch(arra,number);
if(x==true)
cout<<"the number "<<number<<" is found in position "<<posres<<endl;
else
cout<<"the number "<<number<<" is not found\\n";

//search for all element positions
x = false;
allposition(arra,number);
if(x==false)
cout<<"the number "<<number<<" is not found\\n";

//sorting
cout<<"\\nbubble sort algorithm:\\n";
bubblesort(arra);
cout<<"the array after sorting : [ ";
for(int i=0;i<size;i++)
if(i<size-1)
cout<<arra[i]<<" , ";
else 
cout<<arra[i];
cout<<" ]"<<endl;

//binary search
int target = 72;
cout<<"\\nbinary search for number: " << target << endl;
posres=binarysearch(arra,target);
if(posres!=-1)
cout<<"the number "<<target<<" is found in position "<<posres<<endl;
else
cout<<"the number "<<target<<" is not found\\n";

return 0;
}

void addelement(int arra[],int ele){
for(int i=0;i<size;i++)
arra[i]+=ele;	
}

void subelement(int arra[],int ele){
for(int i=0;i<size;i++)
arra[i]-=ele;	
}

void squareelement(int arra[]){
for(int i=0;i<size;i++)
arra[i]*=arra[i];	
}

void multiarray(int arra[]){
for(int i=0;i<size;i++)
arra[i]*=2;	
}

void printarray	(int arra[]){
for(int i=0;i<size;i++)
{
cout<<"the element "<<i+1<<" = ";
cout<<arra[i];
cout<<endl;
}	
}

bool simplesearch(int arra[],int ele){
for(int i=0;i<size;i++)
if(arra[i]==ele)
return true;

return false;	
}

int positionsearch(int arra[],int ele){
for(int i=0;i<size;i++)
if(arra[i]==ele)
{
	x=true;
	return i;
}	
return -1;
}

void allposition(int arra[],int num){
cout<<"the positions of number:"<<num<<"  are : ";
for(int i=0;i<size;i++)
if(arra[i]==num)
{
cout<<i<<"  ";
	x=true;
}	
cout<<endl;
}

int binarysearch	(int arra[],int num){
	int l=0,r=size-1,mid;
	while(l<=r){
	mid=(l+r)/2;
	if(arra[mid]==num)
	return mid;
	else if(arra[mid]<num)
	l=mid+1;
	else 
	r=mid-1;	
	}
	return -1;	
}

void selectionsort(int arra[]){
	int temp;
	for(int i=0;i<size-1;i++)
	{
		int index=i;
	for(int j=i+1;j<size;j++)
	if(arra[j]<arra[index])
	index=j;
	
		temp=arra[i];
		arra[i]=arra[index];
		arra[index]=temp;	
	}
}

void bubblesort(int arra[]){
	int temp;
	for(int i=0;i<size-1;i++)
	for(int j=i+1;j<size;j++)
	if(arra[j]<arra[i])	
		{temp=arra[i];
		arra[i]=arra[j];
		arra[j]=temp;}	
}`,
        solutionCode: `#include<iostream>
using namespace std;
#define size 5 // const int size=5;
bool x=false;
void addelement(int arra[],int num);
void subelement(int arra[],int num);
void squareelement(int arra[]);
void multiarray(int arra[]);
void printarray(int arra[]);
bool simplesearch(int arra[],int num);
int positionsearch(int arra[],int num);
void allposition(int arra[],int num);
void bubblesort(int arra[]);
void selectionsort(int arra[]);
int binarysearch(int arra[],int num);

int main()
{
int arra[size];
//enter elements to array
cout<<"please enter array elements :";
for(int i=0;i<size;i++)
{
cout<<"the element "<<i+1<<"=";
cin>>arra[i];
}
// print elements of array
cout<<"print the elements of array\\n ";
printarray(arra);
//add number to elements of array
cout<<"please add number 3 to the elements of array\\n";
addelement(arra,3);
cout<<"print the elements of array after the operation\\n";
printarray(arra);
//subtract number of array elements
cout<<"please subtract number 1 from the elements of array\\n";
subelement(arra,1);
cout<<"print the elements of array after the operation\\n";
printarray(arra);
cout<<"please square the elements of array\\n";
//square the elements of array
squareelement(arra);
cout<<"print the elements of array after the operation\\n";
printarray(arra);
cout<<"please multiply the elements of array\\n";
//multiply the elements of array
multiarray(arra);
cout<<"print the elements of array after the operation\\n";
printarray(arra);
//linear search
int number;bool res;
cout<<"please search for the number\\nplease enter the number :";
cin>>number;
res=simplesearch(arra,number);
if(res==true)
cout<<"the number "<<number<<" is found\\n";
else
cout<<"the number "<<number<<" is not found\\n";
//search for element s position
int posres;
cout<<"please search for the number\\nplease enter the number :";
cin>>number;
posres=positionsearch(arra,number);
if(x==true)
cout<<"the number "<<number<<" is found in position "<<posres<<endl;
else
cout<<"the number "<<number<<" is not found\\n";
//search for all element positions
cout<<"please search for the number\\nplease enter the number :";
cin>>number;
allposition(arra,number);
if(x==false)
cout<<"the number "<<number<<" is not found\\n";
//sorting
cout<<"\\nplease choose the way for sorting 1- buuble sort algorithm 2- selection sort algorithm\\n";
int sort;
cin>>sort;
if(sort==1)
{
	//bubble sort
bubblesort(arra);
cout<<"\\nthe array after sorting : [ ";
for(int i=0;i<size;i++)
if(i<size-1)
cout<<arra[i]<<" , ";
else 
cout<<arra[i];
cout<<" ]"<<endl;
}
else{
	//selection sort
selectionsort(arra);
cout<<"\\nthe array after sorting : [ ";
for(int i=0;i<size;i++)
if(i<size-1)
cout<<arra[i]<<" , ";
else 
cout<<arra[i];
cout<<" ]"<<endl;
}

//binary search
cout<<"\\nplease search for the number\\nplease enter the number :";
cin>>number;
posres=binarysearch(arra,number);
if(posres!=-1)
cout<<"the number "<<number<<" is found in position "<<posres<<endl;
else
cout<<"the number "<<number<<" is not found\\n";

return 0;
}

void addelement(int arra[],int ele){
for(int i=0;i<size;i++)
arra[i]+=ele;	
}
void subelement(int arra[],int ele){
for(int i=0;i<size;i++)
arra[i]-=ele;	
}
void squareelement(int arra[]){
for(int i=0;i<size;i++)
arra[i]*=arra[i];	
}
void multiarray(int arra[]){
for(int i=0;i<size;i++)
arra[i]*=2;	
}
void printarray	(int arra[]){
for(int i=0;i<size;i++)
{
cout<<"the element "<<i+1<<" = ";
cout<<arra[i];
cout<<endl;
}	
}
bool simplesearch(int arra[],int ele){
for(int i=0;i<size;i++)
if(arra[i]==ele)
return true;

return false;	
}
int positionsearch(int arra[],int ele){
for(int i=0;i<size;i++)
if(arra[i]==ele)
{
	x=true;
	return i;
}	
return -1;
}
void allposition(int arra[],int num){
cout<<"the positions of number:"<<num<<"  are : ";
for(int i=0;i<size;i++)
if(arra[i]==num)
{
cout<<i<<"  ";
	x=true;
}	
}
int binarysearch	(int arra[],int num){
	int l=0,r=size-1,mid;
	while(l<=r){
	mid=(l+r)/2;
	if(arra[mid]==num)
	return mid;
	else if(arra[mid]<num)
	l=mid+1;
	else 
	r=mid-1;	
	}
	return -1;	
}
void selectionsort(int arra[]){
	int temp;
	for(int i=0;i<size-1;i++)
	{
		int index=i;
	for(int j=i+1;j<size;j++)
	if(arra[j]<arra[index])
	index=j;
	
		temp=arra[i];
		arra[i]=arra[index];
		arra[index]=temp;	
	}
}
void bubblesort(int arra[]){
	int temp;
	for(int i=0;i<size-1;i++)
	for(int j=i+1;j<size;j++)
	if(arra[j]<arra[i])	
		{temp=arra[i];
		arra[i]=arra[j];
		arra[j]=temp;}	
}`,
        solutionRegex: "void\\s+addelement.*?void\\s+subelement.*?void\\s+squareelement.*?void\\s+multiarray.*?void\\s+bubblesort.*?void\\s+selectionsort.*?int\\s+binarysearch",
        frames: [
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
        ]
      }
    ]
  },
  {
    id: "m3",
    title: "Module 3: Searching Algorithms",
    description: "Implement Linear and Binary Search.",
    tasks: [
      {
        id: "t3_1",
        title: "Linear Search",
        description: "Sequentially inspect each element in an unsorted array to locate a target value.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Linear search checks each element one-by-one, yielding O(n) worst-case time complexity.",
        initialCode: `#include <iostream>\nusing namespace std;\n\nint linearSearch(int arr[], int n, int target) {\n  // TODO: Iterate from 0 to n-1 and return index if found\n  for (int i = 0; i < n; i++) {\n    if (arr[i] == target) {\n      \n    }\n  }\n  return -1;\n}\n\nint main() {\n  int arr[5] = {15, 8, 42, 4, 16};\n  cout << linearSearch(arr, 5, 42);\n  return 0;\n}`,
        solutionCode: `#include <iostream>\nusing namespace std;\n\nint linearSearch(int arr[], int n, int target) {\n  // TODO: Iterate from 0 to n-1 and return index if found\n  for (int i = 0; i < n; i++) {\n    if (arr[i] == target) {\n      return i;\n    }\n  }\n  return -1;\n}\n\nint main() {\n  int arr[5] = {15, 8, 42, 4, 16};\n  cout << linearSearch(arr, 5, 42);\n  return 0;\n}`,
        solutionRegex: "return\\s+i\\s*;",
        frames: [
          { description: "Search target: 42. Check index 0 (15 != 42)", array: [15, 8, 42, 4, 16], pointers: { i: 0 }, highlightIndices: [0] },
          { description: "Check index 1 (8 != 42)", array: [15, 8, 42, 4, 16], pointers: { i: 1 }, highlightIndices: [1] },
          { description: "Found target 42 at index 2! Returning 2", array: [15, 8, 42, 4, 16], pointers: { i: 2 }, highlightIndices: [2], variables: { return: 2 } }
        ]
      },
      {
        id: "t3_2",
        title: "Binary Search",
        description: "Implement the halving condition for Binary Search.",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(log n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Halving the search space on each iteration reduces n elements to 1 in log₂(n) steps.",
        initialCode: `#include <iostream>\nusing namespace std;\n#define size 10\n\nint binarysearch(int arra[], int num) {\n  int l = 0, r = size - 1, mid;\n  while (l <= r) {\n    // TODO: Calculate mid\n    \n\n    if (arra[mid] == num) return mid;\n    \n    // TODO: Implement range halving\n    else if (arra[mid] < num) {\n      \n    } else {\n      \n    }\n  }\n  return -1;\n}\n\nint main() {\n  int arr[10] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};\n  cout << binarysearch(arr, 7);\n  return 0;\n}`,
        solutionCode: `#include <iostream>\nusing namespace std;\n#define size 10\n\nint binarysearch(int arra[], int num) {\n  int l = 0, r = size - 1, mid;\n  while (l <= r) {\n    // TODO: Calculate mid\n    mid = l + (r - l) / 2;\n\n    if (arra[mid] == num) return mid;\n    \n    // TODO: Implement range halving\n    else if (arra[mid] < num) {\n      l = mid + 1;\n    } else {\n      r = mid - 1;\n    }\n  }\n  return -1;\n}\n\nint main() {\n  int arr[10] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};\n  cout << binarysearch(arr, 7);\n  return 0;\n}`,
        solutionRegex: "mid\\s*=\\s*(.*?)2\\s*;.*?l\\s*=\\s*mid\\s*\\+\\s*1\\s*;.*?r\\s*=\\s*mid\\s*-\\s*1\\s*;",
        frames: [
          { description: "Initial Pointers", array: [1,3,5,7,9,11,13,15,17,19], pointers: { l: 0, r: 9 } },
          { description: "Calculate Mid", array: [1,3,5,7,9,11,13,15,17,19], pointers: { l: 0, r: 9, mid: 4 }, highlightIndices: [4] },
          { description: "Target (7) < arr[mid] (9). Halve left.", array: [1,3,5,7,9,11,13,15,17,19], pointers: { l: 0, r: 3 } },
          { description: "New Mid", array: [1,3,5,7,9,11,13,15,17,19], pointers: { l: 0, r: 3, mid: 1 }, highlightIndices: [1] },
          { description: "Target (7) > arr[mid] (3). Halve right.", array: [1,3,5,7,9,11,13,15,17,19], pointers: { l: 2, r: 3 } },
          { description: "New Mid", array: [1,3,5,7,9,11,13,15,17,19], pointers: { l: 2, r: 3, mid: 2 }, highlightIndices: [2] },
          { description: "Target (7) == arr[mid] (7)! Found.", array: [1,3,5,7,9,11,13,15,17,19], pointers: { l: 2, r: 3, mid: 2 }, highlightIndices: [2], variables: { return: 2 } }
        ]
      },
      {
        id: "t3_3",
        title: "Binary Search Range with Midpoint Overflow Protection",
        description: "Implement binarySearch(int arr[], int left, int right, int target) using mid = left + (right - left) / 2 to avoid integer overflow, returning the found index or -1.",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(log n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Halving the search interval [left, right] logarithmic time O(log n) with zero dynamic allocation.",
        initialCode: `#include <iostream>
using namespace std;

// دالة البحث الثنائي
int binarySearch(int arr[], int left, int right, int target) {
    while (left <= right) {
        // تحديد نقطة المنتصف
        int mid = left + (right - left) / 2;

        // التحقق مما إذا كان الرقم المطلوب موجوداً في المنتصف
        if (arr[mid] == target)
            return mid;

        // إذا كان الرقم المطلوب أكبر، نتجاهل النصف الأيسر ونبحث في النصف الأيمن
        // TODO: Update left boundary
        if (arr[mid] < target)
            

        // إذا كان الرقم المطلوب أصغر، نتجاهل النصف الأيمن ونبحث في النصف الأيسر
        // TODO: Update right boundary
        else
            
    }

    // إذا لم يتم العثور على الرقم
    return -1;
}

int main() {
    // يجب أن تكون المصفوفة مرتبة لكي يعمل البحث الثنائي
    int arr[] = {2, 10, 25, 30, 45, 50, 65, 75, 80, 95};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    int target = 50; // الرقم الذي نبحث عنه
    int result = binarySearch(arr, 0, n - 1, target);

    if (result == -1)
        cout << "الرقم غير موجود في المصفوفة." << endl;
    else
        cout << "تم العثور على الرقم " << target << " في الفهرس (Index): " << result << endl;

    return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;

// دالة البحث الثنائي
int binarySearch(int arr[], int left, int right, int target) {
    while (left <= right) {
        // تحديد نقطة المنتصف (مثل التخمين برقم 50 في الصورة)
        int mid = left + (right - left) / 2;

        // التحقق مما إذا كان الرقم المطلوب موجوداً في المنتصف
        if (arr[mid] == target)
            return mid;

        // إذا كان الرقم المطلوب أكبر، نتجاهل النصف الأيسر ونبحث في النصف الأيمن
        if (arr[mid] < target)
            left = mid + 1;

        // إذا كان الرقم المطلوب أصغر، نتجاهل النصف الأيمن ونبحث في النصف الأيسر
        else
            right = mid - 1;
    }

    // إذا لم يتم العثور على الرقم
    return -1;
}

int main() {
    // يجب أن تكون المصفوفة مرتبة لكي يعمل البحث الثنائي
    int arr[] = {2, 10, 25, 30, 45, 50, 65, 75, 80, 95};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    int target = 50; // الرقم الذي نبحث عنه
    int result = binarySearch(arr, 0, n - 1, target);

    if (result == -1)
        cout << "الرقم غير موجود في المصفوفة." << endl;
    else
        cout << "تم العثور على الرقم " << target << " في الفهرس (Index): " << result << endl;

    return 0;
}`,
        solutionRegex: "left\\s*=\\s*mid\\s*\\+\\s*1;.*?right\\s*=\\s*mid\\s*-\\s*1;",
        frames: [
          {
            description: "Initial Search Range: left = 0, right = 9. Target = 50.",
            array: [2, 10, 25, 30, 45, 50, 65, 75, 80, 95],
            pointers: { left: 0, right: 9 },
            variables: { left: 0, right: 9, target: 50 }
          },
          {
            description: "Midpoint calculation: mid = 0 + (9 - 0) / 2 = 4. arr[4] = 45 < 50. Discard left half.",
            array: [2, 10, 25, 30, 45, 50, 65, 75, 80, 95],
            pointers: { left: 0, right: 9, mid: 4 },
            highlightIndices: [4],
            variables: { mid: 4, "arr[mid]": 45, comparison: "45 < 50 -> left = mid + 1" }
          },
          {
            description: "New Range: left = 5, right = 9. Midpoint: mid = 5 + (9 - 5) / 2 = 7. arr[7] = 75 > 50. Discard right half.",
            array: [2, 10, 25, 30, 45, 50, 65, 75, 80, 95],
            pointers: { left: 5, right: 9, mid: 7 },
            highlightIndices: [7],
            variables: { left: 5, right: 9, mid: 7, "arr[mid]": 75, comparison: "75 > 50 -> right = mid - 1" }
          },
          {
            description: "New Range: left = 5, right = 6. Midpoint: mid = 5 + (6 - 5) / 2 = 5. arr[5] = 50 == 50. Target found!",
            array: [2, 10, 25, 30, 45, 50, 65, 75, 80, 95],
            pointers: { left: 5, right: 6, mid: 5 },
            highlightIndices: [5],
            variables: { mid: 5, "arr[mid]": 50, status: "Found", returnIndex: 5 }
          }
        ]
      },
      {
        id: "t3_4",
        title: "Boolean Binary Search (binSearch)",
        description: "Implement binSearch(int a[], int n, int value) returning a boolean true when found and false when absent.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(log n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Iteratively halves the search space [low, high] in O(log n) time and returns a boolean status flag.",
        initialCode: `#include <iostream>
using namespace std;

// دالة البحث الثنائي ترجع true في حال إيجاد القيمة، و false إذا لم تجدها
bool binSearch(int a[], int n, int value) {
    int low = 0;
    int high = n - 1;
    
    while (low <= high) {
        int mid = (low + high) / 2;
        
        // TODO: Check if value == a[mid]
        if (value == a[mid]) {
            return true;
        } 
        // TODO: Check if value < a[mid]
        else if (value < a[mid]) {
            
        } 
        // TODO: If value > a[mid]
        else {
            
        }
    }
    
    return false;
}

int main() {
    int a[] = {10, 20, 30, 40, 50, 60, 70};
    int n = sizeof(a) / sizeof(a[0]);
    
    int valueToFind1 = 40;
    int valueToFind2 = 99;

    if (binSearch(a, n, valueToFind1)) {
        cout << "Value " << valueToFind1 << " found? True" << endl;
    } else {
        cout << "Value " << valueToFind1 << " found? False" << endl;
    }

    if (binSearch(a, n, valueToFind2)) {
        cout << "Value " << valueToFind2 << " found? True" << endl;
    } else {
        cout << "Value " << valueToFind2 << " found? False" << endl;
    }

    return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;

bool binSearch(int a[], int n, int value) {
    int low = 0;
    int high = n - 1;
    
    while (low <= high) {
        int mid = (low + high) / 2;
        
        if (value == a[mid]) {
            return true;
        } 
        else if (value < a[mid]) {
            high = mid - 1;
        } 
        else {
            low = mid + 1;
        }
    }
    
    return false;
}

int main() {
    int a[] = {10, 20, 30, 40, 50, 60, 70};
    int n = sizeof(a) / sizeof(a[0]);
    
    int valueToFind1 = 40;
    int valueToFind2 = 99;

    if (binSearch(a, n, valueToFind1)) {
        cout << "Value " << valueToFind1 << " found? True" << endl;
    } else {
        cout << "Value " << valueToFind1 << " found? False" << endl;
    }

    if (binSearch(a, n, valueToFind2)) {
        cout << "Value " << valueToFind2 << " found? True" << endl;
    } else {
        cout << "Value " << valueToFind2 << " found? False" << endl;
    }

    return 0;
}`,
        solutionRegex: "high\\s*=\\s*mid\\s*-\\s*1;.*?low\\s*=\\s*mid\\s*\\+\\s*1;",
        frames: [
          {
            description: "Target 1: Searching for 40 in [10, 20, 30, 40, 50, 60, 70]. low = 0, high = 6.",
            array: [10, 20, 30, 40, 50, 60, 70],
            pointers: { low: 0, high: 6, mid: 3 },
            highlightIndices: [3],
            variables: { target: 40, mid: 3, "a[mid]": 40, match: "true" }
          },
          {
            description: "Target 2: Searching for 99 in [10, 20, 30, 40, 50, 60, 70]. Halving repeatedly.",
            array: [10, 20, 30, 40, 50, 60, 70],
            pointers: { low: 4, high: 6, mid: 5 },
            highlightIndices: [5],
            variables: { target: 99, mid: 5, "a[mid]": 60, comparison: "60 < 99 -> low = 6" }
          },
          {
            description: "Check index 6 (70 < 99 -> low = 7). low > high -> Not Found (false).",
            array: [10, 20, 30, 40, 50, 60, 70],
            pointers: { low: 7, high: 6 },
            variables: { target: 99, low: 7, high: 6, return: "false" }
          }
        ]
      },
      {
        id: "t3_5",
        title: "Positional Search with Status Flag (positionsearch)",
        description: "Implement positionsearch(int arra[], int ele) using a global boolean status flag 'x' to signal whether the search target was found and return its exact index.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Linear iteration over n elements comparing each against ele. Best case O(1), worst case O(n).",
        initialCode: `#include <iostream>
using namespace std;

// تحديد حجم المصفوفة
#define size 5 

// متغير عام يستخدمه البرنامج كعلامة (Flag) لمعرفة هل تم إيجاد الرقم أم لا
bool x = false; 

// الإعلان عن الدالة
int positionsearch(int arra[], int ele);

int main() {
    // تعريف مصفوفة بقيم مختلفة
    int myArray[size] = {10, 20, 30, 40, 50};
    
    int searchNumber;
    int posres; // متغير لتخزين موقع الرقم (الفهرس)

    cout << "--- برنامج البحث عن موقع العنصر ---" << endl;
    cout << "عناصر المصفوفة هي: 10, 20, 30, 40, 50 (في المواقع من 0 إلى 4)\\n" << endl;

    // --- التجربة: البحث عن رقم موجود ---
    searchNumber = 30;
    cout << "جاري البحث عن الرقم: " << searchNumber << "..." << endl;
    
    // نتأكد أن x قيمتها false قبل بدء البحث
    x = false; 
    
    // استدعاء الدالة
    posres = positionsearch(myArray, searchNumber);
    
    // التحقق من النتيجة باستخدام المتغير x
    if(x == true) {
        cout << "النتيجة: الرقم " << searchNumber << " موجود في الفهرس رقم " << posres << "\\n" << endl;
    } else {
        cout << "النتيجة: الرقم " << searchNumber << " غير موجود في المصفوفة.\\n" << endl;
    }

    return 0;
}

// بناء دالة البحث عن الموقع (positionsearch)
int positionsearch(int arra[], int ele) {
    // TODO: تمر الحلقة على كل عنصر في المصفوفة
    // إذا وجدنا الرقم المطلوب، نغير المتغير العام x إلى true ونرجع الفهرس i
    for(int i = 0; i < size; i++) {
        
    }
    // إذا لم يجد الرقم، ستظل x بقيمتها false
    return -1;
}`,
        solutionCode: `#include <iostream>
using namespace std;

// تحديد حجم المصفوفة
#define size 5 

// متغير عام يستخدمه البرنامج كعلامة (Flag) لمعرفة هل تم إيجاد الرقم أم لا
bool x = false; 

// الإعلان عن الدالة
int positionsearch(int arra[], int ele);

int main() {
    // تعريف مصفوفة بقيم مختلفة
    int myArray[size] = {10, 20, 30, 40, 50};
    
    int searchNumber;
    int posres; // متغير لتخزين موقع الرقم (الفهرس)

    cout << "--- برنامج البحث عن موقع العنصر ---" << endl;
    cout << "عناصر المصفوفة هي: 10, 20, 30, 40, 50 (في المواقع من 0 إلى 4)\\n" << endl;

    // --- التجربة: البحث عن رقم موجود ---
    searchNumber = 30;
    cout << "جاري البحث عن الرقم: " << searchNumber << "..." << endl;
    
    // نتأكد أن x قيمتها false قبل بدء البحث
    x = false; 
    
    // استدعاء الدالة
    posres = positionsearch(myArray, searchNumber);
    
    // التحقق من النتيجة باستخدام المتغير x
    if(x == true) {
        cout << "النتيجة: الرقم " << searchNumber << " موجود في الفهرس رقم " << posres << "\\n" << endl;
    } else {
        cout << "النتيجة: الرقم " << searchNumber << " غير موجود في المصفوفة.\\n" << endl;
    }

    return 0;
}

// بناء دالة البحث عن الموقع (positionsearch)
int positionsearch(int arra[], int ele) {
    // تمر الحلقة على كل عنصر في المصفوفة
    for(int i = 0; i < size; i++) {
        // إذا وجدنا الرقم المطلوب
        if(arra[i] == ele) {
            x = true;  // نغير المتغير العام x إلى صحيح (دليل على نجاح البحث)
            return i;  // نُرجع موقع العنصر (الفهرس i) ونخرج من الدالة فوراً
        }	
    }
    // ملاحظة: إذا لم يجد الرقم، ستظل x بقيمتها false
    return -1; // تم إضافة إرجاع افتراضي لتجنب تحذيرات المترجم (Compiler)
}`,
        solutionRegex: "if\\s*\\(arra\\[i\\]\\s*==\\s*ele\\)\\s*\\{\\s*x\\s*=\\s*true;\\s*return\\s+i;\\s*\\}",
        frames: [
          {
            description: "Initial state: Searching for 30 in [10, 20, 30, 40, 50]. Global flag x = false.",
            array: [10, 20, 30, 40, 50],
            pointers: { i: 0 },
            highlightIndices: [0],
            variables: { i: 0, target: 30, "arra[0]": 10, flag_x: "false" }
          },
          {
            description: "Check index 1: arra[1] = 20 != 30. Moving next.",
            array: [10, 20, 30, 40, 50],
            pointers: { i: 1 },
            highlightIndices: [1],
            variables: { i: 1, "arra[1]": 20, flag_x: "false" }
          },
          {
            description: "Check index 2: arra[2] = 30 == 30! Target found. Set x = true and return index 2.",
            array: [10, 20, 30, 40, 50],
            pointers: { i: 2 },
            highlightIndices: [2],
            variables: { i: 2, "arra[2]": 30, flag_x: "true", returnIndex: 2 }
          }
        ]
      }
    ]
  },
  {
    id: "m6",
    title: "Module 6: OOP & Object Arrays — Lab 1",
    description: "Master C++ Class definitions, object arrays, linear search, template functions, and arithmetic encapsulation from Data Structure Lab 1 (Eng /Taghreed AL_Guhaly).",
    tasks: [
      {
        id: "t6_1",
        title: "Lab 1 Class: Car Records & Search (lab1.cpp)",
        description: "Define class `car` with `name[20]`, `model`, `price`, and `motor_size`. Store 3 cars, display formatted records, find the most modern car, search by name, and filter cars with name length > 3 characters (Lab 1: Class).",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Iterating through the array of cars for tabular printing, maximum model search, and linear string search requires O(n) time.",
        initialCode: `#include <iostream>
#include <iomanip>
#include <cstring>
#include <string>
#define size 3
using namespace std;

class car {
  char name[20];
  int model;
  float price;
  string motor_size;

public:
  void set(const char a[], int b, float c, string d) {
    strncpy(name, a, 19);
    name[19] = '\\0';
    model = b;
    price = c;
    motor_size = d;
  }

  void print() {
    cout << left << setw(10) << name << setw(10) << model
         << setw(10) << price << setw(10) << motor_size << endl;
  }

  int get() {
    return model;
  }

  // TODO: Return true if name matches search string n
  bool search(string n) {
    
  }

  // TODO: Print car details only if name has more than 3 characters (strlen(name) > 3)
  void name_three() {
    
  }
};

int main() {
  car c[size];
  c[0].set("Corolla", 2018, 15000, "4v");
  c[1].set("BMW", 2022, 45000, "6v");
  c[2].set("Camry", 2020, 22000, "4v");

  cout << "Car Records:\\n";
  cout << left << setw(10) << "Name" << setw(10) << "Model"
       << setw(10) << "Price" << setw(10) << "Motor" << endl;
  for (int i = 0; i < size; i++) {
    c[i].print();
  }

  // Find most modern car
  int maxModel = c[0].get();
  int modernIndex = 0;
  for (int i = 1; i < size; i++) {
    if (c[i].get() > maxModel) {
      maxModel = c[i].get();
      modernIndex = i;
    }
  }
  cout << "\\nMost modern car:\\n";
  c[modernIndex].print();

  // Search by name
  string target = "BMW";
  bool found = false;
  for (int i = 0; i < size; i++) {
    if (c[i].search(target)) {
      cout << "\\nCar '" << target << "' found at index [" << i << "]\\n";
      found = true;
      break;
    }
  }
  if (!found) cout << "\\nCar not found\\n";

  // Cars with name > 3 characters
  cout << "\\nCars with name > 3 characters:\\n";
  for (int i = 0; i < size; i++) {
    c[i].name_three();
  }

  return 0;
}`,
        solutionCode: `#include <iostream>
#include <iomanip>
#include <cstring>
#include <string>
#define size 3
using namespace std;

class car {
  char name[20];
  int model;
  float price;
  string motor_size;

public:
  void set(const char a[], int b, float c, string d) {
    strncpy(name, a, 19);
    name[19] = '\\0';
    model = b;
    price = c;
    motor_size = d;
  }

  void print() {
    cout << left << setw(10) << name << setw(10) << model
         << setw(10) << price << setw(10) << motor_size << endl;
  }

  int get() {
    return model;
  }

  bool search(string n) {
    return (name == n);
  }

  void name_three() {
    if (strlen(name) > 3) {
      print();
    }
  }
};

int main() {
  car c[size];
  c[0].set("Corolla", 2018, 15000, "4v");
  c[1].set("BMW", 2022, 45000, "6v");
  c[2].set("Camry", 2020, 22000, "4v");

  cout << "Car Records:\\n";
  cout << left << setw(10) << "Name" << setw(10) << "Model"
       << setw(10) << "Price" << setw(10) << "Motor" << endl;
  for (int i = 0; i < size; i++) {
    c[i].print();
  }

  int maxModel = c[0].get();
  int modernIndex = 0;
  for (int i = 1; i < size; i++) {
    if (c[i].get() > maxModel) {
      maxModel = c[i].get();
      modernIndex = i;
    }
  }
  cout << "\\nMost modern car:\\n";
  c[modernIndex].print();

  string target = "BMW";
  bool found = false;
  for (int i = 0; i < size; i++) {
    if (c[i].search(target)) {
      cout << "\\nCar '" << target << "' found at index [" << i << "]\\n";
      found = true;
      break;
    }
  }
  if (!found) cout << "\\nCar not found\\n";

  cout << "\\nCars with name > 3 characters:\\n";
  for (int i = 0; i < size; i++) {
    c[i].name_three();
  }

  return 0;
}`,
        solutionRegex: "return\\s*\\(?\\s*name\\s*==\\s*n\\s*\\)?\\s*;.*?strlen\\s*\\(\\s*name\\s*\\)\\s*>\\s*3",
        frames: [
          {
            description: "Object Array: 3 instances of `car` initialized in memory.",
            array: ["Corolla (2018)", "BMW (2022)", "Camry (2020)"],
            variables: { size: 3, "c[0]": "Corolla, $15k", "c[1]": "BMW, $45k", "c[2]": "Camry, $22k" }
          },
          {
            description: "Evaluating most modern car: Comparing models [2018, 2022, 2020]. Maximum is 2022 at index 1.",
            array: ["Corolla (2018)", "BMW (2022)", "Camry (2020)"],
            pointers: { modern: 1 },
            highlightIndices: [1],
            variables: { modernCar: "BMW", maxModel: 2022, index: 1 }
          },
          {
            description: "Linear Search: Searching for 'BMW'. Compared at index 0 (No), matched at index 1 (Yes)!",
            array: ["Corolla (2018)", "BMW (2022)", "Camry (2020)"],
            pointers: { match: 1 },
            highlightIndices: [1],
            variables: { searchTarget: "BMW", foundIndex: 1, result: "true" }
          },
          {
            description: "Name Length Filter: Checking strlen(name) > 3. Corolla (7 > 3: Yes), BMW (3 > 3: No), Camry (5 > 3: Yes).",
            array: ["Corolla (7 chars)", "BMW (3 chars)", "Camry (5 chars)"],
            highlightIndices: [0, 2],
            variables: { "Corolla": "Included", "BMW": "Excluded", "Camry": "Included" }
          }
        ]
      },
      {
        id: "t6_2",
        title: "Lab 1 Assignment: Model Filter & Template Reversal (lab1_assignment.cpp)",
        description: "Implement Data Structure Lab 1 Assignment: Filter cars with model > 2000, and use a C++ template function `template<typename T> void reverseArray(T original[], T reversed[], int n)` to reverse the array into a new array.",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Filtering and template array reversal both traverse the n elements in linear O(n) time.",
        initialCode: `#include <iostream>
#include <iomanip>
#include <cstring>
#include <string>
#define size 3
using namespace std;

class car {
  char name[20];
  int model;
  float price;
  string motor_size;

public:
  void set(const char a[], int b, float c, string d) {
    strncpy(name, a, 19);
    name[19] = '\\0';
    model = b;
    price = c;
    motor_size = d;
  }

  void print() {
    cout << left << setw(10) << name << setw(10) << model
         << setw(10) << price << setw(10) << motor_size << endl;
  }

  int getModel() {
    return model;
  }
};

// TODO: Implement generic C++ template function to reverse array of any type T into a new array
template <typename T>
void reverseArray(T src[], T dest[], int n) {
  
}

int main() {
  car c[size];
  c[0].set("Sunny", 1998, 4000, "1.6L");
  c[1].set("Corolla", 2019, 18000, "2.0L");
  c[2].set("Prado", 2023, 65000, "4.0L");

  // 1. Print cars with model > 2000
  cout << "Cars with model > 2000:\\n";
  for (int i = 0; i < size; i++) {
    if (c[i].getModel() > 2000) {
      c[i].print();
    }
  }

  // 2. Reverse cars using generic template function
  car reversedCars[size];
  reverseArray(c, reversedCars, size);

  cout << "\\nOriginal Cars Before Reversal:\\n";
  for (int i = 0; i < size; i++) c[i].print();

  cout << "\\nNew Array After Reversal:\\n";
  for (int i = 0; i < size; i++) reversedCars[i].print();

  return 0;
}`,
        solutionCode: `#include <iostream>
#include <iomanip>
#include <cstring>
#include <string>
#define size 3
using namespace std;

class car {
  char name[20];
  int model;
  float price;
  string motor_size;

public:
  void set(const char a[], int b, float c, string d) {
    strncpy(name, a, 19);
    name[19] = '\\0';
    model = b;
    price = c;
    motor_size = d;
  }

  void print() {
    cout << left << setw(10) << name << setw(10) << model
         << setw(10) << price << setw(10) << motor_size << endl;
  }

  int getModel() {
    return model;
  }
};

template <typename T>
void reverseArray(T src[], T dest[], int n) {
  for (int i = 0; i < n; i++) {
    dest[i] = src[n - 1 - i];
  }
}

int main() {
  car c[size];
  c[0].set("Sunny", 1998, 4000, "1.6L");
  c[1].set("Corolla", 2019, 18000, "2.0L");
  c[2].set("Prado", 2023, 65000, "4.0L");

  cout << "Cars with model > 2000:\\n";
  for (int i = 0; i < size; i++) {
    if (c[i].getModel() > 2000) {
      c[i].print();
    }
  }

  car reversedCars[size];
  reverseArray(c, reversedCars, size);

  cout << "\\nOriginal Cars Before Reversal:\\n";
  for (int i = 0; i < size; i++) c[i].print();

  cout << "\\nNew Array After Reversal:\\n";
  for (int i = 0; i < size; i++) reversedCars[i].print();

  return 0;
}`,
        solutionRegex: "template\\s*<.*?typename|class\\s+T>\\s*void\\s+reverseArray.*?dest\\[i\\]\\s*=\\s*src\\[n\\s*-\\s*1\\s*-\\s*i\\]|dest\\[n\\s*-\\s*1\\s*-\\s*i\\]\\s*=\\s*src\\[i\\]",
        frames: [
          {
            description: "Initial Array: [Sunny (1998), Corolla (2019), Prado (2023)].",
            array: ["Sunny (1998)", "Corolla (2019)", "Prado (2023)"],
            variables: { "c[0]": "1998", "c[1]": "2019", "c[2]": "2023" }
          },
          {
            description: "Filter Model > 2000: Sunny (1998 <= 2000: Skip), Corolla (2019 > 2000: Match), Prado (2023 > 2000: Match).",
            array: ["Sunny (1998)", "Corolla (2019)", "Prado (2023)"],
            highlightIndices: [1, 2],
            variables: { filteredMatches: "Corolla (2019), Prado (2023)" }
          },
          {
            description: "Template Reversal: dest[0] = src[2] ('Prado').",
            array: ["Prado (2023)", null, null],
            pointers: { dest: 0, src: 2 },
            highlightIndices: [0],
            variables: { copied: "Prado -> dest[0]" }
          },
          {
            description: "Template Reversal: dest[1] = src[1] ('Corolla').",
            array: ["Prado (2023)", "Corolla (2019)", null],
            pointers: { dest: 1, src: 1 },
            highlightIndices: [1],
            variables: { copied: "Corolla -> dest[1]" }
          },
          {
            description: "Template Reversal Complete: dest[2] = src[0] ('Sunny'). Reversed array: [Prado, Corolla, Sunny].",
            array: ["Prado (2023)", "Corolla (2019)", "Sunny (1998)"],
            pointers: { dest: 2, src: 0 },
            highlightIndices: [0, 1, 2],
            variables: { status: "Reversal Successful" }
          }
        ]
      },
      {
        id: "t6_3",
        title: "OOP Calculator Class (class.cpp)",
        description: "Implement the `Calculator` class with private data members `int x, y; float s;`, parameterized constructor, arithmetic methods (`sum`, `sub`, `mult`, `div`), `set()`, and `get()`.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(1)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Encapsulated arithmetic member operations execute in O(1) constant time without loops.",
        initialCode: `#include <iostream>
using namespace std;

class Calculator {
private:
  int x, y;
  float s;

public:
  Calculator(int a, int b) {
    x = a;
    y = b;
    s = 0.0f;
  }

  void set(int a, int b) {
    x = a;
    y = b;
  }

  // TODO: Compute x + y and store in s
  void sum() {
    
  }

  // TODO: Compute x - y and store in s
  void sub() {
    
  }

  // TODO: Compute x * y and store in s
  void mult() {
    
  }

  // TODO: Compute x / (float)y and store in s (guard against division by zero)
  void div() {
    
  }

  float get() {
    return s;
  }
};

int main() {
  Calculator calc(10, 4);

  calc.sum();
  cout << "Sum: " << calc.get() << endl;

  calc.sub();
  cout << "Sub: " << calc.get() << endl;

  calc.mult();
  cout << "Mult: " << calc.get() << endl;

  calc.div();
  cout << "Div: " << calc.get() << endl;

  return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;

class Calculator {
private:
  int x, y;
  float s;

public:
  Calculator(int a, int b) {
    x = a;
    y = b;
    s = 0.0f;
  }

  void set(int a, int b) {
    x = a;
    y = b;
  }

  void sum() {
    s = x + y;
  }

  void sub() {
    s = x - y;
  }

  void mult() {
    s = x * y;
  }

  void div() {
    if (y != 0) {
      s = (float)x / y;
    } else {
      s = 0;
    }
  }

  float get() {
    return s;
  }
};

int main() {
  Calculator calc(10, 4);

  calc.sum();
  cout << "Sum: " << calc.get() << endl;

  calc.sub();
  cout << "Sub: " << calc.get() << endl;

  calc.mult();
  cout << "Mult: " << calc.get() << endl;

  calc.div();
  cout << "Div: " << calc.get() << endl;

  return 0;
}`,
        solutionRegex: "s\\s*=\\s*x\\s*\\+\\s*y;.*?s\\s*=\\s*x\\s*-\\s*y;.*?s\\s*=\\s*x\\s*\\*\\s*y;.*?s\\s*=.*?x\\s*/\\s*y",
        frames: [
          {
            description: "Calculator instance instantiated in memory: x = 10, y = 4, s = 0.0.",
            array: [10, 4, 0.0],
            variables: { x: 10, y: 4, s: "0.0", state: "Initialized" }
          },
          {
            description: "calc.sum(): Computes 10 + 4 = 14. s updated to 14.0.",
            array: [10, 4, 14.0],
            highlightIndices: [2],
            variables: { operation: "10 + 4", result_s: "14.0" }
          },
          {
            description: "calc.sub(): Computes 10 - 4 = 6. s updated to 6.0.",
            array: [10, 4, 6.0],
            highlightIndices: [2],
            variables: { operation: "10 - 4", result_s: "6.0" }
          },
          {
            description: "calc.mult(): Computes 10 * 4 = 40. s updated to 40.0.",
            array: [10, 4, 40.0],
            highlightIndices: [2],
            variables: { operation: "10 * 4", result_s: "40.0" }
          },
          {
            description: "calc.div(): Computes 10 / 4 = 2.5. s updated to 2.5.",
            array: [10, 4, 2.5],
            highlightIndices: [2],
            variables: { operation: "10 / 4", result_s: "2.5" }
          }
        ]
      },
      {
        id: "t6_4",
        title: "Interactive Car Inventory: 5-Feature Management System",
        description: "Implement class car with name[30], model, price, and motor_size. Support interactive input(), print(), finding the most modern car, searching by name, and filtering names with length > 3.",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Linear traversal of 3 car objects runs in O(n) time with O(1) auxiliary space.",
        initialCode: `#include <iostream>
#include <string>
using namespace std;

class car
{
public:
    char name[30];
    int model;
    float price;
    string motor_size;

    void input()
    {
        cout << "Enter car name: ";
        cin >> name;

        cout << "Enter car model: ";
        cin >> model;

        cout << "Enter car price: ";
        cin >> price;

        cout << "Enter motor size: ";
        cin >> motor_size;
    }

    void print()
    {
        cout << "Name: " << name << endl;
        cout << "Model: " << model << endl;
        cout << "Price: " << price << endl;
        cout << "Motor Size: " << motor_size << endl;
    }
};

int main()
{
    car cars[3];

    // 1. Enter information for three cars
    // Using pre-populated sample data for automated simulation
    cout << "Enter information for 3 cars (simulated)...\\n";

    // 2. Print cars' information
    cout << "\\n===== All Cars =====\\n";
    // TODO: Loop from i = 0 to 2 and print each car
    

    // 3. Print the most modern car
    int modern = 0;
    // TODO: Loop from 1 to 2; update modern if cars[i].model > cars[modern].model
    

    cout << "\\n===== Most Modern Car =====\\n";
    cars[modern].print();

    // 4. Search for a specific car name
    char searchName[30] = "BMW";
    cout << "\\nEnter car name to search: " << searchName << endl;
    bool found = false;
    // TODO: Search for searchName and print matching car
    

    // 5. Print cars whose names have more than 3 characters
    cout << "\\n===== Names More Than 3 Characters =====\\n";
    // TODO: Filter cars with string(cars[i].name).length() > 3
    

    return 0;
}`,
        solutionCode: `#include <iostream>
#include <string>
using namespace std;

class car
{
public:
    char name[30];
    int model;
    float price;
    string motor_size;

    void input()
    {
        cout << "Enter car name: ";
        cin >> name;

        cout << "Enter car model: ";
        cin >> model;

        cout << "Enter car price: ";
        cin >> price;

        cout << "Enter motor size: ";
        cin >> motor_size;
    }

    void print()
    {
        cout << "Name: " << name << endl;
        cout << "Model: " << model << endl;
        cout << "Price: " << price << endl;
        cout << "Motor Size: " << motor_size << endl;
    }
};

int main()
{
    car cars[3];

    // Pre-assigned sample cars
    cars[0].model = 2018; cars[0].price = 15000; cars[0].motor_size = "4v";
    for(int j = 0; "Corolla"[j]; j++) { cars[0].name[j] = "Corolla"[j]; cars[0].name[j+1] = '\\0'; }

    cars[1].model = 2024; cars[1].price = 48000; cars[1].motor_size = "6v";
    for(int j = 0; "BMW"[j]; j++) { cars[1].name[j] = "BMW"[j]; cars[1].name[j+1] = '\\0'; }

    cars[2].model = 2021; cars[2].price = 24000; cars[2].motor_size = "4v";
    for(int j = 0; "Camry"[j]; j++) { cars[2].name[j] = "Camry"[j]; cars[2].name[j+1] = '\\0'; }

    // 2. Print cars' information
    cout << "\\n===== All Cars =====\\n";
    for (int i = 0; i < 3; i++)
    {
        cars[i].print();
        cout << endl;
    }

    // 3. Print the most modern car
    int modern = 0;
    for (int i = 1; i < 3; i++)
    {
        if (cars[i].model > cars[modern].model)
        {
            modern = i;
        }
    }

    cout << "\\n===== Most Modern Car =====\\n";
    cars[modern].print();

    // 4. Search for a specific car name
    char searchName[30] = "BMW";
    cout << "\\nEnter car name to search: " << searchName << endl;
    bool found = false;
    for (int i = 0; i < 3; i++)
    {
        if (string(cars[i].name) == string(searchName))
        {
            cout << "\\nCar Found:\\n";
            cars[i].print();
            found = true;
        }
    }

    if (!found)
    {
        cout << "Car not found.\\n";
    }

    // 5. Print cars whose names have more than 3 characters
    cout << "\\n===== Names More Than 3 Characters =====\\n";
    for (int i = 0; i < 3; i++)
    {
        if (string(cars[i].name).length() > 3)
        {
            cars[i].print();
            cout << endl;
        }
    }

    return 0;
}`,
        solutionRegex: "cars\\[i\\]\\.model\\s*>\\s*cars\\[modern\\]\\.model.*?string\\(cars\\[i\\]\\.name\\)\\s*==\\s*string\\(searchName\\).*?length\\(\\)\\s*>\\s*3",
        frames: [
          {
            description: "Cars Array initialized with 3 instances: [Corolla (2018), BMW (2024), Camry (2021)]",
            array: [2018, 2024, 2021],
            variables: { "cars[0]": "Corolla, 2018", "cars[1]": "BMW, 2024", "cars[2]": "Camry, 2021" }
          },
          {
            description: "Most Modern Check: Comparing models. Index 1 (2024) > Index 0 (2018). Most Modern: BMW (2024).",
            array: [2018, 2024, 2021],
            pointers: { modern: 1 },
            highlightIndices: [1],
            variables: { modernIndex: 1, modernModel: 2024, name: "BMW" }
          },
          {
            description: "Search for 'BMW': Matched at index 1! Car found.",
            array: [2018, 2024, 2021],
            pointers: { match: 1 },
            highlightIndices: [1],
            variables: { searchTarget: "BMW", status: "Found" }
          },
          {
            description: "Filter length > 3 characters: 'Corolla' (7 chars) and 'Camry' (5 chars) qualify; 'BMW' (3 chars) skipped.",
            array: [2018, 2024, 2021],
            highlightIndices: [0, 2],
            variables: { qualified: "Corolla (7), Camry (5)", filteredOut: "BMW (3)" }
          }
        ]
      }
    ]
  },
  {
    id: "m7",
    title: "Module 7: The Stack Data Structure",
    description: "Static Stack implementation using arrays with top pointer, reversal algorithms, palindrome checkers, delimiter balancing, and infix to prefix translation.",
    tasks: [
      {
        id: "t7_1",
        title: "Push and Pop",
        description: "Write `Push()` with Overflow check and `Pop()` with Underflow check.",
        difficulty: "Advanced",
        optimalTimeComplexity: "O(1)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Array-based stack push and pop perform direct pointer manipulation at the top index in O(1) time.",
        initialCode: `#include <iostream>\nusing namespace std;\n#define size 5\n\nclass Stack {\nprivate:\n  int list[size];\n  int stackTop;\npublic:\n  Stack() { stackTop = -1; }\n\n  bool Push(int data) {\n    // TODO: Overflow check (if stackTop < size - 1)\n    if ( ) {\n      // TODO: Increment top and assign data\n      \n      \n      return true;\n    }\n    return false;\n  }\n\n  int Pop() {\n    int t;\n    // TODO: Underflow check\n    if ( ) {\n      // TODO: Save top element, decrement top, return element\n      \n      \n      return t;\n    }\n    return -1;\n  }\n};`,
        solutionCode: `#include <iostream>\nusing namespace std;\n#define size 5\n\nclass Stack {\nprivate:\n  int list[size];\n  int stackTop;\npublic:\n  Stack() { stackTop = -1; }\n\n  bool Push(int data) {\n    // TODO: Overflow check (if stackTop < size - 1)\n    if (stackTop < size - 1) {\n      // TODO: Increment top and assign data\n      stackTop++;\n      list[stackTop] = data;\n      return true;\n    }\n    return false;\n  }\n\n  int Pop() {\n    int t;\n    // TODO: Underflow check\n    if (stackTop >= 0) {\n      // TODO: Save top element, decrement top, return element\n      t = list[stackTop];\n      stackTop--;\n      return t;\n    }\n    return -1;\n  }\n};`,
        solutionRegex: "stackTop.*?size.*?list\\[stackTop\\]\\s*=\\s*data\\s*;.*?stackTop.*?0.*?t\\s*=\\s*list\\[stackTop\\]\\s*;.*?stackTop.*?;",
        frames: [
          { description: "Initial State (Empty)", array: [null, null, null, null, null], pointers: { stackTop: -1 } },
          { description: "Push(10)", array: [10, null, null, null, null], pointers: { stackTop: 0 }, highlightIndices: [0] },
          { description: "Push(20)", array: [10, 20, null, null, null], pointers: { stackTop: 1 }, highlightIndices: [1] },
          { description: "Pop() returns 20", array: [10, 20, null, null, null], pointers: { stackTop: 0 }, variables: { returned: 20 } }
        ]
      },
      {
        id: "t7_2",
        title: "Stack Peek & isEmpty",
        description: "Implement `Top()` to inspect the current top element without removal, and `isEmpty()`.",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(1)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Inspecting stackTop and checking if stackTop == -1 both execute in O(1) constant time.",
        initialCode: `#include <iostream>\nusing namespace std;\n#define size 5\n\nclass Stack {\nprivate:\n  int list[size];\n  int stackTop;\npublic:\n  Stack() { stackTop = -1; }\n  \n  bool isEmpty() {\n    // TODO: Return true if stack is empty\n    \n  }\n  \n  int Top() {\n    // TODO: Return top element or -1 if empty\n    \n  }\n};`,
        solutionCode: `#include <iostream>\nusing namespace std;\n#define size 5\n\nclass Stack {\nprivate:\n  int list[size];\n  int stackTop;\npublic:\n  Stack() { stackTop = -1; }\n  \n  bool isEmpty() {\n    // TODO: Return true if stack is empty\n    return stackTop == -1;\n  }\n  \n  int Top() {\n    // TODO: Return top element or -1 if empty\n    if (isEmpty()) return -1;\n    return list[stackTop];\n  }\n};`,
        solutionRegex: "stackTop\\s*==\\s*-1.*?list\\[stackTop\\]",
        frames: [
          { description: "Stack populated with [5, 12, 18], stackTop = 2", array: [5, 12, 18, null, null], pointers: { stackTop: 2 }, highlightIndices: [2], variables: { stackTop: 2, isEmpty: "false", topValue: 18 } }
        ]
      },
      {
        id: "t7_3",
        title: "Stack Fundamentals: push, pop & peek (Array Implementation)",
        description: "Implement global stack with push(int), pop(), and peek(), handling Stack Overflow at SIZE - 1 and Stack Underflow at -1.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(1)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Every push, pop, and peek operates strictly on the top pointer in O(1) constant time.",
        initialCode: `#include <iostream>
using namespace std;

#define SIZE 5

int stack[SIZE];
int top = -1;

void push(int value)
{
    // TODO: Check Stack Overflow
    if(top == SIZE - 1)
    {
        cout << "Stack Overflow\\n";
        return;
    }

    // TODO: Increment top and assign value
    
}

void pop()
{
    // TODO: Check Stack Underflow
    if(top == -1)
    {
        cout << "Stack Underflow\\n";
        return;
    }

    cout << "Popped element = " << stack[top] << endl;
    // TODO: Decrement top
    
}

void peek()
{
    if(top == -1)
    {
        cout << "Stack is empty\\n";
        return;
    }

    cout << "Top element = " << stack[top] << endl;
}

int main()
{
    push(10);
    push(20);
    push(30);

    peek();

    pop();

    peek();

    return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;

#define SIZE 5

int stack[SIZE];
int top = -1;

void push(int value)
{
    if(top == SIZE - 1)
    {
        cout << "Stack Overflow\\n";
        return;
    }

    top++;
    stack[top] = value;
}

void pop()
{
    if(top == -1)
    {
        cout << "Stack Underflow\\n";
        return;
    }

    cout << "Popped element = " << stack[top] << endl;
    top--;
}

void peek()
{
    if(top == -1)
    {
        cout << "Stack is empty\\n";
        return;
    }

    cout << "Top element = " << stack[top] << endl;
}

int main()
{
    push(10);
    push(20);
    push(30);

    peek();

    pop();

    peek();

    return 0;
}`,
        solutionRegex: "top\\s*\\+\\+;\\s*stack\\[top\\]\\s*=\\s*value;.*?top--;",
        frames: [
          {
            description: "Initial Stack: Empty (top = -1, capacity = 5)",
            array: [null, null, null, null, null],
            pointers: { top: -1 },
            variables: { top: -1, status: "Empty" }
          },
          {
            description: "push(10), push(20), push(30): Stack holds [10, 20, 30]. top = 2.",
            array: [10, 20, 30, null, null],
            pointers: { top: 2 },
            highlightIndices: [0, 1, 2],
            variables: { top: 2, topValue: 30 }
          },
          {
            description: "peek(): Top element inspected -> 30.",
            array: [10, 20, 30, null, null],
            pointers: { top: 2 },
            highlightIndices: [2],
            variables: { inspected: 30 }
          },
          {
            description: "pop(): Top element (30) removed. top decremented to 1.",
            array: [10, 20, null, null, null],
            pointers: { top: 1 },
            highlightIndices: [1],
            variables: { popped: 30, top: 1, topValue: 20 }
          },
          {
            description: "peek(): Top element is now 20.",
            array: [10, 20, null, null, null],
            pointers: { top: 1 },
            highlightIndices: [1],
            variables: { currentTop: 20 }
          }
        ]
      },
      {
        id: "t7_4",
        title: "Palindrome Verification Using Stack",
        description: "Determine whether a string is a palindrome by pushing its characters onto a LIFO stack and popping them to construct the reversed string.",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Pushing and popping n characters runs in O(n) linear time with O(n) space for the stack.",
        initialCode: `#include <iostream>
#include <string>
using namespace std;

#define SIZE 100

char stack[SIZE];
int top = -1;

void push(char ch)
{
    top++;
    stack[top] = ch;
}

char pop()
{
    char ch = stack[top];
    top--;
    return ch;
}

int main()
{
    string str = "radar";
    string reverse = "";

    cout << "Testing string: " << str << endl;

    // TODO: Step 1 - Push each character of str into the stack
    

    // TODO: Step 2 - Pop characters from stack and append to reverse string
    

    // TODO: Step 3 - Compare str with reverse
    if(str == reverse)
        cout << "The string is Palindrome\\n";
    else
        cout << "The string is not Palindrome\\n";

    return 0;
}`,
        solutionCode: `#include <iostream>
#include <string>
using namespace std;

#define SIZE 100

char stack[SIZE];
int top = -1;

void push(char ch)
{
    top++;
    stack[top] = ch;
}

char pop()
{
    char ch = stack[top];
    top--;
    return ch;
}

int main()
{
    string str = "radar";
    string reverse = "";

    cout << "Testing string: " << str << endl;

    // Push characters into stack
    for(int i = 0; i < str.length(); i++)
    {
        push(str[i]);
    }

    // Pop characters to create reverse string
    while(top != -1)
    {
        reverse += pop();
    }

    if(str == reverse)
        cout << "The string is Palindrome\\n";
    else
        cout << "The string is not Palindrome\\n";

    return 0;
}`,
        solutionRegex: "push\\(str\\[i\\]\\).*?reverse\\s*\\+=\\s*pop\\(\\);.*?if\\s*\\(str\\s*==\\s*reverse\\)",
        frames: [
          {
            description: "Input String: 'radar'. Length = 5.",
            variables: { str: "radar", reverse: "", top: -1 }
          },
          {
            description: "Push characters: 'r', 'a', 'd', 'a', 'r' pushed to stack in forward order.",
            array: ['r', 'a', 'd', 'a', 'r'],
            pointers: { top: 4 },
            highlightIndices: [0, 1, 2, 3, 4],
            variables: { top: 4, stackContent: "r -> a -> d -> a -> r (top)" }
          },
          {
            description: "Pop characters: LIFO order extracts 'r', 'a', 'd', 'a', 'r'. reverse = 'radar'.",
            variables: { reverse: "radar", top: -1 }
          },
          {
            description: "Comparison: str ('radar') == reverse ('radar') -> Result: The string is Palindrome!",
            variables: { palindrome: "true", result: "The string is Palindrome" }
          }
        ]
      },
      {
        id: "t7_5",
        title: "Delimiter Matching & Balanced Parentheses",
        description: "Verify that all opening delimiters '(', '[', '{' have correctly ordered and matching closing delimiters ')', ']', '}' using a stack.",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Each character is pushed or popped at most once, executing in linear O(n) time.",
        initialCode: `#include <iostream>
#include <string>
using namespace std;

#define SIZE 100

char stack[SIZE];
int top = -1;

void push(char value)
{
    top++;
    stack[top] = value;
}

char pop()
{
    char value = stack[top];
    top--;
    return value;
}

bool isMatching(char open, char close)
{
    if(open == '(' && close == ')')
        return true;

    if(open == '[' && close == ']')
        return true;

    if(open == '{' && close == '}')
        return true;

    return false;
}

bool check(string expression)
{
    // TODO: Traverse expression
    // If opening delimiter '(', '[', '{' -> push(ch)
    // If closing delimiter ')', ']', '}' -> check underflow then pop and verify isMatching
    
    return top == -1;
}

int main()
{
    string expression = "{[()]}";
    cout << "Testing expression: " << expression << endl;

    if(check(expression))
        cout << "Delimiters are matched\\n";
    else
        cout << "Delimiters are not matched\\n";

    return 0;
}`,
        solutionCode: `#include <iostream>
#include <string>
using namespace std;

#define SIZE 100

char stack[SIZE];
int top = -1;

void push(char value)
{
    top++;
    stack[top] = value;
}

char pop()
{
    char value = stack[top];
    top--;
    return value;
}

bool isMatching(char open, char close)
{
    if(open == '(' && close == ')')
        return true;

    if(open == '[' && close == ']')
        return true;

    if(open == '{' && close == '}')
        return true;

    return false;
}

bool check(string expression)
{
    for(int i = 0; i < expression.length(); i++)
    {
        char ch = expression[i];

        if(ch == '(' || ch == '[' || ch == '{')
        {
            push(ch);
        }
        else if(ch == ')' || ch == ']' || ch == '}')
        {
            if(top == -1)
                return false;

            char open = pop();

            if(!isMatching(open, ch))
                return false;
        }
    }

    return top == -1;
}

int main()
{
    string expression = "{[()]}";
    cout << "Testing expression: " << expression << endl;

    if(check(expression))
        cout << "Delimiters are matched\\n";
    else
        cout << "Delimiters are not matched\\n";

    return 0;
}`,
        solutionRegex: "if\\s*\\(ch\\s*==\\s*'\\('.*?push\\(ch\\).*?char\\s+open\\s*=\\s*pop\\(\\);.*?isMatching\\(open,\\s*ch\\).*?return\\s+top\\s*==\\s*-1",
        frames: [
          {
            description: "Expression: '{[()]}'. Stack begins empty.",
            variables: { expression: "{[()]}", top: -1 }
          },
          {
            description: "Process '{', '[', '(': Pushed to stack. Stack = ['{', '[', '('] with top = 2.",
            array: ['{', '[', '(', null],
            pointers: { top: 2 },
            highlightIndices: [0, 1, 2],
            variables: { stack: "{ -> [ -> (" }
          },
          {
            description: "Process ')': Popped '(' matches ')'! Stack remains ['{', '['].",
            array: ['{', '[', null, null],
            pointers: { top: 1 },
            highlightIndices: [1],
            variables: { matched: "()", top: 1 }
          },
          {
            description: "Process ']': Popped '[' matches ']'! Stack remains ['{'].",
            array: ['{', null, null, null],
            pointers: { top: 0 },
            highlightIndices: [0],
            variables: { matched: "[]", top: 0 }
          },
          {
            description: "Process '}': Popped '{' matches '}'! Stack is now empty (top == -1). Delimiters matched!",
            pointers: { top: -1 },
            variables: { result: "Delimiters are matched", matched: "{}" }
          }
        ]
      },
      {
        id: "t7_6",
        title: "Reverse a Stack Using a Second Auxiliary Stack",
        description: "Transfer all elements from stack1 to stack2 using pop1() and push2() so that elements in stack2 end up in reversed order.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Popping n elements from stack1 and pushing onto stack2 takes O(n) linear time.",
        initialCode: `#include <iostream>
using namespace std;

#define SIZE 5

int stack1[SIZE];
int stack2[SIZE];

int top1 = -1;
int top2 = -1;

void push1(int value)
{
    if(top1 == SIZE - 1)
    {
        cout << "Stack 1 Overflow\\n";
        return;
    }

    top1++;
    stack1[top1] = value;
}

int pop1()
{
    int value = stack1[top1];
    top1--;
    return value;
}

void push2(int value)
{
    if(top2 == SIZE - 1)
    {
        cout << "Stack 2 Overflow\\n";
        return;
    }

    top2++;
    stack2[top2] = value;
}

void printStack2()
{
    for(int i = top2; i >= 0; i--)
        cout << stack2[i] << " ";

    cout << endl;
}

int main()
{
    push1(10);
    push1(20);
    push1(30);
    push1(40);
    push1(50);

    // TODO: Transfer elements from stack1 to stack2
    // While top1 != -1, pop from stack1 and push into stack2
    

    cout << "Reversed Stack:\\n";
    printStack2();

    return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;

#define SIZE 5

int stack1[SIZE];
int stack2[SIZE];

int top1 = -1;
int top2 = -1;

void push1(int value)
{
    if(top1 == SIZE - 1)
    {
        cout << "Stack 1 Overflow\\n";
        return;
    }

    top1++;
    stack1[top1] = value;
}

int pop1()
{
    int value = stack1[top1];
    top1--;
    return value;
}

void push2(int value)
{
    if(top2 == SIZE - 1)
    {
        cout << "Stack 2 Overflow\\n";
        return;
    }

    top2++;
    stack2[top2] = value;
}

void printStack2()
{
    for(int i = top2; i >= 0; i--)
        cout << stack2[i] << " ";

    cout << endl;
}

int main()
{
    push1(10);
    push1(20);
    push1(30);
    push1(40);
    push1(50);

    while(top1 != -1)
    {
        int value = pop1();
        push2(value);
    }

    cout << "Reversed Stack:\\n";
    printStack2();

    return 0;
}`,
        solutionRegex: "while\\s*\\(top1\\s*!=\\s*-1\\)\\s*\\{?\\s*(?:int\\s+value\\s*=\\s*)?pop1\\(\\);?\\s*push2\\(value\\);?\\}?",
        frames: [
          {
            description: "Initial State: stack1 = [10, 20, 30, 40, 50] (top1 = 4). stack2 is empty (top2 = -1).",
            array: [10, 20, 30, 40, 50],
            pointers: { top1: 4, top2: -1 },
            highlightIndices: [4],
            variables: { top1: 4, top2: -1 }
          },
          {
            description: "Step 1: pop1() gives 50 -> push2(50). stack2 = [50].",
            array: [10, 20, 30, 40, null],
            pointers: { top1: 3, top2: 0 },
            highlightIndices: [3],
            variables: { popped: 50, top1: 3, top2: 0 }
          },
          {
            description: "Step 2: pop1() gives 40 -> push2(40). stack2 = [50, 40].",
            array: [10, 20, 30, null, null],
            pointers: { top1: 2, top2: 1 },
            highlightIndices: [2],
            variables: { popped: 40, top1: 2, top2: 1 }
          },
          {
            description: "Step 3-5: Remaining elements [30, 20, 10] popped into stack2.",
            array: [50, 40, 30, 20, 10],
            pointers: { top1: -1, top2: 4 },
            highlightIndices: [0, 1, 2, 3, 4],
            variables: { top1: -1, top2: 4, "stack2 (top to bottom)": "10, 20, 30, 40, 50" }
          },
          {
            description: "Reversal Complete: Reading stack2 from top2 down yields [10, 20, 30, 40, 50].",
            array: [50, 40, 30, 20, 10],
            pointers: { top2: 4 },
            variables: { result: "Reversed Stack Printed" }
          }
        ]
      },
      {
        id: "t7_7",
        title: "Infix to Prefix Expression Conversion Using Stack",
        description: "Convert an infix arithmetic expression into prefix notation using operator priority, parentheses inversion, and infixToPostfix.",
        difficulty: "Advanced",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Reversing strings and performing shunting-yard style operator stack scanning runs in O(n) linear time.",
        initialCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

#define SIZE 100

char stack[SIZE];
int top = -1;

void push(char ch)
{
    top++;
    stack[top] = ch;
}

char pop()
{
    char ch = stack[top];
    top--;
    return ch;
}

char peek()
{
    return stack[top];
}

int priority(char ch)
{
    if(ch == '^')
        return 3;

    if(ch == '*' || ch == '/')
        return 2;

    if(ch == '+' || ch == '-')
        return 1;

    return 0;
}

bool isOperator(char ch)
{
    return ch == '+' || ch == '-' ||
           ch == '*' || ch == '/' ||
           ch == '^';
}

string infixToPostfix(string exp)
{
    string result = "";

    // TODO: Process each character in exp:
    // 1. If alphanumeric -> append to result
    // 2. If '(' -> push('(')
    // 3. If ')' -> pop until '('
    // 4. If operator -> pop higher/equal priority operators, then push(ch)
    
    return result;
}

string infixToPrefix(string exp)
{
    // Step 1: Reverse the infix expression
    reverse(exp.begin(), exp.end());

    // Step 2: Swap '(' and ')'
    for(int i = 0; i < exp.length(); i++)
    {
        if(exp[i] == '(')
            exp[i] = ')';
        else if(exp[i] == ')')
            exp[i] = '(';
    }

    // Step 3: Get postfix of modified expression
    string postfix = infixToPostfix(exp);

    // Step 4: Reverse postfix to obtain prefix
    reverse(postfix.begin(), postfix.end());

    return postfix;
}

int main()
{
    string expression = "(A+B)*(C-D)";

    cout << "Infix expression: " << expression << endl;
    cout << "Prefix expression = "
         << infixToPrefix(expression) << endl;

    return 0;
}`,
        solutionCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

#define SIZE 100

char stack[SIZE];
int top = -1;

void push(char ch)
{
    top++;
    stack[top] = ch;
}

char pop()
{
    char ch = stack[top];
    top--;
    return ch;
}

char peek()
{
    return stack[top];
}

int priority(char ch)
{
    if(ch == '^')
        return 3;

    if(ch == '*' || ch == '/')
        return 2;

    if(ch == '+' || ch == '-')
        return 1;

    return 0;
}

bool isOperator(char ch)
{
    return ch == '+' || ch == '-' ||
           ch == '*' || ch == '/' ||
           ch == '^';
}

string infixToPostfix(string exp)
{
    string result = "";

    for(int i = 0; i < exp.length(); i++)
    {
        char ch = exp[i];

        if(isalnum(ch))
        {
            result += ch;
        }
        else if(ch == '(')
        {
            push(ch);
        }
        else if(ch == ')')
        {
            while(top != -1 && peek() != '(')
            {
                result += pop();
            }

            if(top != -1)
                pop();
        }
        else if(isOperator(ch))
        {
            while(top != -1 &&
                  priority(peek()) >= priority(ch))
            {
                result += pop();
            }

            push(ch);
        }
    }

    while(top != -1)
    {
        result += pop();
    }

    return result;
}

string infixToPrefix(string exp)
{
    reverse(exp.begin(), exp.end());

    for(int i = 0; i < exp.length(); i++)
    {
        if(exp[i] == '(')
            exp[i] = ')';

        else if(exp[i] == ')')
            exp[i] = '(';
    }

    string postfix = infixToPostfix(exp);

    reverse(postfix.begin(), postfix.end());

    return postfix;
}

int main()
{
    string expression = "(A+B)*(C-D)";

    cout << "Infix expression: " << expression << endl;
    cout << "Prefix expression = "
         << infixToPrefix(expression) << endl;

    return 0;
}`,
        solutionRegex: "isalnum\\(ch\\).*?peek\\(\\)\\s*!=\\s*'\\('.*?priority\\(peek\\(\\)\\)\\s*>=.*?infixToPostfix",
        frames: [
          {
            description: "Input Infix: '(A+B)*(C-D)'.",
            variables: { input: "(A+B)*(C-D)", step: "Start" }
          },
          {
            description: "Step 1 & 2: Reverse and swap parentheses -> '(D-C)*(B+A)'.",
            variables: { reversedInverted: "(D-C)*(B+A)" }
          },
          {
            description: "Step 3: Convert to Postfix -> 'DC-BA+*'.",
            variables: { postfix: "DC-BA+*" }
          },
          {
            description: "Step 4: Reverse Postfix -> Prefix: '*+AB-CD'. Conversion complete!",
            variables: { prefixResult: "*+AB-CD", finalOutput: "*+AB-CD" }
          }
        ]
      },
      {
        id: "t7_8",
        title: "STL Stack Palindrome Checker (std::stack<char>)",
        description: "Determine whether an input string is a palindrome using the C++ standard library std::stack<char> with range-based push and pop reversal.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Pushing n characters to the stack and popping them into a reversed string takes 2n operations: linear O(n) time.",
        initialCode: `#include <iostream>
#include <stack>
using namespace std;

int main()
{
    string str;
    cout << "Enter string: ";
    cin >> str;

    stack<char> s;

    // TODO: Push each character in str onto stack s
    for (char c : str) {
        
    }

    string rev = "";

    // TODO: Pop characters while !s.empty() and append to rev
    while (!s.empty())
    {
        
    }

    if (str == rev)
        cout << "Palindrome";
    else
        cout << "Not Palindrome";

    return 0;
}`,
        solutionCode: `#include <iostream>
#include <stack>
using namespace std;

int main()
{
    string str;
    cout << "Enter string: ";
    cin >> str;

    stack<char> s;

    for (char c : str)
        s.push(c);

    string rev = "";

    while (!s.empty())
    {
        rev += s.top();
        s.pop();
    }

    if (str == rev)
        cout << "Palindrome";
    else
        cout << "Not Palindrome";

    return 0;
}`,
        solutionRegex: "s\\.push\\(c\\);?.*?while\\s*\\(!s\\.empty\\(\\)\\).*?rev\\s*\\+=\\s*s\\.top\\(\\);?.*?s\\.pop\\(\\);?",
        frames: [
          {
            description: "Input string: 'noon'. Pushing each character to std::stack<char>.",
            array: ['n', 'o', 'o', 'n', null],
            pointers: { top: 3 },
            variables: { input: "noon", topChar: 'n' }
          },
          {
            description: "Popping characters in LIFO order: 'n' -> 'o' -> 'o' -> 'n'. rev = 'noon'.",
            array: [null, null, null, null, null],
            variables: { original: "noon", reversed: "noon" }
          },
          {
            description: "Comparison: original ('noon') == rev ('noon') -> Palindrome!",
            variables: { status: "Palindrome", result: "Palindrome" }
          }
        ]
      },
      {
        id: "t7_9",
        title: "Postfix Expression Evaluation using STL Stack",
        description: "Evaluate a postfix expression (e.g., '53+82-*') using std::stack<int>, performing pop2 [operator] pop1 for +, -, *, and /.",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Each operand and operator in the length-n expression is pushed or popped at most twice, resulting in O(n) linear time.",
        initialCode: `#include <iostream>
#include <stack>
#include <string>
#include <cmath>
using namespace std;

int main()
{
    string expression;

    cout << "Enter postfix expression: ";
    cin >> expression;

    stack<int> s;

    for (int i = 0; i < expression.length(); i++)
    {
        char symbol = expression[i];

        // TODO: If symbol is a digit, push (symbol - '0')
        if (isdigit(symbol))
        {
            s.push(symbol - '0');
        }
        else
        {
            // TODO: Pop pop1 and pop2, evaluate pop2 [symbol] pop1, and push result
            int pop1 = s.top();
            s.pop();

            int pop2 = s.top();
            s.pop();

            int result;

            switch (symbol)
            {
                case '+':
                    result = pop2 + pop1;
                    break;

                case '-':
                    result = pop2 - pop1;
                    break;

                case '*':
                    result = pop2 * pop1;
                    break;

                case '/':
                    result = pop2 / pop1;
                    break;

                default:
                    cout << "Invalid operator!" << endl;
                    return 1;
            }

            s.push(result);
        }
    }

    cout << "Result = " << s.top() << endl;

    return 0;
}`,
        solutionCode: `#include <iostream>
#include <stack>
#include <string>
#include <cmath>
using namespace std;

int main()
{
    string expression;

    cout << "Enter postfix expression: ";
    cin >> expression;

    stack<int> s;

    for (int i = 0; i < expression.length(); i++)
    {
        char symbol = expression[i];

        if (isdigit(symbol))
        {
            s.push(symbol - '0');
        }
        else
        {
            int pop1 = s.top();
            s.pop();

            int pop2 = s.top();
            s.pop();

            int result;

            switch (symbol)
            {
                case '+':
                    result = pop2 + pop1;
                    break;

                case '-':
                    result = pop2 - pop1;
                    break;

                case '*':
                    result = pop2 * pop1;
                    break;

                case '/':
                    result = pop2 / pop1;
                    break;

                default:
                    cout << "Invalid operator!" << endl;
                    return 1;
            }

            s.push(result);
        }
    }

    cout << "Result = " << s.top() << endl;

    return 0;
}`,
        solutionRegex: "isdigit\\(symbol\\).*?s\\.push\\(symbol\\s*-\\s*'0'\\);?.*?pop1\\s*=\\s*s\\.top\\(\\);?.*?pop2\\s*=\\s*s\\.top\\(\\);?.*?switch\\s*\\(symbol\\)",
        frames: [
          {
            description: "Expression: '23+4*'. Push operand '2', then operand '3'. Stack: [2, 3].",
            array: [2, 3, null, null, null],
            pointers: { top: 1 },
            highlightIndices: [0, 1],
            variables: { currentSymbol: '3', stack: "2, 3" }
          },
          {
            description: "Operator '+': pop1 = 3, pop2 = 2. result = 2 + 3 = 5. Push 5. Stack: [5].",
            array: [5, null, null, null, null],
            pointers: { top: 0 },
            highlightIndices: [0],
            variables: { operator: '+', pop1: 3, pop2: 2, result: 5 }
          },
          {
            description: "Operand '4': push 4. Stack: [5, 4].",
            array: [5, 4, null, null, null],
            pointers: { top: 1 },
            highlightIndices: [1],
            variables: { currentSymbol: '4', stack: "5, 4" }
          },
          {
            description: "Operator '*': pop1 = 4, pop2 = 5. result = 5 * 4 = 20. Push 20.",
            array: [20, null, null, null, null],
            pointers: { top: 0 },
            highlightIndices: [0],
            variables: { operator: '*', pop1: 4, pop2: 5, result: 20 }
          },
          {
            description: "End of expression. Result = 20.",
            array: [20, null, null, null, null],
            pointers: { top: 0 },
            variables: { finalResult: 20, status: "Evaluated" }
          }
        ]
      }
    ]
  },
  {
    id: "m8",
    title: "Module 8: Linear Queue (FIFO) — Lab 6",
    description: "Static Queue implementation using front and rear pointers, enqueue, dequeue, and queue splitting.",
    tasks: [
      {
        id: "t8_1",
        title: "Static Queue: Push & Pop",
        description: "Implement `insertion(char b)` with overflow check and `deletion()` with underflow check for a static FIFO queue (Lab 6 Q1).",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(1)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Queue insertion and deletion manipulate front and rear pointer offsets directly in O(1) constant time.",
        initialCode: `#include <iostream>\nusing namespace std;\n#define size 5\n\nclass queue {\n  char a[size];\n  int rear;\n  int front;\n\npublic:\n  queue() {\n    front = rear = -1;\n  }\n\n  bool isfull() {\n    // TODO: Return true if queue is full (rear == size - 1)\n    \n  }\n\n  bool isempty() {\n    // TODO: Return true if queue is empty (front == -1 or front > rear)\n    \n  }\n\n  void insertion(char b) {\n    // TODO: If isfull(), print overflow\n    // If front == -1, set front = 0. Increment rear, store b in a[rear]\n    \n  }\n\n  char deletion() {\n    // TODO: If isempty(), return -1\n    // Save char at a[front]. If front == rear, reset front = rear = -1; else front++\n    // Return the saved char\n    \n  }\n\n  void firstel() {\n    if (isempty()) cout << "empty" << endl;\n    else cout << "First element: " << a[front] << endl;\n  }\n};\n\nint main() {\n  queue q;\n  q.insertion('A');\n  q.insertion('B');\n  q.insertion('C');\n  cout << "Deleted: " << q.deletion() << endl;\n  q.firstel();\n  return 0;\n}`,
        solutionCode: `#include <iostream>\nusing namespace std;\n#define size 5\n\nclass queue {\n  char a[size];\n  int rear;\n  int front;\n\npublic:\n  queue() {\n    front = rear = -1;\n  }\n\n  bool isfull() {\n    return rear == size - 1;\n  }\n\n  bool isempty() {\n    return (front == -1 || front > rear);\n  }\n\n  void insertion(char b) {\n    if (isfull()) {\n      cout << "the queue is full" << endl;\n      return;\n    }\n    if (front == -1) front = 0;\n    rear++;\n    a[rear] = b;\n  }\n\n  char deletion() {\n    if (isempty()) {\n      cout << "empty" << endl;\n      return -1;\n    }\n    char x = a[front];\n    if (front == rear) {\n      front = rear = -1;\n    } else {\n      front++;\n    }\n    return x;\n  }\n\n  void firstel() {\n    if (isempty()) cout << "empty" << endl;\n    else cout << "First element: " << a[front] << endl;\n  }\n};\n\nint main() {\n  queue q;\n  q.insertion('A');\n  q.insertion('B');\n  q.insertion('C');\n  cout << "Deleted: " << q.deletion() << endl;\n  q.firstel();\n  return 0;\n}`,
        solutionRegex: "rear\\s*==\\s*size\\s*-\\s*1.*?front\\s*==\\s*-1.*?a\\[rear\\]\\s*=\\s*b.*?a\\[front\\].*?(front\\s*\\+\\+|front\\s*=\\s*rear\\s*=\\s*-1)",
        frames: [
          { description: "Queue initialized: front = -1, rear = -1. Capacity = 5.", array: [null, null, null, null, null], pointers: {}, variables: { front: -1, rear: -1, status: "Empty" } },
          { description: "insertion('A'): front set to 0, rear incremented to 0, a[0] = 'A'.", array: ['A', null, null, null, null], pointers: { front: 0, rear: 0 }, highlightIndices: [0], variables: { front: 0, rear: 0, item: 'A' } },
          { description: "insertion('B'): rear incremented to 1, a[1] = 'B'.", array: ['A', 'B', null, null, null], pointers: { front: 0, rear: 1 }, highlightIndices: [1], variables: { front: 0, rear: 1, item: 'B' } },
          { description: "insertion('C'): rear incremented to 2, a[2] = 'C'.", array: ['A', 'B', 'C', null, null], pointers: { front: 0, rear: 2 }, highlightIndices: [2], variables: { front: 0, rear: 2, item: 'C' } },
          { description: "deletion(): Dequeued 'A' from front. front incremented to index 1.", array: ['A', 'B', 'C', null, null], pointers: { front: 1, rear: 2 }, highlightIndices: [0], variables: { front: 1, rear: 2, deleted: 'A' } },
          { description: "firstel(): Front of queue points to index 1 containing 'B'.", array: ['A', 'B', 'C', null, null], pointers: { front: 1, rear: 2 }, highlightIndices: [1], variables: { frontValue: 'B' } }
        ]
      },
      {
        id: "t8_2",
        title: "Split Queue into Two Halves",
        description: "Write the `spiltqueue()` function to split a queue of elements into two separate queues (q1 and q2) based on element count (Lab 6 Q4).",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Dequeuing each element from q and enqueuing into either q1 or q2 performs n total operations in linear O(n) time.",
        initialCode: `#include <iostream>\nusing namespace std;\n#define size 5\n\nclass queue {\npublic:\n  char a[size];\n  int rear, front;\n  queue() { front = rear = -1; }\n  bool isfull() { return rear == size - 1; }\n  bool isempty() { return front == -1 || front > rear; }\n  void insertion(char b) {\n    if (isfull()) return;\n    if (front == -1) front = 0;\n    a[++rear] = b;\n  }\n  char deletion() {\n    if (isempty()) return -1;\n    char x = a[front];\n    if (front == rear) front = rear = -1;\n    else front++;\n    return x;\n  }\n  int elements() {\n    if (isempty()) return 0;\n    return (rear - front + 1);\n  }\n};\n\nqueue q, q1, q2;\n\nvoid spiltqueue() {\n  // TODO: Check if q is empty\n  // Calculate half = q.elements() / 2;\n  // Loop while !q.isempty(): dequeue element x, insert into q1 if index < half, else into q2\n  \n}\n\nint main() {\n  q.insertion('A');\n  q.insertion('B');\n  q.insertion('C');\n  q.insertion('D');\n  spiltqueue();\n  return 0;\n}`,
        solutionCode: `#include <iostream>\nusing namespace std;\n#define size 5\n\nclass queue {\npublic:\n  char a[size];\n  int rear, front;\n  queue() { front = rear = -1; }\n  bool isfull() { return rear == size - 1; }\n  bool isempty() { return front == -1 || front > rear; }\n  void insertion(char b) {\n    if (isfull()) return;\n    if (front == -1) front = 0;\n    a[++rear] = b;\n  }\n  char deletion() {\n    if (isempty()) return -1;\n    char x = a[front];\n    if (front == rear) front = rear = -1;\n    else front++;\n    return x;\n  }\n  int elements() {\n    if (isempty()) return 0;\n    return (rear - front + 1);\n  }\n};\n\nqueue q, q1, q2;\n\nvoid spiltqueue() {\n  if (q.isempty()) {\n    cout << "empty" << endl;\n    return;\n  }\n  int c = 0;\n  int half = q.elements() / 2;\n  while (!q.isempty()) {\n    char x = q.deletion();\n    if (c < half) q1.insertion(x);\n    else q2.insertion(x);\n    c++;\n  }\n}\n\nint main() {\n  q.insertion('A');\n  q.insertion('B');\n  q.insertion('C');\n  q.insertion('D');\n  spiltqueue();\n  return 0;\n}`,
        solutionRegex: "q\\.elements\\(\\)\\s*/\\s*2.*?while\\s*\\(!q\\.isempty\\(\\)\\).*?q\\.deletion\\(\\).*?q1\\.insertion.*?q2\\.insertion",
        frames: [
          { description: "Source queue q with 4 elements: ['A', 'B', 'C', 'D']. half = 4 / 2 = 2.", array: ['A', 'B', 'C', 'D', null], pointers: { front: 0, rear: 3 }, variables: { count: 4, half: 2 } },
          { description: "Item 1: Dequeued 'A' (c = 0 < 2). Enqueued into q1.", array: ['A', 'B', 'C', 'D', null], pointers: { front: 1 }, highlightIndices: [0], variables: { c: 0, half: 2, item: 'A', dest: "q1" } },
          { description: "Item 2: Dequeued 'B' (c = 1 < 2). Enqueued into q1.", array: ['A', 'B', 'C', 'D', null], pointers: { front: 2 }, highlightIndices: [1], variables: { c: 1, half: 2, item: 'B', dest: "q1" } },
          { description: "Item 3: Dequeued 'C' (c = 2 >= 2). Enqueued into q2.", array: ['A', 'B', 'C', 'D', null], pointers: { front: 3 }, highlightIndices: [2], variables: { c: 2, half: 2, item: 'C', dest: "q2" } },
          { description: "Item 4: Dequeued 'D' (c = 3 >= 2). Enqueued into q2.", array: ['A', 'B', 'C', 'D', null], pointers: { front: 3 }, highlightIndices: [3], variables: { c: 3, half: 2, item: 'D', dest: "q2" } },
          { description: "Split Complete: q1 has ['A', 'B'], q2 has ['C', 'D'].", array: ['A', 'B', 'C', 'D', null], variables: { "q1 elements": "A, B", "q2 elements": "C, D" } }
        ]
      }
    ]
  },
  {
    id: "m9",
    title: "Module 9: Circular Queue & Algorithms — Lab 6",
    description: "Circular queue with modulo wrap-around, reversing a queue with a stack, and circular buffer searching.",
    tasks: [
      {
        id: "t9_1",
        title: "Circular Queue: Modulo Wrap-Around",
        description: "Implement `insert(int item)`, `del()`, and `isfull()` using `(rear + 1) % size == front` to eliminate false overflow (Lab 6 Q3).",
        difficulty: "Advanced",
        optimalTimeComplexity: "O(1)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Modulo index calculation (i + 1) % size maps ring buffer indices in O(1) constant time.",
        initialCode: `#include <iostream>\n#define size 5\nusing namespace std;\n\nclass Circular_Queue {\nprivate:\n  int cqueue_arr[size];\n  int front, rear;\npublic:\n  Circular_Queue() {\n    rear = front = -1;\n  }\n\n  bool isfull() {\n    // TODO: Return true if (rear + 1) % size == front\n    \n  }\n\n  bool isempty() {\n    // TODO: Return true if front == -1\n    \n  }\n\n  void insert(int item) {\n    // TODO: Check if isfull()\n    // If isempty(), set front = 0\n    // Wrap rear = (rear + 1) % size;\n    // Assign cqueue_arr[rear] = item;\n    \n  }\n\n  void del() {\n    // TODO: Check if isempty()\n    // If front == rear, reset front = rear = -1\n    // Else wrap front = (front + 1) % size;\n    \n  }\n\n  int peek() {\n    if (isempty()) return -1;\n    return cqueue_arr[front];\n  }\n  \n  int peekrear() {\n    if (isempty()) return -1;\n    return cqueue_arr[rear];\n  }\n};\n\nint main() {\n  Circular_Queue cq;\n  cq.insert(10);\n  cq.insert(20);\n  cq.insert(30);\n  cq.del();\n  cout << "Front item: " << cq.peek() << endl;\n  return 0;\n}`,
        solutionCode: `#include <iostream>\n#define size 5\nusing namespace std;\n\nclass Circular_Queue {\nprivate:\n  int cqueue_arr[size];\n  int front, rear;\npublic:\n  Circular_Queue() {\n    rear = front = -1;\n  }\n\n  bool isfull() {\n    return ((rear + 1) % size == front);\n  }\n\n  bool isempty() {\n    return (front == -1);\n  }\n\n  void insert(int item) {\n    if (isfull()) {\n      cout << "Queue Overflow\\n";\n      return;\n    }\n    if (isempty()) front = 0;\n    rear = (rear + 1) % size;\n    cqueue_arr[rear] = item;\n  }\n\n  void del() {\n    if (isempty()) {\n      cout << "Queue empty\\n";\n      return;\n    }\n    cout << "Element deleted: " << cqueue_arr[front] << endl;\n    if (front == rear) {\n      front = rear = -1;\n    } else {\n      front = (front + 1) % size;\n    }\n  }\n\n  int peek() {\n    if (isempty()) return -1;\n    return cqueue_arr[front];\n  }\n  \n  int peekrear() {\n    if (isempty()) return -1;\n    return cqueue_arr[rear];\n  }\n};\n\nint main() {\n  Circular_Queue cq;\n  cq.insert(10);\n  cq.insert(20);\n  cq.insert(30);\n  cq.del();\n  cout << "Front item: " << cq.peek() << endl;\n  return 0;\n}`,
        solutionRegex: "\\(rear\\s*\\+\\s*1\\)\\s*%\\s*size\\s*==\\s*front.*?rear\\s*=\\s*\\(rear\\s*\\+\\s*1\\)\\s*%\\s*size.*?cqueue_arr\\[rear\\]\\s*=\\s*item.*?front\\s*=\\s*\\(front\\s*\\+\\s*1\\)\\s*%\\s*size",
        frames: [
          { description: "Circular Queue initialized: front = -1, rear = -1. Size = 5.", array: [null, null, null, null, null], pointers: {}, variables: { front: -1, rear: -1 } },
          { description: "insert(10), insert(20), insert(30): front = 0, rear = 2.", array: [10, 20, 30, null, null], pointers: { front: 0, rear: 2 }, highlightIndices: [0, 1, 2], variables: { front: 0, rear: 2 } },
          { description: "del(): Dequeued 10 from index 0. front wrapped to index (0 + 1) % 5 = 1.", array: [10, 20, 30, null, null], pointers: { front: 1, rear: 2 }, highlightIndices: [0], variables: { deleted: 10, front: 1, rear: 2 } },
          { description: "insert(40), insert(50): rear reaches index 4.", array: [10, 20, 30, 40, 50], pointers: { front: 1, rear: 4 }, highlightIndices: [3, 4], variables: { front: 1, rear: 4 } },
          { description: "insert(60): Modulo wrap-around! rear = (4 + 1) % 5 = 0. Reuses free index 0!", array: [60, 20, 30, 40, 50], pointers: { front: 1, rear: 0 }, highlightIndices: [0], variables: { "wrapped rear": 0, front: 1, item: 60 } }
        ]
      },
      {
        id: "t9_2",
        title: "Reverse a Queue Using a Stack",
        description: "Write a program that reverses all elements of a queue using an auxiliary LIFO stack (Lab 6 Assignment Q1).",
        difficulty: "Advanced",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Dequeuing n elements onto a stack and popping back reverses the order in O(n) linear time and O(n) space.",
        initialCode: `#include <iostream>\n#include <stack>\nusing namespace std;\n#define size 5\n\nclass queue {\npublic:\n  char a[size];\n  int front, rear;\n  queue() { front = rear = -1; }\n  bool isempty() { return front == -1 || front > rear; }\n  bool isfull() { return rear == size - 1; }\n  void insertion(char b) {\n    if (isfull()) return;\n    if (front == -1) front = 0;\n    a[++rear] = b;\n  }\n  char deletion() {\n    if (isempty()) return -1;\n    char x = a[front];\n    if (front == rear) front = rear = -1;\n    else front++;\n    return x;\n  }\n};\n\nvoid reverseQueue(queue &q) {\n  stack<char> s;\n  // TODO: Step 1 - Dequeue all elements from q and push onto stack s\n  \n  \n  // TODO: Step 2 - Pop all elements from stack s and enqueue back into q\n  \n}\n\nint main() {\n  queue q;\n  q.insertion('A');\n  q.insertion('B');\n  q.insertion('C');\n  q.insertion('D');\n  reverseQueue(q);\n  return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <stack>\nusing namespace std;\n#define size 5\n\nclass queue {\npublic:\n  char a[size];\n  int front, rear;\n  queue() { front = rear = -1; }\n  bool isempty() { return front == -1 || front > rear; }\n  bool isfull() { return rear == size - 1; }\n  void insertion(char b) {\n    if (isfull()) return;\n    if (front == -1) front = 0;\n    a[++rear] = b;\n  }\n  char deletion() {\n    if (isempty()) return -1;\n    char x = a[front];\n    if (front == rear) front = rear = -1;\n    else front++;\n    return x;\n  }\n};\n\nvoid reverseQueue(queue &q) {\n  stack<char> s;\n  while (!q.isempty()) {\n    s.push(q.deletion());\n  }\n  while (!s.empty()) {\n    q.insertion(s.top());\n    s.pop();\n  }\n}\n\nint main() {\n  queue q;\n  q.insertion('A');\n  q.insertion('B');\n  q.insertion('C');\n  q.insertion('D');\n  reverseQueue(q);\n  return 0;\n}`,
        solutionRegex: "while\\s*\\(!q\\.isempty\\(\\)\\)\\s*\\{?\\s*s\\.push\\(q\\.deletion\\(\\)\\)\\s*;?\\}?\\s*while\\s*\\(!s\\.empty\\(\\)\\)",
        frames: [
          { description: "Initial Queue: ['A', 'B', 'C', 'D']. front = 0, rear = 3.", array: ['A', 'B', 'C', 'D', null], pointers: { front: 0, rear: 3 }, variables: { step: "Initial Queue" } },
          { description: "Step 1: Dequeued all items and pushed to stack. Stack (top to bottom): ['D', 'C', 'B', 'A'].", array: [null, null, null, null, null], variables: { stackTop: 'D', "stack content": "D, C, B, A", queueStatus: "Empty" } },
          { description: "Step 2a: Popped 'D' from stack -> enqueued into queue at a[0].", array: ['D', null, null, null, null], pointers: { front: 0, rear: 0 }, highlightIndices: [0], variables: { enqueued: 'D' } },
          { description: "Step 2b: Popped 'C' from stack -> enqueued into queue at a[1].", array: ['D', 'C', null, null, null], pointers: { front: 0, rear: 1 }, highlightIndices: [1], variables: { enqueued: 'C' } },
          { description: "Step 2c: Popped 'B' from stack -> enqueued into queue at a[2].", array: ['D', 'C', 'B', null, null], pointers: { front: 0, rear: 2 }, highlightIndices: [2], variables: { enqueued: 'B' } },
          { description: "Step 2d: Popped 'A' from stack -> enqueued into queue at a[3].", array: ['D', 'C', 'B', 'A', null], pointers: { front: 0, rear: 3 }, highlightIndices: [3], variables: { enqueued: 'A' } },
          { description: "Queue Reversal Complete: Original ['A','B','C','D'] is now ['D','C','B','A']!", array: ['D', 'C', 'B', 'A', null], pointers: { front: 0, rear: 3 }, variables: { result: "Reversed Successfully" } }
        ]
      },
      {
        id: "t9_3",
        title: "Search in a Circular Queue",
        description: "Implement `search(int target)` to find the index of an element in a circular queue traversing with `(i + 1) % size` (Lab 6 Assignment Q2).",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Modulo traversal visits up to n elements from front to rear in O(n) linear time.",
        initialCode: `#include <iostream>\n#define size 5\nusing namespace std;\n\nclass Circular_Queue {\npublic:\n  int cqueue_arr[size];\n  int front, rear;\n  Circular_Queue() { front = rear = -1; }\n  bool isempty() { return front == -1; }\n  \n  void insert(int item) {\n    if ((rear + 1) % size == front) return;\n    if (isempty()) front = 0;\n    rear = (rear + 1) % size;\n    cqueue_arr[rear] = item;\n  }\n\n  // TODO: Search for target in the circular queue.\n  // Return the array index where target is found, or -1 if not found.\n  int search(int target) {\n    if (isempty()) return -1;\n    \n    // Traverse from i = front until i == rear using i = (i + 1) % size\n    \n  }\n};\n\nint main() {\n  Circular_Queue cq;\n  cq.insert(10);\n  cq.insert(20);\n  cq.insert(30);\n  cout << "Index of 20: " << cq.search(20) << endl;\n  return 0;\n}`,
        solutionCode: `#include <iostream>\n#define size 5\nusing namespace std;\n\nclass Circular_Queue {\npublic:\n  int cqueue_arr[size];\n  int front, rear;\n  Circular_Queue() { front = rear = -1; }\n  bool isempty() { return front == -1; }\n  \n  void insert(int item) {\n    if ((rear + 1) % size == front) return;\n    if (isempty()) front = 0;\n    rear = (rear + 1) % size;\n    cqueue_arr[rear] = item;\n  }\n\n  int search(int target) {\n    if (isempty()) return -1;\n    for (int i = front; ; i = (i + 1) % size) {\n      if (cqueue_arr[i] == target) return i;\n      if (i == rear) break;\n    }\n    return -1;\n  }\n};\n\nint main() {\n  Circular_Queue cq;\n  cq.insert(10);\n  cq.insert(20);\n  cq.insert(30);\n  cout << "Index of 20: " << cq.search(20) << endl;\n  return 0;\n}`,
        solutionRegex: "if\\s*\\(isempty\\(\\)\\)\\s*return\\s*-1;.*?for\\s*\\(int\\s+i\\s*=\\s*front.*?cqueue_arr\\[i\\]\\s*==\\s*target.*?return\\s+i",
        frames: [
          { description: "Circular Queue with elements [10, 20, 30]. Searching for target = 20.", array: [10, 20, 30, null, null], pointers: { front: 0, rear: 2 }, variables: { target: 20, front: 0, rear: 2 } },
          { description: "Step 1: Check index i = 0 (cqueue_arr[0] = 10 != 20). Next index: (0 + 1) % 5 = 1.", array: [10, 20, 30, null, null], pointers: { i: 0 }, highlightIndices: [0], variables: { i: 0, "cqueue_arr[i]": 10 } },
          { description: "Step 2: Check index i = 1 (cqueue_arr[1] = 20 == 20). Target found!", array: [10, 20, 30, null, null], pointers: { i: 1 }, highlightIndices: [1], variables: { i: 1, "cqueue_arr[i]": 20, returnIndex: 1 } }
        ]
      },
      {
        id: "t9_4",
        title: "Circular Queue with do-while Traversal & Search",
        description: "Implement CircularQueue with enqueue(), display(), and search() using do-while loops terminating at (rear + 1) % SIZE.",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Searching through the ring buffer with modulo arithmetic visits at most n elements in O(n) time.",
        initialCode: `#include <iostream>
using namespace std;

#define SIZE 5

class CircularQueue {
private:
    int queue[SIZE];
    int front;
    int rear;

public:
    CircularQueue() {
        front = -1;
        rear = -1;
    }

    void enqueue(int value) {
        // TODO: Check full: (rear + 1) % SIZE == front
        if ((rear + 1) % SIZE == front) {
            cout << "Queue is Full\\n";
            return;
        }

        // TODO: If empty, set front = 0
        if (front == -1) {
            front = 0;
        }

        // TODO: Wrap rear and insert value
        rear = (rear + 1) % SIZE;
        queue[rear] = value;
        cout << value << " enqueued to queue\\n";
    }

    void search(int value) {
        if (front == -1) {
            cout << "Queue is Empty\\n";
            return;
        }

        int i = front;
        int position = 1;
        bool found = false;

        // TODO: Use do-while loop to search until i == (rear + 1) % SIZE
        do {
            if (queue[i] == value) {
                cout << "Element " << value << " found at position: " << position << " (index: " << i << ")\\n";
                found = true;
                break;
            }
            i = (i + 1) % SIZE;
            position++;
        } while (i != (rear + 1) % SIZE);

        if (!found) {
            cout << "Element " << value << " not found in the queue\\n";
        }
    }

    void display() {
        if (front == -1) {
            cout << "Queue is Empty\\n";
            return;
        }

        cout << "Queue elements: ";
        int i = front;
        do {
            cout << queue[i] << " ";
            i = (i + 1) % SIZE;
        } while (i != (rear + 1) % SIZE);
        cout << endl;
    }
};

int main() {
    CircularQueue q;

    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.enqueue(40);

    q.display();

    q.search(30);
    q.search(99);

    return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;

#define SIZE 5

class CircularQueue {
private:
    int queue[SIZE];
    int front;
    int rear;

public:
    CircularQueue() {
        front = -1;
        rear = -1;
    }

    void enqueue(int value) {
        if ((rear + 1) % SIZE == front) {
            cout << "Queue is Full\\n";
            return;
        }

        if (front == -1) {
            front = 0;
        }

        rear = (rear + 1) % SIZE;
        queue[rear] = value;
        cout << value << " enqueued to queue\\n";
    }

    void search(int value) {
        if (front == -1) {
            cout << "Queue is Empty\\n";
            return;
        }

        int i = front;
        int position = 1;
        bool found = false;

        do {
            if (queue[i] == value) {
                cout << "Element " << value << " found at position: " << position << " (index: " << i << ")\\n";
                found = true;
                break;
            }
            i = (i + 1) % SIZE;
            position++;
        } while (i != (rear + 1) % SIZE);

        if (!found) {
            cout << "Element " << value << " not found in the queue\\n";
        }
    }

    void display() {
        if (front == -1) {
            cout << "Queue is Empty\\n";
            return;
        }

        cout << "Queue elements: ";
        int i = front;
        do {
            cout << queue[i] << " ";
            i = (i + 1) % SIZE;
        } while (i != (rear + 1) % SIZE);
        cout << endl;
    }
};

int main() {
    CircularQueue q;

    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.enqueue(40);

    q.display();

    q.search(30);
    q.search(99);

    return 0;
}`,
        solutionRegex: "\\(rear\\s*\\+\\s*1\\)\\s*%\\s*SIZE\\s*==\\s*front.*?do\\s*\\{.*?while\\s*\\(i\\s*!=\\s*\\(rear\\s*\\+\\s*1\\)\\s*%\\s*SIZE\\)",
        frames: [
          {
            description: "Enqueued [10, 20, 30, 40]. front = 0, rear = 3.",
            array: [10, 20, 30, 40, null],
            pointers: { front: 0, rear: 3 },
            variables: { front: 0, rear: 3, capacity: 5 }
          },
          {
            description: "display(): Traversing indices 0, 1, 2, 3 via do-while loop -> [10, 20, 30, 40].",
            array: [10, 20, 30, 40, null],
            highlightIndices: [0, 1, 2, 3],
            variables: { elements: "10 20 30 40" }
          },
          {
            description: "search(30): Checking i = 0 (10 != 30), i = 1 (20 != 30), i = 2 (30 == 30). Found at position 3 (index 2)!",
            array: [10, 20, 30, 40, null],
            pointers: { match: 2 },
            highlightIndices: [2],
            variables: { target: 30, position: 3, index: 2, status: "Found" }
          },
          {
            description: "search(99): Checked all elements up to (rear + 1) % 5 = 4. 99 not found.",
            variables: { target: 99, status: "Not Found" }
          }
        ]
      },
      {
        id: "t9_5",
        title: "Reversing a Queue Using STL Queue & Stack",
        description: "Reverse a std::queue<int> by pushing its elements onto a std::stack<int> and then pushing them back into the queue.",
        difficulty: "Beginner",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Moving n elements from FIFO queue to LIFO stack and back takes 2n operations: O(n) linear time.",
        initialCode: `#include <iostream>
#include <queue>
#include <stack>
using namespace std;

int main() {
    queue<int> q;
    stack<int> s;

    // Insert initial queue elements
    q.push(10);
    q.push(20);
    q.push(30);
    q.push(40);
    q.push(50);

    cout << "Original Queue elements:\\n";
    queue<int> temp = q;
    while (!temp.empty()) {
        cout << temp.front() << " ";
        temp.pop();
    }
    cout << endl;

    // TODO: Move Queue elements to Stack
    // While !q.empty(), push q.front() to s, then q.pop()
    

    // TODO: Move Stack elements back to Queue
    // While !s.empty(), push s.top() to q, then s.pop()
    

    // Print reversed Queue
    cout << "Reversed Queue elements:\\n";
    while (!q.empty()) {
        cout << q.front() << " ";
        q.pop();
    }
    cout << endl;

    return 0;
}`,
        solutionCode: `#include <iostream>
#include <queue>
#include <stack>
using namespace std;

int main() {
    queue<int> q;
    stack<int> s;

    // Insert initial queue elements
    q.push(10);
    q.push(20);
    q.push(30);
    q.push(40);
    q.push(50);

    cout << "Original Queue elements:\\n";
    queue<int> temp = q;
    while (!temp.empty()) {
        cout << temp.front() << " ";
        temp.pop();
    }
    cout << endl;

    // Move Queue elements to Stack
    while (!q.empty()) {
        s.push(q.front());
        q.pop();
    }

    // Move Stack elements back to Queue
    while (!s.empty()) {
        q.push(s.top());
        s.pop();
    }

    // Print reversed Queue
    cout << "Reversed Queue elements:\\n";
    while (!q.empty()) {
        cout << q.front() << " ";
        q.pop();
    }
    cout << endl;

    return 0;
}`,
        solutionRegex: "while\\s*\\(!q\\.empty\\(\\)\\)\\s*\\{?\\s*s\\.push\\(q\\.front\\(\\)\\);?\\s*q\\.pop\\(\\);?\\}?\\s*while\\s*\\(!s\\.empty\\(\\)\\)\\s*\\{?\\s*q\\.push\\(s\\.top\\(\\)\\);?\\s*s\\.pop\\(\\);?\\}?",
        frames: [
          {
            description: "Initial Queue: [10, 20, 30, 40, 50]. Stack is empty.",
            array: [10, 20, 30, 40, 50],
            pointers: { front: 0, rear: 4 },
            variables: { "queue front": 10, "queue rear": 50, stackSize: 0 }
          },
          {
            description: "Phase 1: Transferred all elements to Stack. Stack top-to-bottom: [50, 40, 30, 20, 10]. Queue empty.",
            array: [50, 40, 30, 20, 10],
            pointers: { stackTop: 0 },
            variables: { "stack top": 50, queueSize: 0 }
          },
          {
            description: "Phase 2: Popped from Stack back into Queue. First enqueued: 50, then 40, 30, 20, 10.",
            array: [50, 40, 30, 20, 10],
            pointers: { front: 0, rear: 4 },
            highlightIndices: [0, 1, 2, 3, 4],
            variables: { "reversed front": 50, "reversed rear": 10 }
          },
          {
            description: "Result: Queue successfully reversed! Elements printed: 50 40 30 20 10.",
            array: [50, 40, 30, 20, 10],
            variables: { reversedOutput: "50 40 30 20 10" }
          }
        ]
      }
    ]
  },
  {
    id: "m10",
    title: "Module 10: Singly Linked List (SLL) — Lab 8",
    description: "Master dynamic node chaining, head and tail pointers, insertion, deletion, zero filtering, list splitting, and sorting from Data Structure Lab 8.",
    tasks: [
      {
        id: "t10_1",
        title: "SLL Core Operations: Insert, Delete & Search (Lab 8 Q1)",
        description: "Implement `addToHead()`, `addToTail()`, `deleteFromHead()`, `deleteFromTail()`, `deleteNode()`, and `isInList()` for `IntSLList` (Lab 8 Q1 a-g).",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(1)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "addToHead, addToTail, and deleteFromHead run in O(1) constant time. deleteFromTail, deleteNode, and isInList require pointer traversal taking O(n) linear time.",
        initialCode: `#include <iostream>
using namespace std;

class IntSLLNode {
public:
  IntSLLNode() { next = 0; }
  IntSLLNode(int el, IntSLLNode *ptr = 0) { info = el; next = ptr; }
  int info;
  IntSLLNode *next;
};

class IntSLList {
public:
  IntSLList() { head = tail = 0; }
  int isEmpty() { return head == 0; }
  void addToHead(int);
  void addToTail(int);
  int deleteFromHead();
  int deleteFromTail();
  void deleteNode(int);
  bool isInList(int);
  void printAll();
private:
  IntSLLNode *head, *tail;
};

void IntSLList::addToHead(int el) {
  // TODO: If empty, create new node and set head = tail = node
  // Else allocate new IntSLLNode(el, head) and update head
  
}

void IntSLList::addToTail(int el) {
  // TODO: If tail != 0, tail->next = new IntSLLNode(el); tail = tail->next;
  // Else head = tail = new IntSLLNode(el);
  
}

int IntSLList::deleteFromHead() {
  if (isEmpty()) return 0;
  // TODO: Save head->info, advance head = head->next, delete old node
  
}

int IntSLList::deleteFromTail() {
  if (isEmpty()) return 0;
  // TODO: If head == tail, delete and reset to 0
  // Else traverse tmp until tmp->next == tail, set tail = tmp, tail->next = 0
  
}

void IntSLList::deleteNode(int el) {
  if (head == 0) return;
  // TODO: If head == tail && el == head->info, delete head
  // Else if el == head->info, advance head
  // Else traverse with pred and tmp to unlink tmp
  
}

bool IntSLList::isInList(int el) {
  // TODO: Traverse list with tmp pointer. Return true if tmp->info == el
  
}

void IntSLList::printAll() {
  for (IntSLLNode *tmp = head; tmp != 0; tmp = tmp->next)
    cout << tmp->info << " ";
  cout << endl;
}

int main() {
  IntSLList l;
  l.addToHead(44);
  l.addToTail(10);
  l.addToTail(20);
  l.addToTail(30);
  l.addToTail(40);
  l.printAll();
  l.deleteFromHead();
  l.deleteFromTail();
  l.deleteNode(20);
  l.printAll();
  cout << "Search 30: " << (l.isInList(30) ? "Found" : "Not Found") << endl;
  return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;

class IntSLLNode {
public:
  IntSLLNode() { next = 0; }
  IntSLLNode(int el, IntSLLNode *ptr = 0) { info = el; next = ptr; }
  int info;
  IntSLLNode *next;
};

class IntSLList {
public:
  IntSLList() { head = tail = 0; }
  int isEmpty() { return head == 0; }
  void addToHead(int);
  void addToTail(int);
  int deleteFromHead();
  int deleteFromTail();
  void deleteNode(int);
  bool isInList(int);
  void printAll();
private:
  IntSLLNode *head, *tail;
};

void IntSLList::addToHead(int el) {
  if (isEmpty()) {
    head = new IntSLLNode(el);
    tail = head;
  } else {
    head = new IntSLLNode(el, head);
  }
}

void IntSLList::addToTail(int el) {
  if (tail != 0) {
    tail->next = new IntSLLNode(el);
    tail = tail->next;
  } else {
    head = tail = new IntSLLNode(el);
  }
}

int IntSLList::deleteFromHead() {
  if (isEmpty()) return 0;
  int el = head->info;
  IntSLLNode *tmp = head;
  if (head == tail) {
    head = tail = 0;
  } else {
    head = head->next;
  }
  delete tmp;
  return el;
}

int IntSLList::deleteFromTail() {
  if (isEmpty()) return 0;
  int el = tail->info;
  if (head == tail) {
    delete head;
    head = tail = 0;
  } else {
    IntSLLNode *tmp;
    for (tmp = head; tmp->next != tail; tmp = tmp->next);
    delete tail;
    tail = tmp;
    tail->next = 0;
  }
  return el;
}

void IntSLList::deleteNode(int el) {
  if (head != 0) {
    if (head == tail && el == head->info) {
      delete head;
      head = tail = 0;
    } else if (el == head->info) {
      IntSLLNode *tmp = head;
      head = head->next;
      delete tmp;
    } else {
      IntSLLNode *pred, *tmp;
      for (pred = head, tmp = head->next;
           tmp != 0 && !(tmp->info == el);
           pred = pred->next, tmp = tmp->next);
      if (tmp != 0) {
        pred->next = tmp->next;
        if (tmp == tail) tail = pred;
        delete tmp;
      }
    }
  }
}

bool IntSLList::isInList(int el) {
  for (IntSLLNode *tmp = head; tmp != 0; tmp = tmp->next) {
    if (tmp->info == el) return true;
  }
  return false;
}

void IntSLList::printAll() {
  for (IntSLLNode *tmp = head; tmp != 0; tmp = tmp->next)
    cout << tmp->info << " ";
  cout << endl;
}

int main() {
  IntSLList l;
  l.addToHead(44);
  l.addToTail(10);
  l.addToTail(20);
  l.addToTail(30);
  l.addToTail(40);
  l.printAll();
  l.deleteFromHead();
  l.deleteFromTail();
  l.deleteNode(20);
  l.printAll();
  cout << "Search 30: " << (l.isInList(30) ? "Found" : "Not Found") << endl;
  return 0;
}`,
        solutionRegex: "head\\s*=\\s*new\\s+IntSLLNode\\(el,\\s*head\\).*?tail->next\\s*=\\s*new\\s+IntSLLNode.*?head\\s*=\\s*head->next.*?tmp->next\\s*!=\\s*tail.*?pred->next\\s*=\\s*tmp->next",
        frames: [
          { description: "Empty Linked List initialized: head = 0 (null), tail = 0 (null).", array: [], pointers: {}, variables: { head: "0x0 (null)", tail: "0x0 (null)", status: "Empty" } },
          { description: "addToHead(44): Single node created. Both head and tail point to [44].", array: [44], pointers: { head: 0, tail: 0 }, highlightIndices: [0], variables: { headVal: 44, tailVal: 44, length: 1 } },
          { description: "addToTail(10, 20, 30, 40): Linked list populated with 5 nodes.", array: [44, 10, 20, 30, 40], pointers: { head: 0, tail: 4 }, highlightIndices: [1, 2, 3, 4], variables: { head: 44, tail: 40, length: 5 } },
          { description: "deleteFromHead(): Deallocated node 44. head advances to index 0 containing 10.", array: [10, 20, 30, 40], pointers: { head: 0, tail: 3 }, highlightIndices: [0], variables: { deleted: 44, newHead: 10 } },
          { description: "deleteFromTail(): Predecessor traversal finds node 30. tail reassigned to 30; node 40 deleted.", array: [10, 20, 30], pointers: { head: 0, tail: 2 }, highlightIndices: [2], variables: { deleted: 40, newTail: 30 } },
          { description: "deleteNode(20): pred points to 10, tmp points to 20. pred->next = tmp->next. 20 freed.", array: [10, 30], pointers: { head: 0, tail: 1 }, highlightIndices: [1], variables: { unlinkedNode: 20, size: 2 } },
          { description: "isInList(30): Linear traversal inspects node 30 -> match confirmed! Returns true.", array: [10, 30], pointers: { head: 0, tail: 1, tmp: 1 }, highlightIndices: [1], variables: { target: 30, found: "true" } }
        ]
      },
      {
        id: "t10_2",
        title: "Node Filtering, Count & Maximum Element (Lab 8 Q2)",
        description: "Implement `check_zero()` to purge all zero nodes, `count()` to calculate node count, and `large()` to find the maximum element (Lab 8 Q2 a-d).",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "count() and large() both make a single linear pass visiting n nodes in O(n) time. check_zero() inspects all elements in O(n) time.",
        initialCode: `#include <iostream>
using namespace std;

class IntSLLNode {
public:
  IntSLLNode() { next = 0; }
  IntSLLNode(int el, IntSLLNode *ptr = 0) { info = el; next = ptr; }
  int info;
  IntSLLNode *next;
};

class IntSLList {
public:
  IntSLList() { head = tail = 0; }
  void addToList(int);
  void deleteNode(int);
  void check_zero();
  int large();
  int count();
  void printAll();
private:
  IntSLLNode *head, *tail;
};

void IntSLList::addToList(int el) {
  if (head == 0) {
    head = new IntSLLNode(el);
    tail = head;
  } else if (tail != 0) {
    tail->next = new IntSLLNode(el);
    tail = tail->next;
  }
}

void IntSLList::deleteNode(int el) {
  if (head == 0) return;
  if (head == tail && el == head->info) {
    delete head;
    head = tail = 0;
  } else if (el == head->info) {
    IntSLLNode *tmp = head;
    head = head->next;
    delete tmp;
  } else {
    IntSLLNode *pred, *tmp;
    for (pred = head, tmp = head->next;
         tmp != 0 && !(tmp->info == el);
         pred = pred->next, tmp = tmp->next);
    if (tmp != 0) {
      pred->next = tmp->next;
      if (tmp == tail) tail = pred;
      delete tmp;
    }
  }
}

void IntSLList::check_zero() {
  // TODO: Traverse list with pointer p. If p->info == 0, save next pointer r,
  // deleteNode(p->info), and continue with p = r; else p = p->next
  
}

int IntSLList::large() {
  // TODO: Return maximum value in list using single traversal
  
}

int IntSLList::count() {
  // TODO: Count total nodes from head to tail and return count
  
}

void IntSLList::printAll() {
  for (IntSLLNode *tmp = head; tmp != 0; tmp = tmp->next)
    cout << tmp->info << " ";
  cout << endl;
}

int main() {
  IntSLList l;
  int values[] = {15, 0, 42, 0, 8, 99, 0};
  for (int v : values) l.addToList(v);

  cout << "Initial list: "; l.printAll();
  cout << "Total nodes: " << l.count() << endl;
  cout << "Largest element: " << l.large() << endl;

  l.check_zero();
  cout << "After check_zero: "; l.printAll();
  cout << "Nodes remaining: " << l.count() << endl;
  return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;

class IntSLLNode {
public:
  IntSLLNode() { next = 0; }
  IntSLLNode(int el, IntSLLNode *ptr = 0) { info = el; next = ptr; }
  int info;
  IntSLLNode *next;
};

class IntSLList {
public:
  IntSLList() { head = tail = 0; }
  void addToList(int);
  void deleteNode(int);
  void check_zero();
  int large();
  int count();
  void printAll();
private:
  IntSLLNode *head, *tail;
};

void IntSLList::addToList(int el) {
  if (head == 0) {
    head = new IntSLLNode(el);
    tail = head;
  } else if (tail != 0) {
    tail->next = new IntSLLNode(el);
    tail = tail->next;
  }
}

void IntSLList::deleteNode(int el) {
  if (head == 0) return;
  if (head == tail && el == head->info) {
    delete head;
    head = tail = 0;
  } else if (el == head->info) {
    IntSLLNode *tmp = head;
    head = head->next;
    delete tmp;
  } else {
    IntSLLNode *pred, *tmp;
    for (pred = head, tmp = head->next;
         tmp != 0 && !(tmp->info == el);
         pred = pred->next, tmp = tmp->next);
    if (tmp != 0) {
      pred->next = tmp->next;
      if (tmp == tail) tail = pred;
      delete tmp;
    }
  }
}

void IntSLList::check_zero() {
  IntSLLNode *p = head, *r = 0;
  while (p != 0) {
    if (p->info == 0) {
      r = p->next;
      deleteNode(p->info);
      p = r;
    } else {
      p = p->next;
    }
  }
}

int IntSLList::large() {
  IntSLLNode *q = head;
  int x = 0;
  if (head != 0) {
    x = q->info;
    for (q = q->next; q != 0; q = q->next) {
      if (x < q->info) x = q->info;
    }
  }
  return x;
}

int IntSLList::count() {
  IntSLLNode *q;
  int c = 0;
  for (q = head; q != 0; q = q->next) {
    c++;
  }
  return c;
}

void IntSLList::printAll() {
  for (IntSLLNode *tmp = head; tmp != 0; tmp = tmp->next)
    cout << tmp->info << " ";
  cout << endl;
}

int main() {
  IntSLList l;
  int values[] = {15, 0, 42, 0, 8, 99, 0};
  for (int v : values) l.addToList(v);

  cout << "Initial list: "; l.printAll();
  cout << "Total nodes: " << l.count() << endl;
  cout << "Largest element: " << l.large() << endl;

  l.check_zero();
  cout << "After check_zero: "; l.printAll();
  cout << "Nodes remaining: " << l.count() << endl;
  return 0;
}`,
        solutionRegex: "p->info\\s*==\\s*0.*?deleteNode.*?x\\s*<\\s*q->info.*?for\\s*\\(.*?q\\s*=\\s*head.*?c\\+\\+",
        frames: [
          { description: "List initialized with zeros: [15, 0, 42, 0, 8, 99, 0]. Node count = 7.", array: [15, 0, 42, 0, 8, 99, 0], pointers: { head: 0, tail: 6 }, variables: { count: 7, head: 15, tail: 0 } },
          { description: "count() executed: Traversed all 7 nodes from head to tail. Total count = 7.", array: [15, 0, 42, 0, 8, 99, 0], pointers: { q: 6 }, highlightIndices: [0, 1, 2, 3, 4, 5, 6], variables: { nodeCount: 7 } },
          { description: "large() executed: Scanned nodes, tracking max value: 15 -> 42 -> 99. Max = 99.", array: [15, 0, 42, 0, 8, 99, 0], pointers: { maxNode: 5 }, highlightIndices: [5], variables: { maxValue: 99 } },
          { description: "check_zero(): Found node with info == 0 at index 1. Unlinked and deallocated.", array: [15, 42, 0, 8, 99, 0], pointers: { head: 0, p: 1 }, highlightIndices: [1], variables: { zeroRemoved: 0 } },
          { description: "check_zero(): Found node with info == 0 at index 2. Unlinked and deallocated.", array: [15, 42, 8, 99, 0], pointers: { head: 0, p: 2 }, highlightIndices: [2], variables: { zeroRemoved: 0 } },
          { description: "check_zero(): Found tail node with info == 0. Tail adjusted to node 99.", array: [15, 42, 8, 99], pointers: { head: 0, tail: 3 }, highlightIndices: [3], variables: { cleanTail: 99, totalPurged: 3 } },
          { description: "Filtering Complete: List has 4 valid nodes [15, 42, 8, 99]. All zeros removed.", array: [15, 42, 8, 99], pointers: { head: 0, tail: 3 }, variables: { remainingNodes: 4, max: 99 } }
        ]
      },
      {
        id: "t10_3",
        title: "Split Linked List by Parity into Odd & Even Lists (Lab 8 Q3)",
        description: "Split a linked list of 15 integers into two lists: `head1` (even numbers) and `head2` (odd numbers) using `check()` (Lab 8 Q3).",
        difficulty: "Advanced",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Traversing n nodes and appending to either list1 or list2 executes in linear O(n) time.",
        initialCode: `#include <iostream>
using namespace std;

class IntSLLNode {
public:
  IntSLLNode() { next = 0; }
  IntSLLNode(int el, IntSLLNode *ptr = 0) { info = el; next = ptr; }
  int info;
  IntSLLNode *next;
};

class IntSLList {
public:
  IntSLList() {
    head = tail = 0;
    head1 = tail1 = 0;
    head2 = tail2 = 0;
  }
  void addToTail(int);
  void addToTail1(int);
  void addToTail2(int);
  void deleteNode(int);
  void check();
  void printAll();
  void printAll1();
  void printAll2();
private:
  IntSLLNode *head, *tail;
  IntSLLNode *head1, *tail1; // even list
  IntSLLNode *head2, *tail2; // odd list
};

void IntSLList::addToTail(int el) {
  if (tail != 0) {
    tail->next = new IntSLLNode(el);
    tail = tail->next;
  } else head = tail = new IntSLLNode(el);
}

void IntSLList::addToTail1(int el) {
  if (tail1 != 0) {
    tail1->next = new IntSLLNode(el);
    tail1 = tail1->next;
  } else head1 = tail1 = new IntSLLNode(el);
}

void IntSLList::addToTail2(int el) {
  if (tail2 != 0) {
    tail2->next = new IntSLLNode(el);
    tail2 = tail2->next;
  } else head2 = tail2 = new IntSLLNode(el);
}

void IntSLList::deleteNode(int el) {
  if (head == 0) return;
  if (head == tail && el == head->info) {
    delete head;
    head = tail = 0;
  } else if (el == head->info) {
    IntSLLNode *tmp = head;
    head = head->next;
    delete tmp;
  } else {
    IntSLLNode *pred, *tmp;
    for (pred = head, tmp = head->next;
         tmp != 0 && !(tmp->info == el);
         pred = pred->next, tmp = tmp->next);
    if (tmp != 0) {
      pred->next = tmp->next;
      if (tmp == tail) tail = pred;
      delete tmp;
    }
  }
}

void IntSLList::check() {
  // TODO: Traverse main list with pointer p.
  // If p->info % 2 == 0, call addToTail1(p->info) [Even list]
  // Else call addToTail2(p->info) [Odd list]
  // Delete node from main list and advance to next node
  
}

void IntSLList::printAll() {
  cout << "Main list: ";
  for (IntSLLNode *tmp = head; tmp != 0; tmp = tmp->next) cout << tmp->info << " ";
  cout << (head == 0 ? "Empty" : "") << endl;
}

void IntSLList::printAll1() {
  cout << "Even list: ";
  for (IntSLLNode *tmp = head1; tmp != 0; tmp = tmp->next) cout << tmp->info << " ";
  cout << endl;
}

void IntSLList::printAll2() {
  cout << "Odd list: ";
  for (IntSLLNode *tmp = head2; tmp != 0; tmp = tmp->next) cout << tmp->info << " ";
  cout << endl;
}

int main() {
  IntSLList l;
  for (int i = 0; i < 15; i++) l.addToTail(i * 3);
  cout << "Before split:" << endl;
  l.printAll();
  l.check();
  cout << "After split:" << endl;
  l.printAll();
  l.printAll1();
  l.printAll2();
  return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;

class IntSLLNode {
public:
  IntSLLNode() { next = 0; }
  IntSLLNode(int el, IntSLLNode *ptr = 0) { info = el; next = ptr; }
  int info;
  IntSLLNode *next;
};

class IntSLList {
public:
  IntSLList() {
    head = tail = 0;
    head1 = tail1 = 0;
    head2 = tail2 = 0;
  }
  void addToTail(int);
  void addToTail1(int);
  void addToTail2(int);
  void deleteNode(int);
  void check();
  void printAll();
  void printAll1();
  void printAll2();
private:
  IntSLLNode *head, *tail;
  IntSLLNode *head1, *tail1; // even list
  IntSLLNode *head2, *tail2; // odd list
};

void IntSLList::addToTail(int el) {
  if (tail != 0) {
    tail->next = new IntSLLNode(el);
    tail = tail->next;
  } else head = tail = new IntSLLNode(el);
}

void IntSLList::addToTail1(int el) {
  if (tail1 != 0) {
    tail1->next = new IntSLLNode(el);
    tail1 = tail1->next;
  } else head1 = tail1 = new IntSLLNode(el);
}

void IntSLList::addToTail2(int el) {
  if (tail2 != 0) {
    tail2->next = new IntSLLNode(el);
    tail2 = tail2->next;
  } else head2 = tail2 = new IntSLLNode(el);
}

void IntSLList::deleteNode(int el) {
  if (head == 0) return;
  if (head == tail && el == head->info) {
    delete head;
    head = tail = 0;
  } else if (el == head->info) {
    IntSLLNode *tmp = head;
    head = head->next;
    delete tmp;
  } else {
    IntSLLNode *pred, *tmp;
    for (pred = head, tmp = head->next;
         tmp != 0 && !(tmp->info == el);
         pred = pred->next, tmp = tmp->next);
    if (tmp != 0) {
      pred->next = tmp->next;
      if (tmp == tail) tail = pred;
      delete tmp;
    }
  }
}

void IntSLList::check() {
  IntSLLNode *p = head, *r = 0;
  while (p != 0) {
    if (p->info % 2 == 0) {
      addToTail1(p->info);
    } else {
      addToTail2(p->info);
    }
    r = p->next;
    deleteNode(p->info);
    p = r;
  }
}

void IntSLList::printAll() {
  cout << "Main list: ";
  for (IntSLLNode *tmp = head; tmp != 0; tmp = tmp->next) cout << tmp->info << " ";
  cout << (head == 0 ? "Empty" : "") << endl;
}

void IntSLList::printAll1() {
  cout << "Even list: ";
  for (IntSLLNode *tmp = head1; tmp != 0; tmp = tmp->next) cout << tmp->info << " ";
  cout << endl;
}

void IntSLList::printAll2() {
  cout << "Odd list: ";
  for (IntSLLNode *tmp = head2; tmp != 0; tmp = tmp->next) cout << tmp->info << " ";
  cout << endl;
}

int main() {
  IntSLList l;
  for (int i = 0; i < 15; i++) l.addToTail(i * 3);
  cout << "Before split:" << endl;
  l.printAll();
  l.check();
  cout << "After split:" << endl;
  l.printAll();
  l.printAll1();
  l.printAll2();
  return 0;
}`,
        solutionRegex: "p->info\\s*%\\s*2\\s*==\\s*0.*?addToTail1.*?addToTail2.*?deleteNode",
        frames: [
          { description: "Main list populated with 15 nodes (multiples of 3): [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42].", array: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42], pointers: { head: 0, tail: 14 }, variables: { totalNodes: 15, head: 0, tail: 42 } },
          { description: "check(): Processing node 0 (0 % 2 == 0 -> Even). Enqueued into Even List (head1).", array: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42], highlightIndices: [0], variables: { node: 0, parity: "Even", destination: "head1" } },
          { description: "check(): Processing node 3 (3 % 2 != 0 -> Odd). Enqueued into Odd List (head2).", array: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42], highlightIndices: [1], variables: { node: 3, parity: "Odd", destination: "head2" } },
          { description: "Splitting in progress... Nodes partitioned into Even (list1) and Odd (list2) sublists.", array: [0, 6, 12, 18, 24, 30, 36, 42], highlightIndices: [0, 1, 2, 3, 4, 5, 6, 7], variables: { evenCount: 8, oddCount: 7 } },
          { description: "Split Complete! Even List: [0, 6, 12, 18, 24, 30, 36, 42] | Odd List: [3, 9, 15, 21, 27, 33, 39] | Main List: Empty.", array: [0, 6, 12, 18, 24, 30, 36, 42], pointers: { head1: 0, tail1: 7 }, variables: { evenList: "0, 6, 12, 18, 24, 30, 36, 42", oddList: "3, 9, 15, 21, 27, 33, 39", mainList: "Empty" } }
        ]
      },
      {
        id: "t10_4",
        title: "Sort Singly Linked List Ascending (Lab 8 Assignment Q1)",
        description: "Write `sortAscending()` to sort a singly linked list of 10 nodes into ascending order by swapping node values (Lab 8 Assignment Q1).",
        difficulty: "Advanced",
        optimalTimeComplexity: "O(n²)",
        optimalSpaceComplexity: "O(1)",
        complexityNotes: "Bubble sorting a singly linked list in-place performs n(n-1)/2 node comparisons taking O(n²) time and O(1) space.",
        initialCode: `#include <iostream>
using namespace std;

class IntSLLNode {
public:
  IntSLLNode() { next = 0; }
  IntSLLNode(int el, IntSLLNode *ptr = 0) { info = el; next = ptr; }
  int info;
  IntSLLNode *next;
};

class IntSLList {
public:
  IntSLList() { head = tail = 0; }
  void addToTail(int el) {
    if (tail != 0) {
      tail->next = new IntSLLNode(el);
      tail = tail->next;
    } else head = tail = new IntSLLNode(el);
  }

  void printAll() {
    for (IntSLLNode *tmp = head; tmp != 0; tmp = tmp->next) cout << tmp->info << " ";
    cout << endl;
  }

  // TODO: Implement sortAscending() using nested pointer traversal
  void sortAscending() {
    if (head == 0 || head->next == 0) return;
    
    // Outer loop: pointer i from head to tail
    // Inner loop: pointer j from i->next to null
    // If i->info > j->info, swap values
    
  }
};

int main() {
  IntSLList l;
  int values[10] = {64, 34, 25, 12, 22, 11, 90, 88, 45, 50};
  for (int i = 0; i < 10; i++) l.addToTail(values[i]);

  cout << "Before Sorting: ";
  l.printAll();

  l.sortAscending();

  cout << "After Sorting (Ascending): ";
  l.printAll();
  return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;

class IntSLLNode {
public:
  IntSLLNode() { next = 0; }
  IntSLLNode(int el, IntSLLNode *ptr = 0) { info = el; next = ptr; }
  int info;
  IntSLLNode *next;
};

class IntSLList {
public:
  IntSLList() { head = tail = 0; }
  void addToTail(int el) {
    if (tail != 0) {
      tail->next = new IntSLLNode(el);
      tail = tail->next;
    } else head = tail = new IntSLLNode(el);
  }

  void printAll() {
    for (IntSLLNode *tmp = head; tmp != 0; tmp = tmp->next) cout << tmp->info << " ";
    cout << endl;
  }

  void sortAscending() {
    if (head == 0 || head->next == 0) return;
    for (IntSLLNode *i = head; i != 0; i = i->next) {
      for (IntSLLNode *j = i->next; j != 0; j = j->next) {
        if (i->info > j->info) {
          int temp = i->info;
          i->info = j->info;
          j->info = temp;
        }
      }
    }
  }
};

int main() {
  IntSLList l;
  int values[10] = {64, 34, 25, 12, 22, 11, 90, 88, 45, 50};
  for (int i = 0; i < 10; i++) l.addToTail(values[i]);

  cout << "Before Sorting: ";
  l.printAll();

  l.sortAscending();

  cout << "After Sorting (Ascending): ";
  l.printAll();
  return 0;
}`,
        solutionRegex: "for\\s*\\(IntSLLNode\\s*\\*\\s*i\\s*=\\s*head.*?for\\s*\\(IntSLLNode\\s*\\*\\s*j\\s*=\\s*i->next.*?i->info\\s*>\\s*j->info",
        frames: [
          { description: "Unsorted list of 10 nodes: [64, 34, 25, 12, 22, 11, 90, 88, 45, 50].", array: [64, 34, 25, 12, 22, 11, 90, 88, 45, 50], pointers: { head: 0, tail: 9 }, variables: { status: "Unsorted" } },
          { description: "Pass 1: Comparing i (64) with j (34, 25, 12, 11). Smallest value 11 swapped into head!", array: [11, 64, 34, 25, 22, 12, 90, 88, 45, 50], pointers: { i: 0 }, highlightIndices: [0], variables: { headValue: 11 } },
          { description: "Pass 2: Pointer i advances to index 1. Smallest in remaining list (12) placed into index 1.", array: [11, 12, 64, 34, 25, 22, 90, 88, 45, 50], pointers: { i: 1 }, highlightIndices: [1], variables: { sortedPrefix: "11, 12" } },
          { description: "Pass 3-5: Elements 22, 25, and 34 sorted into proper node positions.", array: [11, 12, 22, 25, 34, 64, 90, 88, 45, 50], pointers: { i: 4 }, highlightIndices: [2, 3, 4], variables: { activeIndex: 4 } },
          { description: "Pass 6-9: Remaining elements [45, 50, 64, 88, 90] bubble into ascending positions.", array: [11, 12, 22, 25, 34, 45, 50, 64, 88, 90], pointers: { i: 8 }, highlightIndices: [5, 6, 7, 8, 9], variables: { status: "Almost Sorted" } },
          { description: "Sorting Complete: Singly linked list of 10 nodes fully sorted in ascending order!", array: [11, 12, 22, 25, 34, 45, 50, 64, 88, 90], pointers: { head: 0, tail: 9 }, highlightIndices: [0, 9], variables: { min: 11, max: 90, status: "Ascending" } }
        ]
      },
      {
        id: "t10_5",
        title: "Pairwise Sum of Two Linked Lists (Lab 8 Assignment Q2)",
        description: "Read two linked lists of 5 nodes each and sum corresponding elements into a new third linked list (Lab 8 Assignment Q2).",
        difficulty: "Intermediate",
        optimalTimeComplexity: "O(n)",
        optimalSpaceComplexity: "O(n)",
        complexityNotes: "Traversing both 5-node lists concurrently and inserting their sum into list3 takes O(n) linear time.",
        initialCode: `#include <iostream>
using namespace std;

class IntSLLNode {
public:
  IntSLLNode() { next = 0; }
  IntSLLNode(int el, IntSLLNode *ptr = 0) { info = el; next = ptr; }
  int info;
  IntSLLNode *next;
};

class IntSLList {
public:
  IntSLList() { head = tail = 0; }
  void addToTail(int el) {
    if (tail != 0) {
      tail->next = new IntSLLNode(el);
      tail = tail->next;
    } else head = tail = new IntSLLNode(el);
  }

  void printAll() {
    for (IntSLLNode *tmp = head; tmp != 0; tmp = tmp->next) cout << tmp->info << " ";
    cout << endl;
  }

  IntSLLNode* getHead() { return head; }
};

// TODO: Implement sumTwoLists(IntSLList &l1, IntSLList &l2, IntSLList &l3)
// Traverse p1 from l1.head and p2 from l2.head concurrently
// Add (p1->info + p2->info) to l3 using l3.addToTail()
void sumTwoLists(IntSLList &l1, IntSLList &l2, IntSLList &l3) {
  
}

int main() {
  IntSLList list1, list2, list3;
  int a[5] = {10, 20, 30, 40, 50};
  int b[5] = {5, 15, 25, 35, 45};
  for (int i = 0; i < 5; i++) {
    list1.addToTail(a[i]);
    list2.addToTail(b[i]);
  }

  cout << "List 1: "; list1.printAll();
  cout << "List 2: "; list2.printAll();

  sumTwoLists(list1, list2, list3);

  cout << "List 3 (Pairwise Sums): "; list3.printAll();
  return 0;
}`,
        solutionCode: `#include <iostream>
using namespace std;

class IntSLLNode {
public:
  IntSLLNode() { next = 0; }
  IntSLLNode(int el, IntSLLNode *ptr = 0) { info = el; next = ptr; }
  int info;
  IntSLLNode *next;
};

class IntSLList {
public:
  IntSLList() { head = tail = 0; }
  void addToTail(int el) {
    if (tail != 0) {
      tail->next = new IntSLLNode(el);
      tail = tail->next;
    } else head = tail = new IntSLLNode(el);
  }

  void printAll() {
    for (IntSLLNode *tmp = head; tmp != 0; tmp = tmp->next) cout << tmp->info << " ";
    cout << endl;
  }

  IntSLLNode* getHead() { return head; }
};

void sumTwoLists(IntSLList &l1, IntSLList &l2, IntSLList &l3) {
  IntSLLNode *p1 = l1.getHead();
  IntSLLNode *p2 = l2.getHead();
  while (p1 != 0 && p2 != 0) {
    int sumVal = p1->info + p2->info;
    l3.addToTail(sumVal);
    p1 = p1->next;
    p2 = p2->next;
  }
}

int main() {
  IntSLList list1, list2, list3;
  int a[5] = {10, 20, 30, 40, 50};
  int b[5] = {5, 15, 25, 35, 45};
  for (int i = 0; i < 5; i++) {
    list1.addToTail(a[i]);
    list2.addToTail(b[i]);
  }

  cout << "List 1: "; list1.printAll();
  cout << "List 2: "; list2.printAll();

  sumTwoLists(list1, list2, list3);

  cout << "List 3 (Pairwise Sums): "; list3.printAll();
  return 0;
}`,
        solutionRegex: "p1\\s*!=\\s*0.*?p2\\s*!=\\s*0.*?p1->info\\s*\\+\\s*p2->info.*?l3\\.addToTail",
        frames: [
          { description: "List 1: [10, 20, 30, 40, 50] | List 2: [5, 15, 25, 35, 45]. List 3 initialized as empty.", array: [null, null, null, null, null], variables: { "List 1": "10, 20, 30, 40, 50", "List 2": "5, 15, 25, 35, 45", "List 3": "Empty" } },
          { description: "Node 0: p1->info (10) + p2->info (5) = 15. Added 15 to List 3.", array: [15, null, null, null, null], pointers: { p1: 0, p2: 0, l3_tail: 0 }, highlightIndices: [0], variables: { "p1->info": 10, "p2->info": 5, sum: 15 } },
          { description: "Node 1: p1->info (20) + p2->info (15) = 35. Added 35 to List 3.", array: [15, 35, null, null, null], pointers: { p1: 1, p2: 1, l3_tail: 1 }, highlightIndices: [1], variables: { "p1->info": 20, "p2->info": 15, sum: 35 } },
          { description: "Node 2: p1->info (30) + p2->info (25) = 55. Added 55 to List 3.", array: [15, 35, 55, null, null], pointers: { p1: 2, p2: 2, l3_tail: 2 }, highlightIndices: [2], variables: { "p1->info": 30, "p2->info": 25, sum: 55 } },
          { description: "Node 3: p1->info (40) + p2->info (35) = 75. Added 75 to List 3.", array: [15, 35, 55, 75, null], pointers: { p1: 3, p2: 3, l3_tail: 3 }, highlightIndices: [3], variables: { "p1->info": 40, "p2->info": 35, sum: 75 } },
          { description: "Node 4: p1->info (50) + p2->info (45) = 95. Added 95 to List 3.", array: [15, 35, 55, 75, 95], pointers: { p1: 4, p2: 4, l3_tail: 4 }, highlightIndices: [4], variables: { "p1->info": 50, "p2->info": 45, sum: 95 } },
          { description: "Pairwise Sum Complete! List 3 contains [15, 35, 55, 75, 95].", array: [15, 35, 55, 75, 95], pointers: { l3_head: 0, l3_tail: 4 }, variables: { resultList: "15, 35, 55, 75, 95", status: "Success" } }
        ]
      }
    ]
  }
];

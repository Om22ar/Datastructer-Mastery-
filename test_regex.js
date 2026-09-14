const modules = [
  {
    id: "m1",
    regex: "int\\s+arr\\s*\\[\\s*5\\s*\\]\\s*;.*?arr\\s*\\[\\s*0\\s*\\]\\s*=\\s*10\\s*;",
    code: `
      int arr[5];
      arr[0] = 10;
    `
  },
  {
    id: "m3",
    regex: "mid\\s*=\\s*\\(\\s*l\\s*\\+\\s*r\\s*\\)\\s*/\\s*2\\s*;.*?l\\s*=\\s*mid\\s*\\+\\s*1\\s*;.*?r\\s*=\\s*mid\\s*-\\s*1\\s*;",
    code: `
      mid = (l + r) / 2;
      l = mid + 1;
      r = mid - 1;
    `
  },
  {
    id: "m6",
    regex: "int\\s+model\\s*;\\s*float\\s+price\\s*;\\s*string\\s+motor_size\\s*;.*if\\s*\\(\\s*name\\s*==\\s*n\\s*\\)\\s*return\\s+true\\s*;\\s*else\\s*return\\s+false\\s*;",
    code: `
      int model;
      float price;
      string motor_size;
      
      if (name == n) return true;
      else return false;
    `
  },
  {
    id: "m7",
    regex: "stackTop\\s*<\\s*size\\s*-\\s*1.*?stackTop\\s*\\+\\+\\s*;.*?list\\[stackTop\\]\\s*=\\s*data\\s*;.*?stackTop\\s*>=\\s*0.*?t\\s*=\\s*list\\[stackTop\\]\\s*;.*?stackTop\\s*--\\s*;",
    code: `
      if(stackTop < size - 1) {
        stackTop++;
        list[stackTop] = data;
      }
      if(stackTop >= 0) {
        t = list[stackTop];
        stackTop--;
      }
    `
  }
];

for (const m of modules) {
  const r = new RegExp(m.regex, 's');
  console.log(m.id + " matched: " + r.test(m.code));
}

// avarage
const avarage = (...nums) => {
  nums.reduce((acc, val) => { acc + val, 0 })
}

// averageBy
const averageBy = (arr, fn) => {
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc +val, 0)
}

// 输出数组中出现最多的元素和次数
const maxEleNums = (arr) => {
  if (!Array.isArray(arr) && arr.length === 0) return
  let maxNum = 0
  let maxItem
  // let res = {}
  // arr.forEach(ele => {
  //   res[ele] ? res[ele]++ : res[ele] = 1
  //   if (res[ele] > maxNum) {
  //     maxNum = res[ele]
  //     maxItem = ele
  //   }
  // });
  arr.reduce((res, currentItem) => {
    res[currentItem] ? res[currentItem]++ : res[currentItem] = 1
    if (res[currentItem] > maxNum) {
      maxNum = res[currentItem]
      maxItem = currentItem
    }
    return res
  }, {})
}

// 100阶台阶一次走一步或两步多少种走法
// 斐波那契数列
const stepQuestion = (stepNum) => {
  let n1 = 1
  let n2 = 2
  let res = 0
  for (let i = 2; i < stepNum; i++) {
    res = n1 + n2
    n1 = n2
    n2 = res
  }
}

// 递归实现
const stepRec = (stepNum) => {
  if (stepNum === 1 || stepNum === 2) {
    return stepNum
  }
  return stepRec(stepNum - 1) + stepRec(stepNum - 2)
}
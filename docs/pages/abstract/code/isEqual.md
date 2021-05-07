# isEqual

> 比较两个值是否完全相等，主要比较复杂数据类型引用不同，而键值完全一样的情况。

``` js
/**
 * @param {object} obj1 对象1
 * @param {object} obj2 对象2
 * @return {boolean} 是否完全相等
 */
function isEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true
  }else if ((typeof obj1 === 'object' && obj1 !== null) && (typeof obj2 === 'object' && obj2 !== null)) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false
    }
    for(let prop in obj1) {
      if (obj2.hasOwnProperty(prop)) {
        // 递归
        if (!isEqual(obj1[prop], obj2[prop])) {
          return false
        }
      } else {
        return false
      }
    }
    // 递归对比之后完全相同，返回true
    return true
  } else {
    return false
  }
}
```




<Vssue :title="$title" />

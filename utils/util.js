const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//比对两个数组是否相同
const isArraysTheSame = function() {
  if (Array.prototype.equals)
      console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
    // 将.equals方法附加到数组的原型以对任何数组调用它
    Array.prototype.equals = function (array) {
      // 如果另一个数组是假值，则返回
      if (!array) return false;
      // 比较长度-可以节省很多时间
      if (this.length != array.length) return false;
      for (var i = 0, l = this.length; i < l; i++) {
        // 检查我们是否有嵌套数组
        if (this[i] instanceof Array && array[i] instanceof Array) {
          // 递归到嵌套数组中
          if (!this[i].equals(array[i])) return false;
        } else if (this[i] != array[i]) {
          // 警告:两个不同的对象实例永远不会相等:{x:20} != {x:20}
          return false;
        }
      }
      return true;
    }
    // 从for in循环中隐藏方法
    Object.defineProperty(Array.prototype, "equals", {
      enumerable: false
    });
}

module.exports = {
  formatTime: formatTime,
  
}



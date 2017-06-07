export default class jam {
  // constructor () {
  // }
  locDbSet (name, obj) {
    if (!name || !obj) {
      console.log('name,obj：参数不能为空！')
      return
    }
    window.localStorage.setItem(name, JSON.stringify(obj))
  }
  locDbGet (name) {
    if (!name) {
      console.log('locDbGet(name): name参数不能为空！')
      return
    }
    // return JSON.parse(window.localStorage.getItem(name)) || {error: '不存在'}
    return JSON.parse(window.localStorage.getItem(name))
  }
  isPhone (str) {
    var pattern1 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
    if (pattern1.test(str)) {
      return true
    } else {
      return false
    }
  }
  isPass (str) {
    var pattern2 = /^\w{6}$/
    if (pattern2.test(str)) {
      return true
    } else {
      return false
    }
  }
}

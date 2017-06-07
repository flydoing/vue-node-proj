export default class todoDb {
  constructor (name) {
    this.name = name
    if (JSON.stringify(this.get(this.name)) === '{}') {
      this.set([])
    }
  }
  set (val) {
    window.localStorage.setItem(this.name, JSON.stringify(val))
  }
  get () {
    return JSON.parse(window.localStorage.getItem(this.name)) || {}
  }
}

let Vue

const install = (_Vue) => {
  Vue = _Vue
  console.log('install')
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      }
      else {
        this.$store = this.$parent && this.$parent.$store
      }
    },
  })
}

const forEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key])
  })
}

class Store {
  constructor(options = {}) {
    let computed={}
    let getters = options.getters;
    this.getters = {}
    forEach(getters, (getterName, fn) => {
      computed[getterName]=()=>{fn(this.state)}
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          // return fn(this.state)
          return this._vm[getterName]
        }
      })
    })

    let mutations = options.mutations;
    this.mutations = {}
    forEach(mutations, (mutationName, fn) => {
      this.mutations[mutationName] = (payload) => {
        fn(this.state, payload)
      }
    })

    this.commit = (mutationName, payload) => {
      this.mutations[mutationName](payload)
    }

    let actions = options.actions
    this.actions = {}
    forEach(actions, (actionName, fn) => {
      this.actions[actionName] = (payload) => {
        fn(this, payload)
      }
    })
    this.dispatch = (actionName, payload) => {
      this.actions[actionName](payload)
    }

    this._vm = new Vue({ // 定义了state的响应式更新
      data() {
        return {
          state: options.state
        }
      },
      computed
    })

  }

  get state() {
    return this._vm.state
  }
}

export default {
  install,
  Store
}
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Fue(options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Fue)
  ) {
    warn('Fue is a constructor and should be called with the new keyword')
  }
  this._init(options)
}

initMixin(Fue)
stateMixin(Fue)
eventsMixin(Fue)
lifecycleMixin(Fue)
renderMixin(Fue)

export default Fue

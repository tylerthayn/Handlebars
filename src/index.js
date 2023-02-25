(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['handlebars', '@js/core'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('handlebars'), require('@tyler.thayn/js.core'))
	} else {
		factory(handlebars)
	}
}(function (Handlebars) {

	/**{block=Helpers}**/

	/**{block=Partials}**/

	/**{block=Templates}**/


	Handlebars.constructor.prototype.registerTemplate = function (...args) {
		if (typeof args[0] === 'object') {
			let options = args.length > 1 && typeof args[1] === 'object' ? args[1] : {}
			Object.keys(args[0]).forEach(name => {
				this.registerTemplate(name, args[0][name], options)
			})
		} else if (typeof args[0] === 'string') {
			let name = args.shift()
			if (args[0] instanceof Function) {
				this.templates.Set(name, args[0])
			} else if (typeof args[0] === 'string') {
				this.templates.Set(name, this.compile(args[0], typeof args[1] === 'object' ? args[1] : {}))
			}
		}
		return this
	}

	Handlebars.constructor.prototype.unregisterTemplate = function (name) {
		if (Array.isArray(name)) {
			name.forEach(n => {
				delete this.templates[n]
			})
		} else {
			delete this.templates[name]
		}
	}

	Templates.Each((v, k) => {
		Handlebars.registerTemplate(k, v)
	})

	return Handlebars

}))
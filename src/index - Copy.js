(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['handlebars', '@js/core'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('handlebars'), require('@tyler.thayn/js.core'))
	} else {
		factory(handlebars)
	}
}(function (Handlebars) {

	Handlebars.constructor.prototype.templates = {}
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

	Handlebars.registerHelper('JSON', (ctx) => {
		log(IsEqual(this, ctx))
		log(this)
		return new Handlebars.SafeString(JSON.stringify(ctx, null, '\t'))
	})

	Handlebars.registerTemplate('Name', `{{name}}`)
	Handlebars.registerTemplate('JSON', `{{JSON .}}`)
	Handlebars.registerTemplate('Renderer.Name', `??{{NAME}}\n??{{NAME .}}`)

	/**
	 * @typedef Options {
	 *   helpers
	 *   partials
	 *   templates
	 * }
	 */
	function Renderer (options = {}) {
		options = Extend({}, Renderer.Options, options)
		let hb = Handlebars.create()

		hb.registerHelper(options.helpers)
		hb.registerPartial(options.partials)
		hb.registerTemplate(options.templates)
log(hb.helpers)

		function Render (name, ctx, options = {}) {
			return hb.templates.Get(name, () => {})(ctx, Extend({}, {hb: hb}, options))
		}

		Render.hb = hb

		return Render
	}

	Renderer.Options = {
		helpers: {},
		partials: {},
		templates: {}
	}

	let Render = function (template, context, options = {}) {
		return Handlebars.templates[template](context, options)
	}

	Render.Renderer = Renderer

	Extend(Render, Handlebars)

	return Render
}))
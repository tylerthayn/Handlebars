(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['handlebars', 'just-handlebars-helpers', '@js/core'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('handlebars'), require('just-handlebars-helpers'), require('@tyler.thayn/js.core'))
	} else {
		factory(handlebars)
	}
}(function (Handlebars, H) {
	H.registerHelpers(Handlebars)
	function Create (helpers = {}, partials = {}) {
		let $ = Handlebars.create()
		Extend({}, this.helpers, helpers).Each((v, k) => $.registerHelper(k, v))
		Extend({}, this.partials, partials).Each((v, k) => $.registerPartial(k, v))
		Define($, 'Create', Create)
		return $
	}
	
	Define(Handlebars, 'Create', Create)

	/** CamelCase
	 * @helper CamelCase
	 * @param {string} text - Text to transform
	 * @param {boolean} upper - UpperCamelCase if true, lowerCamelCase if false
	 * @returns {string}
	 **/
	Handlebars.registerHelper('CamelCase', function (txt, upper = false) {
		return txt.CamelCase(upper)
	 })
	
	/** Compare
	 * @helper Compare
	 * @param {*} a
	 * @param {*} b
	 * @returns {boolean}
	 **/
	Handlebars.registerHelper('Compare', function (a, b) {
		return a === b
	 })
	
	/** Join
	 * @helper Join
	 * @param {array} context
	 * @param {string} txt
	 * @returns {string}
	 **/
	Handlebars.registerHelper('Join', function (names, s) {
		return names.join(s)
	 })
	
	/** JSON
	 * @helper JSON
	 * @param {object} context
	 * @param {boolean} pretty - pretty format json
	 * @returns {string}
	 **/
	Handlebars.registerHelper('JSON', function (ctx, pretty = true) {
		return new Handlebars.SafeString(pretty ? JSON.stringify(ctx, null, '\t') : JSON.stringify(ctx))
	 })

	Handlebars.registerPartial('JSON', "{{JSON .}}")
	Handlebars.registerPartial('Name', "{{name}}")

	function Renderer (...args) {
		let $H = Type(args.first, 'HandlebarsEnvironment') ? args.shift(): Handlebars
		ctx = Extend({}, {helpers: {}, partials: {}, templates: {}}, args.first || {})
	
		let $ = Handlebars.Create.call($H, ctx.helpers, ctx.partials)
		let $templates = Extend({}, ctx.templates)
	
		let Render = function (name = '', context = {}, options = {}) {
			let template = null
			if (Reflect.has($templates, name)) {
				if (typeof $templates[name] === 'string') {
					$templates[name] = $.compile($templates[name])
				}
				return $templates[name](context, options)
			} else if (Reflect.has($.partials, name)) {
				return $.compile(`{{> ${name}}}`)(context, options)
			} else {
				return $.compile(name)(context, options)
			}
			throw new Error('No template available')
		}
	
		Render.$ = $
		Render.$templates = $templates
	
		return Render
	}

	Handlebars.Renderer = Renderer

	return Handlebars

}))
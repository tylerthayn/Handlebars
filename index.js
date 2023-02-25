(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['handlebars', '@js/core'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('handlebars'), require('@tyler.thayn/js.core'))
	} else {
		factory(handlebars)
	}
}(function (Handlebars) {

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

		Handlebars.registerPartial('JSON', `{{JSON .}}`)

	Handlebars.registerPartial('Name', `{{name}}`)

		let Templates = {
		"JSON": "{{> JSON}}"
	}



	let defaults = {
		templates: {},
		styles: {
			std: {
				data: {},
				helpers: {},
				partials: {}
			}
		}
	}

	function Renderer (templates = {}, styles = {}) {

		let R = Extend({}, defaults) //, {templates: templates, styles: styles})
		Extend(R.styles, styles)
		templates.Each((v, k) => {
			R.templates[k] = Handlebars.compile(v)
		})

		//Handlebars.registerPartial('JSON', '')
		//Handlebars.registerPartial('Name', '')
		//Handlebars.registerPartial('Loud.Title', '')



		let Render = function (name = '', context = {}, options = {}) {
			[style, name] = name.includes('.') ? name.split('.') : ['std', name]
			options = Extend({}, R.styles[style], options)
			let template = null
			if (R.templates.Has(`${style}.${name}`)) {
				template = R.templates.Get(`${style}.${name}`)
			} else if (R.templates.Has(name)) {
				template = R.templates.Get(name)
			} else if (options.Has(`partials.${name}`) || Handlebars.Has(`partials.${name}`)) {
				template = Handlebars.compile(`{{>${name}}}`)
			} else if (options.Has(`partials.${name}`) || Handlebars.Has(`partials.${name}`)) {
				template = Handlebars.compile(`{{>${name}}}`)
			} else {
				throw new Error('No template available')
			}

			return template(context, options)
		}

		Render.templates = R.templates
		Render.styles = R.styles

		return Render

	}

	return Renderer

}))




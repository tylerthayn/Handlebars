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




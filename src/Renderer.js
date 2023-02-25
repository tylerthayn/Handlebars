
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

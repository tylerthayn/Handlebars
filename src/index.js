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
/**{block=Handlebars}**/

/**{block=Helpers}**/

/**{block=Partials}**/

/**{block=Renderer}**/

	Handlebars.Renderer = Renderer

	return Handlebars

}))

function Create (helpers = {}, partials = {}) {
	let $ = Handlebars.create()
	Extend({}, this.helpers, helpers).Each((v, k) => $.registerHelper(k, v))
	Extend({}, this.partials, partials).Each((v, k) => $.registerPartial(k, v))
	Define($, 'Create', Create)
	return $
}

Define(Handlebars, 'Create', Create)



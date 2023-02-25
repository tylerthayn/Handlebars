require('@tyler.thayn/js.core')
let Handlebars = require('handlebars')


function Create (helpers = {}, partials = {}) {
	let $ = Handlebars.create()
	Extend({}, this.helpers, helpers).Each((v, k) => $.registerHelper(k, v))
	Extend({}, this.partials, partials).Each((v, k) => $.registerPartial(k, v))
	Define($, 'Create', Create)
	return $
}

Define(Handlebars, 'Create', Create)


Handlebars.registerHelper('JSON', function (ctx) {
	return new Handlebars.SafeString(JSON.stringify(ctx))
})

let $ = Handlebars.Create({H1: () => {return 'H1'}}, {'H1': '{{H1}}'})
let $$ = $.Create({H2: () => {return 'H2'}}, {'H2': '{{H2}}{{> H1}}'})


let data = {
	name: 'Tyler',
	prefs: {
		style: 'good',
		customs: 'normal'
	}
}

log($$.compile(`{{> H2}}`)(data))

///let render1 = new Renderer()
//log(render1.Handlebars.compile(`{{JSON .}}`)(data))
//let render2 = new Renderer()
//log(render2.Handlebars.compile(`{{JSON .}}`)(data))

//log(render1.Handlebars === render2.Handlebars)



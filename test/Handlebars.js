require('@tyler.thayn/js.core')
let Handlebars = require('../')

let $ = Handlebars.Create(
	{
		H1: () => {return 'H1'}
	},
	{
		'H1': '{{H1}}'
	}
)
//let $$ = $.Create({H2: () => {return 'H2'}}, {'H2': '{{H2}}{{> H1}}'})


let $$ = new Handlebars.Renderer($, {
	partials: {
		Header: '<!-- Header -->{{log .}}',
		Main: '<!-- Main -->{{log .}}'
	},
	templates: {
		layout: `<div>{{> Header}}</div><div>{{> Main}}</div>`
	}
})


log(Object.keys($$.$.helpers))

let data = {
	name: 'Tyler',
	prefs: {
		style: 'good',
		customs: 'normal'
	}
}
//log($$.$.helpers.log.toString())
log($$('layout', data))

///let render1 = new Renderer()
//log(render1.Handlebars.compile(`{{JSON .}}`)(data))
//let render2 = new Renderer()
//log(render2.Handlebars.compile(`{{JSON .}}`)(data))

//log(render1.Handlebars === render2.Handlebars)



let Renderer = require('../')

let Render = new Renderer(
	{
		'Loud.Title': '<title>{{>Name name}}</title>'
	},
	{
		Loud: {
			partials: {
				'Title': '<TITLE>{{>Name name}}</TITLE>',
				'Name': '<NAME>{{.}}</NAME>'
			}
		},
		std: {
			helpers: {
				'Loud': function (ctx) {return ctx.toUpperCase()},
				'JSON': function (ctx, pretty = true) {
					return new Handlebars.SafeString(pretty ? JSON.stringify(ctx, null, '\t') : JSON.stringify(ctx))
				}
			},
			partials: {
				'JSON': `{{JSON .}}`,
				'Name': `<name>{{.}}</name>`,
				'Title': `<title>{{>Name name}}</title>`
			}
		}
	}
)

log(Render('Loud.Title',
	{
		name: 'Tyler Thayn'
	}
))


/*
let Renderers = {
	Std: new Render.Renderer('Std', {
		helpers: {
			'NAME': function (ctx) {log(this);log(ctx);return ctx.name}
		},
		templates: {
			'Name': '+++{{name}}'
		}
	})
}

//log(Render('{{name}}', {name: 'tyler'}))

	//log(Render.compile('{{JSON .}}')({name: 'Tyler'}))

log(Renderers.Std('Name', {name: 'Tyler'}))
//	log(Render('JSON', {name: 'Tyler'}))
*/


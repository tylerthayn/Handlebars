
let helpers = require('./BuildHelpers')
let partials = require('./BuildPartials')
let templates = require('./BuildTemplates')

let src = $fs.readFileSync('./Renderer.js', 'utf-8')


$fs.writeFileSync('index.js', src
	.replace('/**{block=Helpers}**/', require('./BuildHelpers'))
	.replace('/**{block=Partials}**/', require('./BuildPartials'))
	.replace('/**{block=Templates}**/', require('./BuildTemplates')),
	'utf-8')




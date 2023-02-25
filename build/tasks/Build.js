
let helpers = require('./BuildHelpers')
let partials = require('./BuildPartials')
let templates = require('./BuildTemplates')

let src = $fs.readFileSync('./src/index.js', 'utf-8')


$fs.writeFileSync('index.js', src
	.replace('/**{block=Handlebars}**/', '\t'+$fs.readFileSync('./src/Handlebars.js', 'utf-8').trim().replace(/\r\n/mg, `\r\n\t`))
	.replace('/**{block=Helpers}**/', '\t'+require('./BuildHelpers').trim())
	.replace('/**{block=Partials}**/', '\t'+require('./BuildPartials').trim())
	.replace('/**{block=Renderer}**/', '\t'+$fs.readFileSync('./src/Renderer.js', 'utf-8').trim().replace(/\r\n/mg, `\r\n\t`)),
	'utf-8')




require('@tyler.thayn/js.core')
$fs = require('fs')
$path = require('path')
let folder = $path.resolve('./src/templates')
let indent = '\t'

let partials = $fs.readdirSync(folder).map(f => {
	try {
		if (f.endsWith('.partial')) {
			let name = f.replace(/\.partial$/, '')
			let src = $fs.readFileSync($path.join(folder, f), 'utf-8').trim()
			return `Handlebars.registerPartial('${name}', ${JSON.stringify(src)})`
		}
	} catch (e) {}
	return null
}).filter(p => p !== null)

module.exports = partials.join('\r\n\t')



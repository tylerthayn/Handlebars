
let helpersFolder = $path.resolve('./src/helpers')
let indent = '\t'

let helpers = $fs.readdirSync(helpersFolder).map(f => {
	try {
		let name = f.replace(/\.js/, '')
		let src = $fs.readFileSync($path.join(helpersFolder, f), 'utf-8').trim()
		let comments = ''
		if (src.includes('*/')) {
			comments = src.slice(0, src.indexOf('*/')+2)
			src = src.slice(src.indexOf('*/')+2).trim()
		}
		return comments.trim() + `\nHandlebars.registerHelper('${name}', ${src})`
	} catch (e) {
		log(e)
		return null
	}
}).filter(h => h !== null).map(s => indent + s.replace(/\n/mg, `\n${indent}`))

module.exports = helpers.join('\n\n')



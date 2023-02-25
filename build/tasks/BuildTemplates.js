
let folder = $path.resolve('./src/templates')
let indent = '\t'

let templates = {}
$fs.readdirSync(folder).forEach(f => {
	try {
		if (f.endsWith('.template')) {
			let name = f.replace(/\.template$/, '')
			let src = $fs.readFileSync($path.join(folder, f), 'utf-8')
			templates[name] = JSON.stringify(src)
		}
	} catch (e) {}
})

let output = indent + `let Templates = {\n` + Object.keys(templates).map(k => {
	return indent + indent + `"${k}": ${templates[k]}`
}).join(',\n')+'\n'+indent+'}\n'

module.exports = output

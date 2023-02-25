


exports.Helper = function (path) {
	let src = $fs.readFileSync(path, 'utf-8').trim()

	return `Handlebars.registerHelper(${$path.basename(path).replace(/\.js/, '')}, ${src})`
}




function (meta) {
	return '<a href="'+$path.resolve(meta.path, meta.filename)+'" target="_blank">'+$path.relative($path.resolve('./'), $path.resolve(meta.path, meta.filename))+':'+meta.lineno+'</a>'
}





function (ctx, sort = 'name', options) {
	let data = [], keys = Object.keys(ctx)
	if (sort == 'outline') {
		Object.keys(ctx).filter(k => ctx[k]._.scope == 'static').filter(k => ctx[k]._.kind == 'member').sort().forEach(k => data.push(k))
		Object.keys(ctx).filter(k => ctx[k]._.scope == 'static').filter(k => ctx[k]._.kind == 'function').sort().forEach(k => data.push(k))
		Object.keys(ctx).filter(k => ctx[k]._.scope == 'instance').filter(k => ctx[k]._.kind == 'member').sort().forEach(k => data.push(k))
		Object.keys(ctx).filter(k => ctx[k]._.scope == 'instance').filter(k => ctx[k]._.kind == 'function').sort().forEach(k => data.push(k))
		keys = data
	}
	if (sort == 'global') {
		Object.keys(ctx).filter(k => ctx[k]._.kind == 'member').sort().forEach(k => data.push(k))
		Object.keys(ctx).filter(k => ctx[k]._.kind == 'function').sort().forEach(k => data.push(k))
		keys = data
	}

	return keys.map(k => {
		Define(ctx[k], '_name', k)
		return options.fn({
			name: k,
			value: ctx[k]
		})
	}).join('\n')
}

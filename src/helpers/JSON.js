/** JSON
 * @helper JSON
 * @param {object} context
 * @param {boolean} pretty - pretty format json
 * @returns {string}
 **/
function (ctx, pretty = true) {
	return new Handlebars.SafeString(pretty ? JSON.stringify(ctx, null, '\t') : JSON.stringify(ctx))
 }

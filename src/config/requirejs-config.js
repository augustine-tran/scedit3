var require = {
	paths: {

	},

	map: {
		'*': { 
			'jquery': 'lib/jquery-private'
		},

		'lib/jquery-private': { 'jquery': 'jquery' }
	},

	shim: {
		'underscore': {
			exports: '_',
			init: function() {
				return _.noConflict();
			}
		}
	}
};
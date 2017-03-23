// See http://docs.feathersjs.com/hooks/readme.html

exports.myHook = options => {
	return hook => {
		console.log('My custom global hook ran. Feathers is awesome!');
	};
};

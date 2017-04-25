
function createDemoData(hook) {
	if (hook.data.demo === true || hook.data.demo == 'true') {
		hook.data = require('../../demo/biodata');

		return hook.service.remove(null, { query: { userID: hook.params.user._id }}).then(() => hook);
	}
}

module.exports = () => createDemoData;

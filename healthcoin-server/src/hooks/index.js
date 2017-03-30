// See http://docs.feathersjs.com/hooks/readme.html

function setOwner() {
	return hook => { hook.data.userID = hook.params.user._id };
}

module.exports = {
	setOwner
};

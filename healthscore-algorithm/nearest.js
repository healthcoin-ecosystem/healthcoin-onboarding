
/**
 * Find the element of `array` with the value returned from `iteratee` nearest to `value`.
 * When multiple elements are equidistant from the target value, returns the element with the
 * lowest array index.
 *
 * @param {Array} array The array to inspect.
 * @param {*} value The target value.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} Returns the matching array element.
 */
function nearest(array, value, iteratee) {
	return array.reduce((previous, current) => {
		return Math.abs(iteratee(current) - value) < Math.abs(iteratee(previous) - value) ? current : previous;
	});
}

module.exports = nearest;

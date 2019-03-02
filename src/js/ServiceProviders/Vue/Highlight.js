
export default {
	deep: true,
	bind: function bind(el, binding) {
		let targets = el.querySelectorAll('code');
		let target;
		let i;
		for (i = 0; i < targets.length; i += 1) {
			target = targets[i];
			if (typeof binding.value === 'string') {
				target.textContent = binding.value;
			}
			hljs.configure({
				tabReplace: '  ', // 2 spaces
			})
			hljs.hljsBlock(target);
		}
	},
	componentUpdated: function componentUpdated(el, binding) {
		// after an update, re-fill the content and then hljs
		let targets = el.querySelectorAll('code');
		let target;
		let i;
		for (i = 0; i < targets.length; i += 1) {
			target = targets[i];
			if (typeof binding.value === 'string') {
				target.textContent = binding.value;
				hljs.hljsBlock(target);
			}
		}
	},
}
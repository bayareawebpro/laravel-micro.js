<script>
	export default {
		name: 'About'
	}
</script>
<template>
	<div class="container-fluid">
		<div class="card">
			<div class="card-body text-center">
				<h3 class="text-primary">About this Site</h3>
				<p class="lead">
					This site is an example of what you can build with this library.
				</p>
				<ul class="list-unstyled">
					<li>The loading sequences are for enjoyment only.</li>
					<li>All of the data shown is accurate and provided by the LaravelMicro container.</li>
					<li>To use these components in your project, simply copy them from the github repository.<br/>
						(Installing with NPM will only provide the core library files.)
					</li>
				</ul>
			</div>
			<div class="card-footer text-center">
				<a target="_blank" class="btn btn-primary" href="https://github.com/bayareawebpro/laravel-micro.js/tree/master/docs-src/js">
					<i class="fa fa-arrow-alt-circle-right"></i> View Components
				</a>
				<form action="https://www.paypal.com/cgi-bin/webscr" method="post" class="d-inline-block mt-2 mb-sm-0" target="_blank">
					<input type="hidden" name="business" value="dan@bayareawebpro.com">
					<input type="hidden" name="cmd" value="_donations">
					<input type="hidden" name="item_name" value="WP Lumen Framework">
					<input type="hidden" name="item_number" value="Developer Donation">
					<input type="hidden" name="currency_code" value="USD">
					<button type="submit" name="submit" class="btn btn-outline-secondary">
						<i class="fa fa-coffee"></i> Buy me a Coffee 🤖💤
					</button>
					<img alt="" width="1" height="1"
					     src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" >
				</form>
			</div>
		</div>
	</div>
</template>
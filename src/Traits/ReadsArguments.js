import Mixin from "./_Mixin"
export default (instance) => Mixin(instance, {
    _readArguments(callable){
	    // First match everything inside the function argument parens.
	    let args = callable.toString().match(/function.*?\(([^)]*)\)/)
	    if(args && args[1]){
		    // Split the arguments string into an array comma delimited.
		    // Ensure no inline comments are parsed and trim the whitespace.
		    // Ensure no undefined values are added.
		    return args[1]
			    .split(',')
			    .map((arg) => arg.trim())
			    .filter((arg) => arg)
	    }
	    return []
    }
})

module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
	rules: {
		"prettier/prettier": "error",
		// "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-console": 0,
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-useless-escape": 0
	},
	parserOptions: {
		parser: "@typescript-eslint/parser"
	},
	overrides: [
		{
			files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
			env: {
				jest: true
			}
		}
	]
};

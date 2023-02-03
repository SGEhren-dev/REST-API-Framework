module.exports = {
	env: {
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended"
	],
	overrides: [
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	rules: {
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/naming-convention": [
			"error",
			{
				"selector": "interface",
				"format": [ "PascalCase" ],
				"custom": {
					"regex": "^I[A-Z]",
					"match": true
				}
			},
			{
				"selector": "default",
				"format": [ "camelCase" ]
			},
			{
				"selector": "variable",
				"format": [ "camelCase", "UPPER_CASE", "PascalCase" ]
			},
			{
				"selector": "parameter",
				"format": [ "camelCase", "PascalCase" ],
				"leadingUnderscore": "allow"
			},
			{
				"selector": "memberLike",
				"modifiers": [ "private" ],
				"format": [ "camelCase" ],
				"leadingUnderscore": "require"
			},
			{
				"selector": "typeLike",
				"format": [ "PascalCase" ]
			},
			{
				"selector": "typeProperty",
				"format": [ "camelCase", "PascalCase" ]
			},
			{
				"selector": "classProperty",
				"format": [ "camelCase", "UPPER_CASE", "PascalCase" ]
			},
			{
				"selector": "enumMember",
				"format": [ "UPPER_CASE" ]
			},
			{
				"selector": "function",
				"format": [ "camelCase", "PascalCase", "UPPER_CASE" ]
			},
			{
				"selector": "objectLiteralProperty",
				"format": null
			},
			{
				"selector": "variable",
				"modifiers": [ "destructured" ],
				"format": null
			}
		],
		"indent": [2, "tab"],
		"no-tabs": 0,
		"quotes": [
			"error",
			"double",
			{
				"allowTemplateLiterals": true
			}
		],
		"max-len": [
			"warn",
			{
				"code": 120,
				"tabWidth": 4
			}
		],
		"spaced-comment": [
			"error",
			"always"
		],
		"space-before-blocks": [
			"error",
			"always"
		],
		"no-multiple-empty-lines": [
			"error",
			{
				"max": 1
			}
		],
		"eol-last": [
			"error",
			"always"
		],
		"no-trailing-spaces": "error",
	},
}

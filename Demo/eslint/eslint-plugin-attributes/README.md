# eslint-plugin-attributes

html标签属性数量过多时需换行

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-attributes`:

```
$ npm install eslint-plugin-attributes --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-attributes` globally.

## Usage

Add `attributes` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "attributes"
    ]
}
```

Use default by `extends` option

```json
{
    "extends": [
        "plugin:attributes/base"
    ]
}
```

Or configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "attributes/rule-name": 2
    }
}
```

## Supported Rules

Rule                              | Default       | Options              | Description    
----                              | -----------   | -------              | -------   
`max-attributes`                  | 2             | `[2, { max: 3, attrStrLimit: 50 }]`      | html标签属性数量过多时需换行，支持自动修复。若属性过少换行也会自动修复为一行。单个属性长度超出attrStrLimit时，即使属性较少也要换行。
`max-attribute-value-logical`     | 1             | `[1, { max: 2 }]`      | 属性上逻辑操作符出现的次数限制



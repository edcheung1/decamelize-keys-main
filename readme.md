# decamelize-keys

> Convert object keys from camel case using [`decamelize`](https://github.com/sindresorhus/decamelize)

## Install

```sh
npm install decamelize-keys
```

## Usage

```js
import decamelizeKeys from 'decamelize-keys';

// Convert an object
decamelizeKeys({fooBar: true});
//=> {foo_bar: true}

// Convert an array of objects
decamelizeKeys([{fooBar: true}, {barFoo: false}]);
//=> [{foo_bar: true}, {bar_foo: false}]
```

## API

### decamelizeKeys(input, options?)

#### input

Type: `object | object[]`

An object or array of objects to decamelize.

#### options

Type: `object`

##### separator

Type: `string`\
Default: `'_'`

The character or string used to separate words.

```js
import decamelizeKeys from 'decamelize-keys';

decamelizeKeys({fooBar: true});
//=> {foo_bar: true}

decamelizeKeys({fooBar: true}, {separator: '-'});
//=> {'foo-bar': true}
```

##### exclude

Type: `Array<string | RegExp>`\
Default: `[]`

Exclude keys from being decamelized.

##### excludeChildren

Type: `Array<string | RegExp>`\
Default: `[]`

Exclude children of given keys from being decamelized.

##### overrides

Type: `Array<[string | RegExp, string]>`\
Default: `[]`

Override keys with a custom value. The first element of the tuple is the key to match, and the second element is the value to use instead.

##### deep

Type: `boolean`\
Default: `false`

Recurse nested objects and objects in arrays.

```js
import decamelizeKeys from 'decamelize-keys';

decamelizeKeys({fooBar: true, nested: {unicornRainbow: true}}, {deep: true});
//=> {foo_bar: true, nested: {unicorn_rainbow: true}}
```

##### preserveConsecutiveUppercase

Type: `boolean`\
Default: `false`

Preserve sequences of uppercase characters.

```js
const decamelize = require('decamelize');

decamelize('testGUILabel');
//=> 'test_gui_label'

decamelize('testGUILabel', {preserveConsecutiveUppercase: true});
//=> 'test_GUI_label'
```

## Related

- [camelcase-keys](https://github.com/sindresorhus/camelcase-keys) - The inverse of this package.

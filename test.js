/* eslint-disable quote-props */
import test from 'ava';
import decamelizeKeys from './index.js';

test('main', t => {
	t.deepEqual(Object.keys(decamelizeKeys({fooBar: true})), ['foo_bar']);
});

test('separator option', t => {
	t.deepEqual(Object.keys(decamelizeKeys({fooBar: true}, {separator: '-'})), ['foo-bar']);
});

test('exclude option', t => {
	t.deepEqual(Object.keys(decamelizeKeys({'--': true}, {exclude: ['--']})), ['--']);
	t.deepEqual(Object.keys(decamelizeKeys({fooBar: true}, {exclude: [/^f/]})), ['fooBar']);
});

test('excludeChildren option', t => {
	t.deepEqual(
		decamelizeKeys(
			{
				aB: 1,
				aC: {
					cD: 1,
					cE: {
						eF: 1,
						gH: 1,
						hI: {
							jK: 1
						}
					}
				}
			}
			, {deep: true, excludeChildren: ['cE']}),
		// eslint-disable-next-line camelcase
		{a_b: 1, a_c: {c_d: 1, c_e: {eF: 1, gH: 1, hI: {j_k: 1}}}}
	);
});

test('overrides option', t => {
	t.deepEqual(
		decamelizeKeys({fooBar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}, {deep: true, overrides: [['fooBar', 'fooBarOverride']]}),
		// eslint-disable-next-line camelcase
		{fooBarOverride: true, obj: {one_two: false, arr: [{three_four: true}]}}
	);

	t.deepEqual(
		decamelizeKeys({fooBar: true, obj: {oneTwo: false, arr: [{nestedKey: true}]}}, {deep: true, overrides: [['fooBar', 'fooBarOverride'], ['nestedKey', 'nestedKeyOverride']]}),
		// eslint-disable-next-line camelcase
		{fooBarOverride: true, obj: {one_two: false, arr: [{nestedKeyOverride: true}]}}
	);

	t.deepEqual(
		decamelizeKeys({someRegexMatchKey: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}, {deep: true, overrides: [[/RegexMatch/, 'regexOverride']]}),
		// eslint-disable-next-line camelcase
		{regexOverride: true, obj: {one_two: false, arr: [{three_four: true}]}}
	);
});

test('deep option', t => {
	t.deepEqual(
		decamelizeKeys({fooBar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}, {deep: true}),
		{'foo_bar': true, obj: {'one_two': false, arr: [{'three_four': true}]}},
	);
});

test('handles nested arrays', t => {
	t.deepEqual(
		decamelizeKeys({fooBar: [['a', 'b']]}, {deep: true}),
		{'foo_bar': [['a', 'b']]},
	);
});

test('accepts an array of objects', t => {
	t.deepEqual(
		decamelizeKeys([{fooBar: true}, {barFoo: false}, {'bar_foo': 'false'}]),
		[{'foo_bar': true}, {'bar_foo': false}, {'bar_foo': 'false'}],
	);
});

test('handle array of non-objects', t => {
	const input = ['name 1', 'name 2'];
	t.deepEqual(
		decamelizeKeys(input),
		input,
	);
});

test('handle array of non-objects with `deep` option', t => {
	const input = ['name 1', 'name 2'];
	t.deepEqual(
		decamelizeKeys(input, {deep: true}),
		input,
	);
});

import Version from '../Version.js';

let testString = '3.2.1-prerelease.beta+metadata.otherdata';
let testStringWithVersionPrefix = 'v3.2.1-prerelease.beta+metadata.otherdata';
let testObject = {
	major: '3',
	minor: '2',
	patch: '1',
	prerelease: ['prerelease', 'beta'],
	metadata: ['metadata', 'otherdata']
};
let testObject2 = {
	major: '5',
	minor: '1',
	patch: '3',
	prerelease: ['prerelease2'],
	metadata: ['metadata2']
};
let testObject3 = {
	major: '3',
	minor: '2',
	patch: '1',
	prerelease: null,
	metadata: null
};


/**
 * Version Instatiation Tests
 */
test('a-version-can-be-made-from-a-string', () => {
	var v = new Version(testString);
	expect(v.major).toEqual(3);
	expect(v.minor).toEqual(2);
	expect(v.patch).toEqual(1);
	expect(v.prerelease.raw).toEqual('-prerelease.beta');
	expect(v.metadata.raw).toEqual('+metadata.otherdata');
	expect(v.prerelease.data).toEqual(['prerelease', 'beta'])
	expect(v.metadata.data).toEqual(['metadata', 'otherdata'])

	var v2 = new Version(testStringWithVersionPrefix);
	expect(v.major).toEqual(3);
	expect(v.minor).toEqual(2);
	expect(v.patch).toEqual(1);
	expect(v.prerelease.raw).toEqual('-prerelease.beta');
	expect(v.metadata.raw).toEqual('+metadata.otherdata');
	expect(v.prerelease.data).toEqual(['prerelease', 'beta'])
	expect(v.metadata.data).toEqual(['metadata', 'otherdata'])
});

test('a-version-can-be-made-from-an-object', () => {
	var v = new Version(testObject);
	expect(v.major).toEqual(3);
	expect(v.minor).toEqual(2);
	expect(v.patch).toEqual(1);
	expect(v.prerelease.raw).toEqual('-prerelease.beta');
	expect(v.metadata.raw).toEqual('+metadata.otherdata');
	expect(v.prerelease.data).toEqual(['prerelease', 'beta'])
	expect(v.metadata.data).toEqual(['metadata', 'otherdata'])
});

test('a-version-can-be-made-from-an-object-without-prerelease', () => {
	var v = new Version(testObject3);
	expect(v.major).toEqual(3);
	expect(v.minor).toEqual(2);
	expect(v.patch).toEqual(1);
	expect(v.prerelease.raw).toEqual(null);
	expect(v.prerelease.data).toEqual([])
});

test('a-version-can-be-made-from-an-object-without-metadata', () => {
	var v = new Version(testObject3);
	expect(v.major).toEqual(3);
	expect(v.minor).toEqual(2);
	expect(v.patch).toEqual(1);
	expect(v.metadata.raw).toEqual(null);
	expect(v.metadata.data).toEqual([])
});

/**
 * Version Patch Tests
 */
test('a-version-patch-can-be-set', () => {
	var v = new Version(testObject);
	v.setPatch('10');
	expect(v.patch).toEqual(10);
	v.setPatch(6);
	expect(v.patch).toEqual(6);
});

test('a-version-patch-can-be-added-to', () => {
	var v = new Version(testObject);
	v.addPatch('4');
	expect(v.patch).toEqual(5);
	v.addPatch(3);
	expect(v.patch).toEqual(8);
});

test('a-version-patch-can-be-subtracted-from', () => {
	var v = new Version(testObject);
	v.setPatch(15);
	v.subPatch('4');
	expect(v.patch).toEqual(11);
	v.subPatch(5);
	expect(v.patch).toEqual(6);
});

/**
 * Version Minor Tests
 */
test('a-version-minor-can-be-set', () => {
	var v = new Version(testObject);
	v.setMinor('10');
	expect(v.minor).toEqual(10);
	v.setMinor(6);
	expect(v.minor).toEqual(6);
});

test('a-version-minor-can-be-added-to', () => {
	var v = new Version(testObject);
	v.addMinor('4');
	expect(v.minor).toEqual(6);
	v.addMinor(3);
	expect(v.minor).toEqual(9);
});

test('a-version-minor-can-be-subtracted-from', () => {
	var v = new Version(testObject);
	v.setMinor(15);
	v.subMinor('4');
	expect(v.minor).toEqual(11);
	v.subMinor(5);
	expect(v.minor).toEqual(6);
});

/**
 * Version Major Tests
 */
test('a-version-major-can-be-set', () => {
	var v = new Version(testObject);
	v.setMajor('10');
	expect(v.major).toEqual(10);
	v.setMajor(6);
	expect(v.major).toEqual(6);
});

test('a-version-major-can-be-added-to', () => {
	var v = new Version(testObject);
	v.addMajor('4');
	expect(v.major).toEqual(7);
	v.addMajor(3);
	expect(v.major).toEqual(10);
});

test('a-version-major-can-be-subtracted-from', () => {
	var v = new Version(testObject);
	v.setMajor(15);
	v.subMajor('4');
	expect(v.major).toEqual(11);
	v.subMajor(5);
	expect(v.major).toEqual(6);
});

/**
 * Comparison Tests
 */
test('a-version-is-greater-than-another-version', () => {
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison = v.isGreaterThan(v2)
	expect(comparison).toBeFalsy();

	var comparison2 = v2.isGreaterThan(v)
	expect(comparison2).toBeTruthy();
});

test('a-version-is-less-than-another-version', () => {
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison = v.isLessThan(v2)

	expect(comparison).toBeTruthy();

	var comparison2 = v2.isLessThan(v)

	expect(comparison2).toBeFalsy();
});

test('a-version-is-equal-to-another-version', () => {
	// 	Objects are equal
	var v = new Version(testObject);
	var v2 = new Version(testObject);
	var comparison = v.isEqualTo(v2)

	expect(comparison).toBeTruthy();

	// 	Objects are equal with precision
	var v = new Version(testObject);
	var v2 = new Version(testObject);
	var comparison = v.isEqualTo(v2, true)

	expect(comparison).toBeTruthy();
});

test('a-version-is-not-equal-to-another-version', () => {
	// 	Objects are NOT equal
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison2 = v.isEqualTo(v2);

	expect(comparison2).toBeFalsy();

	// 	Objects are NOT equal with precision
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison2 = v.isEqualTo(v2, true);

	expect(comparison2).toBeFalsy();
});

test('a-version-is-equal-to-or-less-than-another-version', () => {
	/**
	 * Without precision.
	 */
	
	// 	Objects are equal
	var v = new Version(testObject);
	var v2 = new Version(testObject);
	var comparison = v.isEqualOrLessThan(v2);

	expect(comparison).toBeTruthy();

	//	Smaller version compared to greater one
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison = v.isEqualOrLessThan(v2);

	expect(comparison).toBeTruthy();

	//	Greater version compared to smaller one
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison = v2.isEqualOrLessThan(v);

	expect(comparison).toBeFalsy();

	/**
	 * With precision.
	 */

	// 	Objects are equal
	var v = new Version(testObject);
	var v2 = new Version(testObject);
	var comparison = v.isEqualOrLessThan(v2, true);

	expect(comparison).toBeTruthy();

	//	Smaller version compared to greater one
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison = v.isEqualOrLessThan(v2, true);

	expect(comparison).toBeTruthy();

	//	Greater version compared to smaller one
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison = v2.isEqualOrLessThan(v, true);

	expect(comparison).toBeFalsy();
});

test('a-version-is-equal-to-or-greater-than-another-version', () => {
	/**
	 * Without precision.
	 */
	
	// 	Objects are equal
	var v = new Version(testObject);
	var v2 = new Version(testObject);
	var comparison = v.isEqualOrGreaterThan(v2);

	expect(comparison).toBeTruthy();

	//	Smaller version compared to greater one
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison = v.isEqualOrGreaterThan(v2);

	expect(comparison).toBeFalsy();

	//	Greater version compared to smaller one
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison = v2.isEqualOrGreaterThan(v);

	expect(comparison).toBeTruthy();

	/**
	 * With precision.
	 */
	
	// 	Objects are equal
	var v = new Version(testObject);
	var v2 = new Version(testObject);
	var comparison = v.isEqualOrGreaterThan(v2, true);

	expect(comparison).toBeTruthy();

	//	Smaller version compared to greater one
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison = v.isEqualOrGreaterThan(v2, true);

	expect(comparison).toBeFalsy();

	//	Greater version compared to smaller one
	var v = new Version(testObject);
	var v2 = new Version(testObject2);
	var comparison = v2.isEqualOrGreaterThan(v, true);

	expect(comparison).toBeTruthy();

});

/**
 * Output Tests
 */
test('a-version-can-be-output-as-a-string', () => {
	var v = new Version(testString);

	expect(v.toString()).toEqual(testString);
});

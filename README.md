# version-js
**A lightweight version class to handle semantic version manipulation in Javascript.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![npm (scoped)](https://img.shields.io/npm/v/version-js.svg)
![CircleCI](https://img.shields.io/circleci/build/github/lukejamesmorrison/version-js/master.svg?token=1a15027984edabea745cbe4b3fb63de0c8ed48eb)

## Installation

To install run: 

```
npm install version-js
```

And import by adding:

```javascript
import Version from 'version-js';
```


## Data Types

A `Version` object can be instantiated with either a Semantic Version string or an object with preformatted properties resembling a semantic version object.

### String
```javascript
let string = '3.2.1-beta.release+meta.data'
```

The formatted string must follow conventions outlined in [the Semantic Version documentation](https://semver.org). It may be preceeded by the character `v` which will be omitted when parsed.

### Object
```javascript
let object = {
    major: 3, 
    minor: 2, 
    patch: 1, 
    prerelease: ['beta', 'release'], 
    metadata: ['meta', 'data']
}
```

The basic version object must follow the above format. Pre-release and metadata items should be set in an array.

## Usage

### Instantiation

A Version object can be instantiated like the following:

```javascript
let version = new Version('3.2.1-beta.release+meta.data');
```

or

```javascript
let version = new Version({
    major: 3, 
    minor: 2, 
    patch: 1, 
    prerelease: ['beta', 'release'], 
    metadata: ['meta', 'data']
});
```

### Modification

As of now, a `Version` object's version *levels* can be modified like the following:

**Add version level**

```javascript
version.addMajor();
// version.major = 3+1 = 4
```

**Subtract version level**

```javascript
version.subMajor();
// version.major = 3-1 = 2
```

**Set version level**

```javascript
version.setMajor(10);
// version.major = 10
```

The above mathematical operations accept an optional `value` parameter which allows for nonstandard version changing like the following:

```javascript
version.addMajor(5);
// version.major = 2+5 = 7
```

The following methods are available for `Version` modification:

```javascript
addMajor(value = 1); // Add to Major version
subMajor(value = 1); // Subtract from Major version
setMajor(); // Set Major version
addMinor(value = 1); // Add to Minor version
subMinor(value = 1); // Subtract from Minor version
setMinor(); // Set Minor version
addPatch(value = 1); // Add to Patch version
subPatch(value = 1); // Subtract from Patch version
setPatch(); // Set Patch version
```

All modifiers accept either a `string` or `integer` representation of a positive integer.

### Comparison

A `Version` object may be compared to another.

Assuming a second `version2` object:

```javascript
let version2 = new Version({
    major: 5, 
    minor: 4, 
    patch: 3, 
    prerelease: ['beta', 'release'], 
    metadata: ['meta', 'data']
});
```

We can determine if `version` is **greater than** `version2`:

```javascript
version.isGreaterThan(version2);    //	False (3.2.1 << 5.4.3)
```

Or **less than**:
```javascript
version.isLessThan(version2);   //	True (3.2.1 << 5.4.3)
```

Or **equal to**:
```javascript
version.isEqualTo(version2, precise = false);   //	False (3.2.1 != 5.4.3)
```

Or **less than *or* equal to**:
```javascript
version.isEqualOrLessThan(version2, precise = false);   //  True (3.2.1 << 5.4.3)
```

Or **greater than *or* equal to**:
```javascript
version.isEqualOrGreaterThan(version2, precise = false);    //  False (3.2.1 << 5.4.3)
```

**Note**: `isEqualTo()`, `isEqualOrLessThan()` and `isEqualOrGreaterThan()` accept an optional second parameter `precise` which tells it to do a precise match when compared for equality.  If `precise = false` (default) then the version will only be compared by Major, Minor and Patch values.  If `precise = true`, the pre-release and metadata will also be evaluated (This would be considered a **perfect** match).

## License

The `version-js` package is open-source software under the [MIT License](https://opensource.org/licenses/MIT).

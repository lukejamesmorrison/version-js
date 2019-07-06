/**
 * The Version class will handly all Semantic Version logic for the application.
 *
 * @link https://semver.org
 */
class Version {
	
	/**
	 * Construct version object.
	 * @param  {string|object} version This is the user-input version.  
	 *                                 It can be received as a semantic version string 
	 *                                 OR an object with major, minor, patch and options parameters.
	 * @return void
	 */
	constructor(version) {
		this.versionRaw = version;
		this._buildVersion(version);
		// console.log(this);
	}

	/**
	 * Build version object based on its type.
	 * @param  {string|object} version 	The semantic version string or Version object.
	 * @return {void|object}         	If version is of incorrect type, an error with bw thrown.
	 */
	_buildVersion(version) {
		if(typeof version == 'string') {
			this._buildVersionFromString(version);
		}
		else if(typeof version == 'object') {
			this._buildVersionFromObject(version);
		}
		else {
			throw new Error("Version can only be instatiated using a semantic version string (3.2.1-prerelease+metadata) or an object {major,minor,patch,prerelease,metadata}"); 
		}
	}

	_displayVersion() {
		// console.log(`New version is ${this.major}.${this.minor}.${this.patch}`);
	}

	/**
	 * Set a patch version.
	 * @param {string|int} value The value to be added to the patch.
	 */
	setPatch(value = null) {
		this._setVersion('patch', parseInt(value));
		this._displayVersion();
	}

	/**
	 * Add a patch version.
	 * @param {string|int} value The value to be added to the patch.
	 */
	addPatch(value = null) {
		this._addVersion('patch', parseInt(value));
		this._displayVersion();
	}

	/**
	 * Substract from a patch version.
	 * @param {string|int} value The value to be subtracted from the patch.
	 */
	subPatch(value = null) {
		this._subVersion('patch', parseInt(value));
		this._displayVersion();
	}

	/**
	 * Set a minor version.
	 * @param {string|int} value The value to be added to the minor.
	 */
	setMinor(value = null) {
		this._setVersion('minor', parseInt(value));
		this._displayVersion();
	}

	/**
	 * Add a minor version.
	 * @param {string|int} value The value to be added to the minor.
	 */
	addMinor(value = null) {
		this._addVersion('minor', parseInt(value));
		this._displayVersion();
	}

	/**
	 * Substract from a minor version.
	 * @param {string|int} value The value to be subtracted from the minor.
	 */
	subMinor(value = null) {
		this._subVersion('minor', parseInt(value));
		this._displayVersion();
	}

	/**
	 * Set a major version.
	 * @param {string|int} value The value to be added to the major.
	 */
	setMajor(value = null) {
		this._setVersion('major', parseInt(value));
		this._displayVersion();
	}

	/**
	 * Add a major version.
	 * @param {string|int} value The value to be added to the major.
	 */
	addMajor(value = null) {
		this._addVersion('major', parseInt(value));
		this._displayVersion();
	}

	/**
	 * Substract from a major version.
	 * @param {string|int} value The value to be subtracted from the major.
	 */
	subMajor(value = null) {
		this._subVersion('major', parseInt(value));
		this._displayVersion();
	}

		
	/**
	 * Subtract a version level.
	 * @param  {version} version 	Name of the version level. 'major' | 'minor' | 'patch'
	 * @param  {string|int} value   The value to be subtracted. Optional.
	 * @return void
	 */
	_subVersion(version, value = null) {
		this[version] = value ? this[version] - value : this[version--];
	}

	/**
	 * Add a version level.
	 * @param  {version} version 	Name of the version level. 'major' | 'minor' | 'patch'
	 * @param  {string|int} value   The value to be added. Optional.
	 * @return void
	 */
	_addVersion(version, value = null) {
		this[version] = value ? this[version] + value : this[version++];
	}

	/**
	 * Set a version level.
	 * @param  {version} version 	Name of the version level. 'major' | 'minor' | 'patch'
	 * @param  {string|int} value   The value to be set. Optional.
	 * @return void
	 */
	_setVersion(version, value) {
		this[version] = value;
	}

	/**
	 * Determine if a version is greater than another.
	 * @param  {object}  	The Version object to be compared against.
	 * @return {Boolean}    Is version object greater than other version object?
	 */
	isGreaterThan(version) {
		if(+this.major > +version.major) {
			return true;
		} else if(+this.major == +version.major) {
			if(+this.minor > +version.minor) {
				return true;
			} else if(+this.minor == +version.minor) {
				if(+this.patch > +version.patch) {
					return true;
				};
			};
		};
		return false;
	};

	/**
	 * Determine if a version is less than another.
	 * @param  {object}		version 	The Version object to be compared against.
	 * @return {Boolean}    			Is version object less than other version object?
	 */
	isLessThan(version) {
		if(+this.major < +version.major) {
			return true;
		} else if(+this.major == +version.major) {
			if(+this.minor < +version.minor) {
				return true;
			} else if(+this.minor == +version.minor) {
				if(+this.patch < +version.patch) {
					return true;
				};
			};
		};
		return false;
	};

	/**
	 * Determine if a version object is equal to another.
	 * @param  {object}  	version 	The Version object to be compared against.
	 * @param  {Boolean} 	precise  	Does user want to compare prerelease and 
	 * 						            metadata properties for EXACT match.
	 * @return {Boolean}    			Are objects EQUAL?
	 */
	isEqualTo(version, precise = false) {
		if(precise) {
			var output = 	+this.major == +version.major && 
							+this.minor == +version.minor && 
							+this.patch == +version.patch &&
							+this.prerelease == +version.prerelease &&
							+this.metadata == +version.metadata;
		};
		var output =	+this.major == +version.major && 
						+this.minor == +version.minor && 
						+this.patch == +version.patch;

		return output;
	};

	/**
	 * Determine if a version object is greater than or equal to another.
	 * @param  {object}  	version 	The Version object to be compared against.
	 * @param  {Boolean} 	precise 	Does user want to compare prerelease and 
	 * 						            metadata properties for EXACT match.
	 * @return {Boolean}    			Are objects EQUAL or GREATER THAN?
	 */
	isEqualOrLessThan(version, precise = false) {
		return this.isLessThan(version) || this.isEqualTo(version, precise);
	}

	/**
	 * Determine if a version object is less than or equal to another.
	 * @param  {object}  	version 	The Version object to be compared against.
	 * @param  {Boolean} 	precise 	Does user want to compare prerelease and 
	 * 						            metadata properties for EXACT match.
	 * @return {Boolean}    			Are objects EQUAL or LESS THAN?
	 */
	isEqualOrGreaterThan(version, precise = false) {
		return this.isGreaterThan(version) || this.isEqualTo(version, precise);
	}

	/**
	 * Return semantic version string
	 * @return {string} The Semantic Version string.
	 */
	toString() {
		return [this.major, this.minor, this.patch].join('.') + '-' + this.prerelease.data.join('.') + '+' + this.metadata.data.join('.');
	}

	/**
	 * Private method to set object properties from semantic version string.
	 * @link https://semver.org
	 * @param  {string} string The semantic Version string.
	 * @return void
	 */
	_buildVersionFromString(string) {
		//break string into parts
		let verDetails = string.match(versionMatchString);

		//assign each part to an object param
		this.major = parseInt(verDetails[1]);
		this.minor = parseInt(verDetails[2]);
		this.patch = parseInt(verDetails[3]);

		// Set Prerelease
		if(verDetails[4]) {
			var preInit = verDetails[4].match(/(?!\-).*/gi);
			this.prerelease = {
				raw: verDetails[4],
				data: preInit[0].split('.')
			};
		};

		//	Set Metadata
		if(verDetails[8]) {
			var metaInit = verDetails[8].match(/(?!\+).*/gi);
			this.metadata = {
				raw: verDetails[8],
				data: metaInit[0].split('.')
			};
		};	
	}

	/**
	 * Private method to set object properties from semantic version object.
	 * @link https://semver.org
	 * @param  {string} string The semantic Version string.
	 * @return void
	 */
	_buildVersionFromObject(object) {
		//assign each part to an object param
		this.major = parseInt(object.major);
		this.minor = parseInt(object.minor);
		this.patch = parseInt(object.patch);
		this.prerelease = {
			raw: null,
			data: []
		};
		this.metadata = {
			raw: null,
			data: []
		}

		// Set Prerelease
		if(object.prerelease) {
			object.prerelease.forEach(item => {
				this.prerelease.data.push(item);
			});
			this.prerelease.raw = '-' + object.prerelease.join('.')
		} else {
			this.prerelease = {
				raw: null,
				data: []
			};
		};
		
		//	Set Metadata
		if(object.metadata) {
			object.metadata.forEach(item => {
				this.metadata.data.push(item);
			});
			this.metadata.raw = '+' + object.metadata.join('.')
		} else {
			this.metadata = {
				raw: null,
				data: []
			};
		};
	}
}

/**
 * The RegExp to decompose a Semantic Version string. 
 *
 * The string will handle leading characters ie. 'v' 
 * and the five major semantic verison components 
 * in accordance with SemVer documentation.
 * 
 * @type {RegExp}
 */
let versionMatchString = /^(?:[a-zA-Z])?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$/mi;

export default Version;

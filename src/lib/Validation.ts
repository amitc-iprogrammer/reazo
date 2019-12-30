/**
 * @file Provides validation methods.
 * @author James W Cramer
 */

import * as  moment from 'moment';
import { IOktaPasswordComplexity } from './Authentication/types/OktaAuth';

/**
 * Enum for common validation regular expressions.
 * @readonly
 * @exports
 * @enum {RegExp} ValidationRegularExpressions
 */
export const ValidationRegularExpressions =
{
	/** Email regular expression */
	Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	/** Phone regular expression */
	Phone: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
}

/**
 * Enum for supported validation types.
 * @readonly
 * @exports
 * @enum {ValidationTypes}
 */
export const ValidationTypes = {

	/** Validates integers */
	Integer: 'INTEGER',
	/** Validates numbers */
	Number: 'NUMBER',
	/** Validates dates */
	Date: 'DATE',
	/** Validates regular expression */
	RegularExpression: 'REGULAR_EXPRESSION',
	/** Validates minimum length */
	MinimumLength: 'MINIMUM_LENGTH',
	/** Validates that a string contains lower case values */
	ContainsLowerCase: 'CONTAINS_LOWER_CASE',
	/** Validates that a string contains upper case values */
	ContainsUpperCase: 'CONTAINS_UPPER-CASE',
	/** Validates that a string contains integer values */
	ContainsInteger: 'CONTAINS_INTEGER',
	/** Validates that a string contains symbol values */
	ContainsNonAlphaNumeric: 'CONTAINS_NON_ALPHA_NUMERIC',
	/** Validates a comparison */
	Compare: 'COMPARE',
	/** Validates that a given object is a valid Google PlaceResult object. */
	GooglePlaceResult: 'GOOGLE_PLACE_RESULT',
	/** Validates that a given object is a valid IScriptLocation object. */
	ScriptLocation: 'SCRIPT_LOCATION'
}

/**
 * Enum for supported compare data types.
 * @readonly
 * @exports
 * @enum {string} CompareDataTypes
 */
export const CompareDataTypes =
{
	/** Compares string */
	String: 'STRING',
	Number: 'NUMBER'
}

/**
 * Enum for supported compare data types.
 * @readonly
 * @exports
 * @enum {string} CompareOperators
 */
export const CompareOperators =
{
	/** Compares equality */
	Equal: 'EQUAL',
	NotEqual: 'NOT_EQUAL',
	GreaterThanOrEqual: 'GREATER_THAN_OR_EQUAL'
}

/**
 * @typedef RegularExpressionOptions
 * @type {string}
 */

/**
 * @typedef MinimumLengthOptions
 * @type {object}
 * @property {Number} length - The minimum length to validate.
 */

/**
 * @typedef OccurrencesOptions
 * @type {object}
 * @property {Number} occurrences 
 * The minimum number of occurrences of the validated type.
 */

/**
 * @typedef CompareOptions
 * @type {object}
 * @property {CompareDataTypes} dataType 	- The data type to check.
 * @property {CompareOperators} operator 	- The comparison operator.
 * @property {object} compareValue 		- The value to compare.
 */

/**
 * @typedef Validator
 * @type {object}
 * @property {ValidationTypes} type
 * 		The type of the validator.
 * @property {RegularExpressionOptions|MinimumLengthOptions|OccurrencesOptions|CompareOptions} options
 * 		The type specific compare options. 
 */

/**
 * @function Validate
 * Preforms validation given a value, if the value is required and a validators
 * or an array of validators.
 * 
 * @exports
 * 
 * @param {object} value 							- The value being validated.
 * @param {boolean} required						- If the value is required.
 * @param {Validator|Array.<Validator>} validators	- The validator or array of validators. 
 * 
 * @return {boolean} - If the argument 'value' is valid.
 */
export const Validate =
	(value: (string | null | undefined),
		required: (boolean | null | undefined),
		validators: (IValidator[] | IValidator | null) = <any>{ type: 'NONE', options: null }
	): boolean => {
		const valueExists = ValidateRequired(value);

		if (required === true) {
			if (valueExists === false) {
				return false;
			}
		}
		else {
			if (valueExists === false) {
				return true;
			}
		}

		if (validators === null || validators === undefined) {
			return true;
		}

		if (validators !== null && !(validators instanceof Array)) {
			validators = [validators];
		}

		return validators.every(validator => {
			if (validator !== null && validationHandlers.hasOwnProperty(validator.type)) {
				return validationHandlers[validator.type](value, validator.options);
			}

			return true;
		});
	}

/**
 * @typedef {{value: string}} ValidationFormField
 */

/**
 * @typedef {Object.<string, ValidationFormField>} ValidationForm
 */

/**
 * @callback handleFormChange
 * 
 * Callback to change the values of a form being validated.
 * 
 * @param {string} field 		- The name of the field to update.
 * @param {string} value 		- The value to update the field with.
 * @param {boolean} isValid 	- If the value is valid or not.
 */

/**
 * @function ValidateForm
 * Preforms validation of a form given the form, an array of validators and
 * a callback method to update the form.
 * 
 * @exports
 * 
 * @param {ValidationForm} form					
 * 	The value being validated.
 * @param {Array.<Validator>} validators
 * 	The validator or array of validators. 
 * @param {handleFormChange} handleFormChange	
 * 	The callback to change the form under validation. 
 * 
 * @return {boolean} - If the argument 'form' is valid.
 */
export const ValidateForm =
	(form: { [key: string]: { value: string } }, validators: IValidator[], handleFormChange: (field: string, value: string, isValid: boolean) => void) => {
		let formIsValid = true;

		Object.keys(validators).forEach((key) => {

			let fieldIsValid = true;
			const fieldValue = form[key].value;

			fieldIsValid = Validate(fieldValue,
				validators[key].required,
				validators[key].validators);

			if (fieldIsValid === false) {
				formIsValid = false;
				handleFormChange(key, fieldValue, false);
			}
		});

		return formIsValid;
	}

	export const ValidateValidationForm =
	( form: { 
			[key: string]: { 
				value: string | null,
				validation: {
					required :boolean,
					validators? :IValidator[] | IValidator | null
				}
			} 
		}, handleFormChange: (field: string, value: string | null, isValid: boolean) => void) => {

		let formIsValid = true;

		Object.keys(form).forEach((field) => {

			let fieldIsValid = true;
			const fieldValue = form[field].value;

			fieldIsValid = Validate(fieldValue,
				form[field].validation.required,
				form[field].validation.validators);

			if (fieldIsValid === false) {
				formIsValid = false;
				handleFormChange(field, fieldValue, false);
			}
		});

		return formIsValid;
	}

/** 
 * @typedef BuildComplexityValidators
 * @type {object}
 * @property {Number} 	minLength - Password minimum length.
 * @property {Number} 	minLowerCase - Required number of lowercase.
 * @property {Number} 	minUpperCase - Required number of uppercae.
 * @property {Number} 	minNumber - Required number of numerals.
 * @property {Number} 	minSymbol - Required number of symbols.
 */

/**
 * @function BuildComplexityOptions
 * Builds a set of validators and validation messages for password complexity validation.
 * 
 * @exports
 * 
 * @param {ComplexityValidationOptions} complexity
 * 
 * @returns {Array.<Validator>};
 */
export const BuildComplexityValidators =
	(complexity: IOktaPasswordComplexity) => {
		const validators: IValidator[] = [];

		if (!complexity) {
			return validators;
		}

		if (complexity.minLength && complexity.minLength > 0) {
			validators.push({ type: <any>ValidationTypes.MinimumLength, options: { length: complexity.minLength } });
		}

		if (complexity.minUpperCase && complexity.minUpperCase > 0) {
			validators.push({ type: <any>ValidationTypes.ContainsUpperCase, options: { occurrences: complexity.minUpperCase } });
		}

		if (complexity.minLowerCase && complexity.minLowerCase > 0) {
			validators.push({ type: <any>ValidationTypes.ContainsLowerCase, options: { occurrences: complexity.minLowerCase } });
		}

		if (complexity.minNumber && complexity.minNumber > 0) {
			validators.push({ type: <any>ValidationTypes.ContainsInteger, options: { occurrences: complexity.minNumber } });
		}

		if (complexity.minSymbol && complexity.minSymbol > 0) {
			validators.push({ type: <any>ValidationTypes.ContainsNonAlphaNumeric, options: { occurrences: complexity.minSymbol } });
		}

		return validators;
	}

/**
 * @function ValidateRequired
 * Validates a required field.
 * 
 * @param {object} value 		- The value to validate.
 * @param {object} typeOptions 	- Unused.
 * 
 * @returns {boolean} - If the value is truthy.
 */
const ValidateRequired =
	(value: any, typeOptions = {}): boolean => {
		return !!value;
	}

/**
 * @function ValidateInteger
 * Validates an integer.
 * 
 * @param {object} value 		- The value to validate.
 * @param {object} typeOptions 	- Unused.
 * 
 * @returns {boolean} - If the argument value is an integer.
 */
const ValidateInteger = (value: any, typeOptions = {}): boolean => {
	// tslint:disable-next-line
	return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}

/**
 * @function ValidateNumber
 * Validates a number.
 * 
 * @param {object} value 		- The value to validate.
 * @param {object} typeOptions 	- Unused.
 * 
 * @returns {boolean} - If the argument value is a number.
 */
const ValidateNumber = (value: any, typeOptions = {}): boolean => {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * @function ValidateDate
 * Validates a date / time value.
 * 
 * @param {object} value 		- The value to validate.
 * @param {object} typeOptions 	- Unused.
 * 
 * @returns {boolean} - If the argument value is a date / time .
 */
const ValidateDate = (value: any, typeOptions = {}): boolean => {
	return moment(value).isValid();
}

/**
 * @function ValidateRegularExpression
 * Validates for a regular expression match.
 * 
 * @param {object} value							- The value to validate.
 * @param {RegularExpressionOptions} typeOptions 	- The regex to validate against.
 * 
 * @returns {boolean} - If the argument value matches the argument regex.
 */
const ValidateRegularExpression = (value: any, typeOptions: RegExp): boolean => {
	const regEx = new RegExp(typeOptions);

	return regEx.test(value);
}

/**
 * @function ValidateMinimumLength
 * Validates for a minimum length
 * 
 * @param {object} value						- The value to validate.
 * @param {MinimumLengthOptions} typeOptions 	- The regex to validate against.
 * 
 * @returns {boolean} - If the argument value is of the minimum length
 */
const ValidateMinimumLength = (value: any, typeOptions: { length: number }): boolean => {
	const length = typeOptions.length || 0;

	const regEx = new RegExp(`.{` + length + `,}`);

	return regEx.test(value);
}

/**
 * @function ValidateContainsLowerCase
 * Validates for a containing lower case character(s).
 * 
 * @param {object} value					- The value to validate.
 * @param {OccurrencesOptions} typeOptions 	- The number of required lower case.
 * 
 * @returns {boolean} 
 * 	If the argument value contains a minimum number of lower case characters.
 */
const ValidateContainsLowerCase = (value: any, typeOptions: { occurrences?: number } = {}): boolean => {
	const occurrences: number = typeOptions !== null && typeOptions !== undefined ? typeOptions.occurrences || 1 : 1;

	const regEx: RegExp = new RegExp(`[a-z]{` + occurrences + `,}`);

	return regEx.test(value);
}

/**
 * @function ValidateContainsLowerCase
 * Validates for a containing upper case character(s).
 * 
 * @param {object} value					- The value to validate.
 * @param {OccurrencesOptions} typeOptions 	- The number of required upper case.
 * 
 * @returns {boolean} 
 * 	If the argument value contains a minimum number of upper case characters.
 */
const ValidateContainsUpperCase = (value: any, typeOptions: { occurrences?: number } = {}): boolean => {
	const occurrences: number = typeOptions !== null && typeOptions !== undefined ? typeOptions.occurrences || 1 : 1;


	const regEx: RegExp = new RegExp(`[A-Z]{` + occurrences + `,}`);

	return regEx.test(value);
}

/**
 * @function VaildateContainsInteger
 * Validates for a containing integer character(s).
 * 
 * @param {object} value					- The value to validate.
 * @param {OccurrencesOptions} typeOptions 	- The number of required integers.
 * 
 * @returns {boolean} 
 * 	If the argument value contains a minimum number of integer characters.
 */
const VaildateContainsInteger = (value: any, typeOptions: { occurrences?: number } = {}): boolean => {
	const occurrences: number = typeOptions !== null && typeOptions !== undefined ? typeOptions.occurrences || 1 : 1;

	const regEx: RegExp = new RegExp(`\\d{` + occurrences + `,}`);

	return regEx.test(value);
}

/**
 * @function VaildateContainsNonAlphaNumeric
 * Validates for a containing symbol character(s).
 * 
 * @param {object} value					- The value to validate.
 * @param {OccurrencesOptions} typeOptions 	- The number of required symbols.
 * 
 * @returns {boolean} 
 * 	If the argument value contains a minimum number of symbol characters.
 */
const VaildateContainsNonAlphaNumeric = (value: any, typeOptions: { occurrences?: number } = {}): boolean => {
	const occurrences: number = typeOptions !== null && typeOptions !== undefined ? typeOptions.occurrences || 1 : 1;


	const regEx: RegExp = new RegExp(`\\W{` + occurrences + `,}`);

	return regEx.test(value);
}

/**
 * @function ValidateGooglePlaceResult
 * Validates for an object containing specific propeties included in a 
 * IScriptLocation field.
 * 
 * @param {object} value					- The value to validate.
 * 
 * @returns {boolean} 
 * 	If the argument value conforms to the contains the properties we would
 * expect from a IScriptLocation.
 */
const ValidateScriptLocation = (value: any): boolean => {

	if (value === null || value === undefined) {
		return false;
	}

	if (value.formatted_address === null ||
		value.formatted_address === undefined) {
		return false;
	}

	if (value.point === null ||
		value.point === undefined)
	{
		return false;
	}

	if (value.point.lat === null ||
		value.point.lat === undefined) {
		return false;
	}

	if (value.point.lon === null ||
		value.point.lon === undefined) {
		return false;
	}

	return true;
}


/**
 * @function ValidateGooglePlaceResult
 * Validates for an object containing specific propeties included in a 
 * Google PlaceResult.
 * 
 * @param {object} value					- The value to validate.
 * 
 * @returns {boolean} 
 * 	If the argument value conforms to the contains the properties we would
 * expect from a Google PlaceResult.
 */
const ValidateGooglePlaceResult = (value: any): boolean => {
	if (value === null || value === undefined) {
		return false;
	}

	if (value.formatted_address === null ||
		value.formatted_address === undefined) {
		return false;
	}

	if (value.geometry === null ||
		value.geometry === undefined) {
		return false;
	}
	else {
		if (value.geometry.location === null ||
			value.geometry.location === undefined) {
			return false;
		}
		else {
			if (value.geometry.location.lat === null ||
				value.geometry.location.lat === undefined ||
				value.geometry.location.lng === null ||
				value.geometry.location.lng === undefined) {
				return false;
			}
		}
	}

	return true;
}


/**
 * @function ValidateCompare
 * Validates for a containing symbol character(s).
 * 
 * TODO: This method currently only supports comparing string for
 * equality. More comparison options should be addedd.
 * 
 * @param {object} value					- The value to validate.
 * @param {CompareOptions} typeOptions 		- The compare options.
 * 
 * @throws {TypeError} - If passed an unsupported comparison data type.
 * 
 * @returns {boolean} 
 * 	If the argument value conforms to the compare options.
 */
const ValidateCompare = (value: (string | number), typeOptions = { dataType: '', operator: '', compareValue: '' }): boolean => {
	if (compareHandlers.hasOwnProperty(typeOptions.dataType)) {
		return (compareHandlers[typeOptions.dataType] as any )(value, typeOptions.operator, typeOptions.compareValue);
	}
	else {
		throw TypeError(`The compare data type ${typeOptions.dataType} is not supported.`);
	}
}

/**
 * @function CompareNumber
 * Compares two numbers based on the 'operator' argument.
 * 
 * 
 * @param {string} value					- The value to validate.
 * @param {CompareOperators} operator 		- The compare operator.
 * @param {string} compareValue				- The value to compare against.
 * 
 * @throws {TypeError} - If passed an unsupported comparison data type.
 * 
 * @returns {boolean} 
 * 	If the argument value conforms to the compare options.
 */
const CompareNumber = (value: number, operator :string, compareValue :number): boolean => {


	if (operator === CompareOperators.Equal) {
		if (typeof value === 'number') {
			return value === compareValue;
		}
		else {
			return false;
		}
	}
	else if (operator === CompareOperators.NotEqual) {
		if (typeof value === 'number') {
			return value !== compareValue;
		}
		else {
			return true;
		}
	}
	else if(operator === CompareOperators.GreaterThanOrEqual) {
		if (typeof value === 'number') {
			return value >= compareValue;
		}
		else {
			return false;
		}
	}

	throw TypeError(`The compare operator ${operator} is not supported.`);
}


/**
 * @function CompareString
 * Compares two string based on the 'operator' argument.
 * 
 * TODO: This method currently only support testing for equaility and inequality.
 * More options should be added.
 * 
 * @param {string} value					- The value to validate.
 * @param {CompareOperators} operator 		- The compare operator.
 * @param {string} compareValue				- The value to compare against.
 * 
 * @throws {TypeError} - If passed an unsupported comparison data type.
 * 
 * @returns {boolean} 
 * 	If the argument value conforms to the compare options.
 */
const CompareString = (value: any, operator :string, compareValue: string): boolean => {
	if (operator === CompareOperators.Equal) {
		if (typeof value === 'string' || value instanceof String) {
			return value === compareValue;
		}
		else {
			return false;
		}
	}
	else if (operator === CompareOperators.NotEqual) {
		if (typeof value === 'string' || value instanceof String) {
			return value !== compareValue;
		}
		else {
			return true;
		}
	}

	throw TypeError(`The compare operator ${operator} is not supported.`);
}



const compareHandlers =
{
	[CompareDataTypes.String]: CompareString,
	[CompareDataTypes.Number]: CompareNumber
}

const validationHandlers: {
	[x: string]: (value: any, typeOptions?: { dataType?: string, operator?: string, compareValue?: string, length?: number, occurences?: number } | null) => boolean;
} = {

	[ValidationTypes.Integer]: ValidateInteger,
	[ValidationTypes.Number]: ValidateNumber,
	[ValidationTypes.Date]: ValidateDate,
	[ValidationTypes.RegularExpression]: ValidateRegularExpression,
	[ValidationTypes.MinimumLength]: ValidateMinimumLength,
	[ValidationTypes.ContainsLowerCase]: ValidateContainsLowerCase,
	[ValidationTypes.ContainsUpperCase]: ValidateContainsUpperCase,
	[ValidationTypes.ContainsInteger]: VaildateContainsInteger,
	[ValidationTypes.ContainsNonAlphaNumeric]: VaildateContainsNonAlphaNumeric,
	[ValidationTypes.Compare]: ValidateCompare,
	[ValidationTypes.GooglePlaceResult]: ValidateGooglePlaceResult,
	[ValidationTypes.ScriptLocation]: ValidateScriptLocation
};


declare enum ValidatorType {

	/** Validates integers */
	Integer = 'INTEGER',
	/** Validates numbers */
	Number = 'NUMBER',
	/** Validates dates */
	Date = 'DATE',
	/** Validates regular expression */
	RegularExpression = 'REGULAR_EXPRESSION',
	/** Validates minimum length */
	MinimumLength = 'MINIMUM_LENGTH',
	/** Validates that a string contains lower case values */
	ContainsLowerCase = 'CONTAINS_LOWER_CASE',
	/** Validates that a string contains upper case values */
	ContainsUpperCase = 'CONTAINS_UPPER-CASE',
	/** Validates that a string contains integer values */
	ContainsInteger = 'CONTAINS_INTEGER',
	/** Validates that a string contains symbol values */
	ContainsNonAlphaNumeric = 'CONTAINS_NON_ALPHA_NUMERIC',
	/** Validates a comparison */
	Compare ='COMPARE',
	/** Validates that a given object is a valid Google PlaceResult object. */
	GooglePlaceResult = 'GOOGLE_PLACE_RESULT',
	None = 'NONE'
}

interface IValidator {
	required?: boolean;
	type: ValidatorType;
	options: ( IValidatorOptions | null);
	message?: string;
}

interface IValidatorOptions {

}
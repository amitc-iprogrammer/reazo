import { LayoutCreators } from "./types/LayoutCreators";

/**
 * @file Provides actions for Layout related events.
 * @author James W Cramer
 */

/**
 * @typedef LayoutActionTypes
 * @type {object}
 * @readonly
 * @export
 *
 * @property {string}	ShowDimmer					
 * Shows a dimmer wrapped around the main content of the page.
 * @property {string}	HideDimmer					
 * Hide the layout dimmer.
 * @property {string}	ShowMessage
 * Shows a message to the user.
 * @property {string}	HideMessage					
 * Hides the layout message.
 */
export const LayoutActionTypes = 
{
	ShowDimmer: 'SHOW_DIMMER',
	HideDimmer: 'HIDE_DIMMER',
	ShowMessage: 'SHOW_MESSAGE',
	HideMessage: 'HIDE_MESSAGE'
}

/** 
 * @typedef ShowDimmerAction
 * @type {object}
 * 
 * @property {string} type 		
 * LayoutActionTypes.ShowDimmer					
 * @property  {string} icon    
 * The name of the icon to show in the dimmer. 
 * @property  {string} header    
 * The header text to be shown in the dimmer.
 * @property  {string} text    
 * The text to be shown in the dimmer.
 * @property  {boolean} loading    
 * Applys the loading attribute to the icon		
 */

/** 
 * @function ShowDimmer
 * Shows a dimmer wrapped around the main content of the page.
 * 
 * @exports
 * @param  {string} icon    
 *         The name of the icon to show in the dimmer. 
 * @param  {string} header    
 *         The header text to be shown in the dimmer.
 * @param  {string} text    
 *         The text to be shown in the dimmer.
 * @param  {boolean} loading    
 *         Applys the loading attribute to the icon
 * @returns {ShowDimmerAction}
 */
export const ShowDimmer: LayoutCreators.ShowDimmerCreator = 
( icon: string, header: string, text:string, loading:boolean ): LayoutCreators.ShowDimmer =>
{
	return {
		type:LayoutActionTypes.ShowDimmer,
		icon:icon,
		header:header,
		text:text,
		loading:loading
	};
}

/** @function HideDimmer
 * Hide the layout dimmer.
 * 
 * @exports 
 * @returns {{type: string}} LayoutActionTypes.HideDimmer
 */
export const HideDimmer: LayoutCreators.HideDimmerCreator = ( ): LayoutCreators.HideDimmer =>
{
	return { type:LayoutActionTypes.HideDimmer };
}

/** 
 * @typedef ShowMessageAction
 * @type {object}
 * @property {string} type 		
 * LayoutActionTypes.ShowMessage					
 * @property  {string} icon    
 * The name of the icon to show in the message. 
 * @property  {string} header    
 * The header text to be shown in the message.
 * @property  {string} text    
 * The text to be shown in the message.
 * @property  {boolean} positive    
 * If the message should have positive or negative contexual styling.
 * @property  {boolean} dismissable    
 * If the user should be allowed to dismiss the message	
 */

/** 
 * @function ShowDimmer
 * Shows a dimmer wrapped around the main content of the page.
 * 
 * @exports
 * @param  {string} icon    
 *         The name of the icon to show in the message. 
 * @param  {string} header    
 *         The header text to be shown in the message.
 * @param  {string} text    
 *         The text to be shown in the message.
 * @param  {boolean} positive    
 *         If the message should have positive or negative contexual styling.
 * @param  {boolean} dismissable    
 *         If the user should be allowed to dismiss the message
 * 
 * @returns {ShowMessageAction}
 */
export const ShowMessage: LayoutCreators.ShowMessageCreator = 
( icon: string, header: string, text: string, positive: boolean, dismissable: boolean ): LayoutCreators.ShowMessage =>
{
	return {
		type:LayoutActionTypes.ShowMessage,
		icon:icon,
		header:header,
		text:text,
		dismissable:dismissable,
		positive:positive
	};
}

/** 
 * @function HideDimmer
 * Hide the layout message.
 * 
 * @exports 
 * @returns {{type: string}} LayoutActionTypes.HideMessage
 */
export const HideMessage: LayoutCreators.HideMessageCreator = ( ): LayoutCreators.HideDimmer =>
{
	return { type:LayoutActionTypes.HideMessage };
}
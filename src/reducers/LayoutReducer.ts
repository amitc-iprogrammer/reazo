/**
 * @file Provides Redux state for Layout related data.
 * @author James W Cramer
 */

import { Reducer } from 'redux';
import { LayoutActionTypes } from '../creators/LayoutCreators'
import { LayoutCreators } from '../creators/types/LayoutCreators';

/**
 * @typedef LayoutMessage
 * @type {object}
 * 
 * @property {boolean} visible 	- Indicates if the message is visible
 * @property {string} icon 		- The name of the icon to render in the message
 * @property {string} header 	- The header text for the message
 * @property {string} text 		- The content for the message
 * @property {boolean} positive - Render positive or negative contextual styles
 */

/**
 * @typedef LayoutDimmer
 * @type {object}
 * 
 * @property {boolean} visible 	- Indicates if the dimmer is visible
 * @property {string} icon 		- The name of the icon to render in the dimmer
 * @property {string} header 	- The header text for the dimmer
 * @property {string} text 		- The content for the dimmer
 * @property {boolean} loading 	- Renders the icon with a loading attribute
 */

/**
 * @typedef LayoutState
 * @type {object}
 * 
 * @property {LayoutMessage} message
 * @property {LayoutDimmer} dimmer
 */

/**
 * The initial state of the layout.
 * @var {LayoutState} initialState
 */
const initialState: LayoutReducerState = {
	message: { visible: false, icon: '', header: '', text: '', positive: null, dismissable: false },
	dimmer: { visible: false, icon: '', header: '', text: '', loading: false }
};

/** 
 * @typedef ShowDimmerAction
 * @type {object}
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
 * @function handleShowDimmer
 * This method sets the state to indicate that the layout dimmer should be 
 * visible and sets the state properties of the layout dimmer.
 * 
 * @param {LayoutState} state 
 * @param {ShowDimmerAction} action 
 * 
 * @returns {LayoutState} The mutated state.
 */
const handleShowDimmer = (state: LayoutReducerState, action: LayoutCreators.ShowDimmer): LayoutReducerState => {
	return {
		...state,
		dimmer: {
			visible: true,
			icon: action.icon,
			header: action.header,
			text: action.text,
			loading: action.loading
		}
	}
}

/**
 * @function handleShowDimmer
 * This method sets the state to indicate that the layout dimmer should be
 * hidden and resets the dimmer to its initial state.
 * 
 * @param {LayoutState} state 
 * @param {{type: string }} action LayoutActionTypes.HideDimmer
 * 
 * @returns {LayoutState} The mutated state.
 */
const handleHideDimmer = (state: LayoutReducerState, action: LayoutCreators.HideDimmer): LayoutReducerState => {
	return {
		...state,
		dimmer: {
			visible: false,
			icon: '',
			header: '',
			text: '',
			loading: false
		}
	}
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
 * @function handleShowMessage
 * This method sets the state to indicate that the layout message should be 
 * visible and sets the state properties of the layout message.
 * 
 * @param {LayoutState} state 
 * @param {ShowMessageAction} action 
 * 
 * @returns {LayoutState} The mutated state.
 */

const handleShowMessage = (state: LayoutReducerState, action: LayoutCreators.ShowMessage): LayoutReducerState => {
	return {
		...state,
		message: {
			visible: true,
			icon: action.icon,
			header: action.header,
			text: action.text,
			positive: action.positive,
			dismissable: action.dismissable
		}
	}
}

/**
 * @function handleHideMessage
 * This method sets the state to indicate that the layout message should be 
 * hidden and resets the message to its initial state.
 * 
 * @param {LayoutState} state 
 * @param {{type: string }} action LayoutActionTypes.HideMessage
 * 
 * @returns {LayoutState} The mutated state.
 */
const handleHideMessage = (state: LayoutReducerState, action: LayoutCreators.HideMessage): LayoutReducerState => {
	return {
		...state,
		message: {
			...state.message,
			visible: false
		}
	}
}

/**
 * Maps the handler methods to the Layout Action Types
 * @var {object} handlers
 */
const handlers: { [x: string]: (state: LayoutReducerState, action: LayoutCreators.Actions) => LayoutReducerState } =
	{
		[LayoutActionTypes.ShowMessage]: handleShowMessage,
		[LayoutActionTypes.ShowDimmer]: handleShowDimmer,
		[LayoutActionTypes.HideDimmer]: handleHideDimmer,
		[LayoutActionTypes.HideMessage]: handleHideMessage
	};

/**
 * @function AuthenticationReducer
 * This method is the reducer passed to redux that will respond to all 
 * Layout actions.
 * 
 * @exports
 * @see /src/creators/LayoutCreators
 * 
 * @param {LayoutState} state 
 * @param {{ type: string }|ShowMessageAction|ShowDimmerAction} action 
 * 
 * @returns {LayoutState} 
 * 	The initial state if there is no current state, the mutated state if an action 
 * 	was handled, or the current state if the argument action was not handled.
 */
const LayoutReducer: Reducer<LayoutReducerState> = (state: LayoutReducerState, action: LayoutCreators.Actions): LayoutReducerState => {
	if (state === undefined) {
		return initialState;
	}

	if (action && action.type && handlers.hasOwnProperty(action.type)) {
		return handlers[action.type](state, action)
	}
	else {
		return state;
	}
}

export default LayoutReducer
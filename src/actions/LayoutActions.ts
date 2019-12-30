import * as LayoutCreators from '../creators/LayoutCreators'

export const onDismissMessage = () => ( (dispatch :any) => dispatch( LayoutCreators.HideMessage() ) )

export const onDismissModal = () => { throw new TypeError('Not Implemented'); };

// import * as moment from 'moment'
import * as React from 'react';
import {  Segment } from 'semantic-ui-react'



const ResetPasswordLayout = (props: any) =>
	(
		<Segment className='login-segment' textAlign='center' clearing padded>
			{props.children}
			{/* <div className='login-copyright-notice'>
				<Icon name='copyright' fitted />
				{moment().format('YYYY')}
			</div> */}
		</Segment>
	)

export default ResetPasswordLayout
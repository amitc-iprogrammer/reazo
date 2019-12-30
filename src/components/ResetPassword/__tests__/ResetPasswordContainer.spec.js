import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import { 
	VerifyTokenLoadingView, 
	VerifyTokenFailureView,
	SecurityQuestionView,
	ChangePasswordView,
	ChangePasswordSuccessView
} from '../ResetPasswordView'
import { ResetPasswordContainer } from '../ResetPasswordContainer'

configure({ adapter: new Adapter() });

const testResetPasswordProps = {
	securityQuestionForm: { 
		answer: { value:'', isValid:true, touched:false } 
	},
	changePasswordForm: { 
		newPassword: { value:'', isValid:true, touched:false }, 
		confirmPassword: { value:'', isValid:true, touched:false }						 
	},
	verifyToken: {
		loading:false,
		success:false,
		error:false
	},
	securityQuestion: {
		question:'',
		loading:false,
		success:false,
		error:false
	},
	changePassword: {
		loading:false,
		success:false,
		error:false,
		complexity : {
			excludeUsername:true,
			minLength:0,
			minLowerCase:0,
			minNumber:0,
			minSymbol:0,
			minUpperCase:0
		}
	}
};

describe('The ResetPasswordContainer component', () => {

	it('renders without crashing', () => {
		shallow(<ResetPasswordContainer />);
	});

	it('renders nothing in its default state', () => {

		const wrapper = shallow(<ResetPasswordContainer />);

		expect(wrapper.instance().render()).toBeNull();
	});

	it('calls the onVerifyToken prop when it mounts and has a value for the token', () => {

		const mockHandleVerifyToken = jest.fn();
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		const matchProps = { params: {token: 'testtoken'} };
	
		const wrapper = shallow(
			<ResetPasswordContainer
				onVerifyToken={mockHandleVerifyToken} 
				resetPassword={resetPasswordProps}  
				match={matchProps}
			/>
		);
		
		expect(mockHandleVerifyToken.mock.calls.length).toBe(1);	
	});

	it('calls the onVerifyToken prop with the correct argument when it mounts and has a value for the token', () => {

		const mockHandleVerifyToken = jest.fn();
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		const matchProps = { params: {token: 'testtoken'} };
	
		const wrapper = shallow(
			<ResetPasswordContainer
				onVerifyToken={mockHandleVerifyToken} 
				resetPassword={resetPasswordProps}  
				match={matchProps}
			/>
		);
		
		expect(mockHandleVerifyToken.mock.calls.length).toBe(1);	
		expect(mockHandleVerifyToken.mock.calls[0][0]).toBe('testtoken');
	});

	it('renders the ChangePasswordSuccessView when the changePassword.success prop is set', () => {
		
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		resetPasswordProps.changePassword.success = true;
	
		const wrapper = shallow(<ResetPasswordContainer resetPassword={resetPasswordProps} />);
	
		expect(wrapper.dive().childAt(1).type()).toEqual(ChangePasswordSuccessView);
	});

	it('renders the ChangePasswordView when the securityQuestion.success prop is set', () => {
		
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		resetPasswordProps.securityQuestion.success = true;
	
		const wrapper = shallow(<ResetPasswordContainer resetPassword={resetPasswordProps} />);
	
		expect(wrapper.dive().childAt(1).type()).toEqual(ChangePasswordView);
	});

	it('renders the SecurityQuestionView when the verifyToken.success prop is set', () => {
		
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		resetPasswordProps.verifyToken.success = true;
	
		const wrapper = shallow(<ResetPasswordContainer resetPassword={resetPasswordProps} />);
	
		expect(wrapper.dive().childAt(1).type()).toEqual(SecurityQuestionView);
	});

	it('renders the VerifyTokenLoadingView when the verifyToken.loading prop is set', () => {
		
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		resetPasswordProps.verifyToken.loading = true;
	
		const wrapper = shallow(<ResetPasswordContainer resetPassword={resetPasswordProps} />);
	
		expect(wrapper.dive().childAt(1).type()).toEqual(VerifyTokenLoadingView);
	});

	it('renders the VerifyTokenFailureView when the verifyToken.error prop is set', () => {
		
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		resetPasswordProps.verifyToken.error = true;
	
		const wrapper = shallow(<ResetPasswordContainer resetPassword={resetPasswordProps} />);
	
		expect(wrapper.dive().childAt(1).type()).toEqual(VerifyTokenFailureView);
	});

});

describe('The ResetPasswordContainer.handleChangePasswordFormChange method', () =>
{
	it('calls the onChangePasswordFormChange prop', () => {

		const mockHandleChangePasswordFormChange = jest.fn();
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				onChangePasswordFormChange={mockHandleChangePasswordFormChange} 
			/>
		);

		wrapper.instance().handleChangePasswordFormChange( { target: {value: '', name: ''} }, '');
		expect(mockHandleChangePasswordFormChange.mock.calls.length).toBe(1);
	});
	it('calls the onChangePasswordFormChange prop with the correct arguments when the field is valid', () => {

		const mockHandleChangePasswordFormChange = jest.fn();
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				onChangePasswordFormChange={mockHandleChangePasswordFormChange} 
			/>
		);

		wrapper.instance().handleChangePasswordFormChange( { target: {value: 'passwordValue', name: 'newPassword'} }, '');

		expect(mockHandleChangePasswordFormChange.mock.calls.length).toBe(1);
		expect(mockHandleChangePasswordFormChange.mock.calls[0][0]).toEqual('newPassword');
		expect(mockHandleChangePasswordFormChange.mock.calls[0][1]).toEqual('passwordValue');
		expect(mockHandleChangePasswordFormChange.mock.calls[0][2]).toEqual(true);
	});

	it('calls the onChangePasswordFormChange prop with the correct arguments when the field is invalid', () => {

		const mockHandleChangePasswordFormChange = jest.fn();
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				onChangePasswordFormChange={mockHandleChangePasswordFormChange} 
			/>
		);

		wrapper.instance().handleChangePasswordFormChange( { target: {value: '', name: 'newPassword'} }, '');

		expect(mockHandleChangePasswordFormChange.mock.calls.length).toBe(1);
		expect(mockHandleChangePasswordFormChange.mock.calls[0][0]).toEqual('newPassword');
		expect(mockHandleChangePasswordFormChange.mock.calls[0][1]).toEqual('');
		expect(mockHandleChangePasswordFormChange.mock.calls[0][2]).toEqual(false);
	});
});

describe('The ResetPasswordContainer.handleChangePasswordFormSubmit method', () =>
{
	it('calls the onChangePassword prop when the the form is valid', () => {

		const mockHandleChangePassword = jest.fn();
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		resetPasswordProps.changePasswordForm.newPassword.value = 'password';
		resetPasswordProps.changePasswordForm.confirmPassword.value = 'password';
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				resetPassword={resetPasswordProps}
				onChangePassword={mockHandleChangePassword} 
			/>);
	
		wrapper.instance().handleChangePasswordFormSubmit();
	
		expect(mockHandleChangePassword.mock.calls.length).toBe(1);
	});

	it('calls the onChangePassword prop when the the form is valid with the correct argument', () => {

		const mockHandleChangePassword = jest.fn();
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		resetPasswordProps.changePasswordForm.newPassword.value = 'password';
		resetPasswordProps.changePasswordForm.confirmPassword.value = 'password';
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				resetPassword={resetPasswordProps}
				onChangePassword={mockHandleChangePassword} 
			/>);
	
		wrapper.instance().handleChangePasswordFormSubmit();
	
		expect(mockHandleChangePassword.mock.calls.length).toBe(1);
		expect(mockHandleChangePassword.mock.calls[0][0]).toEqual('password');
	});
	it('does not callsthe onChangePassword prop when the the form is invalid', () => {

		const mockHandleChangePassword = jest.fn();
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		resetPasswordProps.changePasswordForm.newPassword.value = '';
		resetPasswordProps.changePasswordForm.confirmPassword.value = '';
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				resetPassword={resetPasswordProps}
				onChangePassword={mockHandleChangePassword} 
			/>);
	
		wrapper.instance().handleChangePasswordFormSubmit();
	
		expect(mockHandleChangePassword.mock.calls.length).toBe(0);
	});
})



describe('The ResetPasswordContainer.handleSecurityQuestionFormChange method', () =>
{
	it('calls the onSecurityQuestionFormChange prop', () => {

		const mockHandleSecurityQuestionFormChange = jest.fn();
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				onSecurityQuestionFormChange={mockHandleSecurityQuestionFormChange} 
			/>
		);

		wrapper.instance().handleSecurityQuestionFormChange( { target: {value: '', name: ''} }, '');
		expect(mockHandleSecurityQuestionFormChange.mock.calls.length).toBe(1);
	});
	it('calls the onSecurityQuestionFormChange prop with the correct arguments when the field is valid', () => {

		const mockHandleSecurityQuestionFormChange = jest.fn();
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				onSecurityQuestionFormChange={mockHandleSecurityQuestionFormChange} 
			/>
		);

		wrapper.instance().handleSecurityQuestionFormChange( { target: {value: 'answerValue', name: 'answer'} }, '');

		expect(mockHandleSecurityQuestionFormChange.mock.calls.length).toBe(1);
		expect(mockHandleSecurityQuestionFormChange.mock.calls[0][0]).toEqual('answer');
		expect(mockHandleSecurityQuestionFormChange.mock.calls[0][1]).toEqual('answerValue');
		expect(mockHandleSecurityQuestionFormChange.mock.calls[0][2]).toEqual(true);
	});

	it('calls the onSecurityQuestionFormChange prop with the correct arguments when the field is invalid', () => {

		const mockHandleSecurityQuestionFormChange = jest.fn();
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				onSecurityQuestionFormChange={mockHandleSecurityQuestionFormChange} 
			/>
		);
		
		wrapper.instance().handleSecurityQuestionFormChange( { target: {value: '', name: 'answer'} }, '');

		expect(mockHandleSecurityQuestionFormChange.mock.calls.length).toBe(1);
		expect(mockHandleSecurityQuestionFormChange.mock.calls[0][0]).toEqual('answer');
		expect(mockHandleSecurityQuestionFormChange.mock.calls[0][1]).toEqual('');
		expect(mockHandleSecurityQuestionFormChange.mock.calls[0][2]).toEqual(false);
	});
});

describe('The ResetPasswordContainer.handleSecurityQuestionFormSubmit method', () =>
{
	it('calls the onVerifySecurityQuestion prop when the the form is valid', () => {

		const mockHandleVerifySecurityQuestion = jest.fn();
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		resetPasswordProps.securityQuestionForm.answer.value = 'answer';
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				resetPassword={resetPasswordProps}
				onVerifySecurityQuestion={mockHandleVerifySecurityQuestion} 
			/>);
	
		wrapper.instance().handleSecurityQuestionFormSubmit();
	
		expect(mockHandleVerifySecurityQuestion.mock.calls.length).toBe(1);
	});

	it('calls the onVerifySecurityQuestion prop when the the form is valid with the correct argument', () => {

		const mockHandleVerifySecurityQuestion = jest.fn();
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		resetPasswordProps.securityQuestionForm.answer.value = 'answer';
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				resetPassword={resetPasswordProps}
				onVerifySecurityQuestion={mockHandleVerifySecurityQuestion} 
			/>);
	
		wrapper.instance().handleSecurityQuestionFormSubmit();
	
		expect(mockHandleVerifySecurityQuestion.mock.calls.length).toBe(1);
		expect(mockHandleVerifySecurityQuestion.mock.calls[0][0]).toEqual('answer');
	});

	it('does not call the onChangePassword prop when the the form is invalid', () => {

		const mockHandleVerifySecurityQuestion = jest.fn();
		const resetPasswordProps = JSON.parse(JSON.stringify(testResetPasswordProps));
		resetPasswordProps.securityQuestionForm.answer.value = '';
		
		const wrapper = shallow(
			<ResetPasswordContainer 
				resetPassword={resetPasswordProps}
				onVerifySecurityQuestion={mockHandleVerifySecurityQuestion} 
			/>);
	
		wrapper.instance().handleSecurityQuestionFormSubmit();
	
		expect(mockHandleVerifySecurityQuestion.mock.calls.length).toBe(0);
	});
});

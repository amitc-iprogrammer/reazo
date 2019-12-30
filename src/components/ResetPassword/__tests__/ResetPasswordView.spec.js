import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import { mountWithIntl, shallowWithIntl } from '../../../util/reactIntlEnzymeHelpers';
import { 
	VerifyTokenLoadingView, 
	VerifyTokenFailureView,
	SecurityQuestionView,
	ChangePasswordView,
	ChangePasswordSuccessView
} from '../ResetPasswordView'

configure({ adapter: new Adapter() });

describe('The VerifyTokenLoadingView component', () => {

	it('renders without crashing', () => {
		shallowWithIntl(<VerifyTokenLoadingView />);
	});
});

describe('The VerifyTokenFailureView component', () => {

	it('renders without crashing', () => {
		shallowWithIntl(<VerifyTokenFailureView />);
	});
});

describe('The ChangePasswordSuccessView component', () => {

	it('renders without crashing', () => {
		shallowWithIntl(<ChangePasswordSuccessView />);
	});
});

describe('The SecurityQuestionView component', () => {

	it('renders without crashing', () => {
		shallowWithIntl(<SecurityQuestionView />);
	});

	it('calls the onFormSubmit prop when its form is submitted', () => {
		
		const mockHandleFormSubmit = jest.fn();
		const wrapper = mountWithIntl(<SecurityQuestionView onFormSubmit={mockHandleFormSubmit} />);

		const form = wrapper.find('form');
		form.simulate('submit');

		expect(mockHandleFormSubmit.mock.calls.length).toBe(1);
	});

	it('calls the onFormSubmit prop when its Submit button is clicked', () => {
		
		const mockHandleFormSubmit = jest.fn();
		const wrapper = mountWithIntl(<SecurityQuestionView onFormSubmit={mockHandleFormSubmit} />);

		const submitButton = wrapper.find('button').at(0);

		submitButton.simulate('submit');

		expect(mockHandleFormSubmit.mock.calls.length).toBe(1);
	});

	it('calls the onFormChange prop when the answer input is changed', () =>
	{
		const mockHandleFormChange = jest.fn();
		const wrapper = mountWithIntl(<SecurityQuestionView onFormChange={mockHandleFormChange} />);

		const usernameInput = wrapper.find('input[name="answer"]');

		usernameInput.simulate('change', {target: {value: 'answer'}});

		expect(mockHandleFormChange.mock.calls.length).toBe(1);	
	});
});

describe('The ChangePasswordView component', () => {

	it('renders without crashing', () => {
		shallowWithIntl(<ChangePasswordView />);
	});

	it('calls the onFormSubmit prop when its form is submitted', () => {
		
		const mockHandleFormSubmit = jest.fn();
		const wrapper = mountWithIntl(<ChangePasswordView onFormSubmit={mockHandleFormSubmit} />);

		const form = wrapper.find('form');
		form.simulate('submit');

		expect(mockHandleFormSubmit.mock.calls.length).toBe(1);
	});

	it('calls the onFormSubmit prop when its Change Password button is clicked', () => {
		
		const mockHandleFormSubmit = jest.fn();
		const wrapper = mountWithIntl(<ChangePasswordView onFormSubmit={mockHandleFormSubmit} />);

		const submitButton = wrapper.find('button').at(0);

		submitButton.simulate('submit');

		expect(mockHandleFormSubmit.mock.calls.length).toBe(1);
	});

	it('calls the onFormChange prop when the newPassword input is changed', () =>
	{
		const mockHandleFormChange = jest.fn();
		const wrapper = mountWithIntl(<ChangePasswordView onFormChange={mockHandleFormChange} />);

		const usernameInput = wrapper.find('input[name="newPassword"]');

		usernameInput.simulate('change', {target: {value: 'newPassword'}});

		expect(mockHandleFormChange.mock.calls.length).toBe(1);	
	});

	it('calls the onFormChange prop when the confirm Password input is changed', () =>
	{
		const mockHandleFormChange = jest.fn();
		const wrapper = mountWithIntl(<ChangePasswordView onFormChange={mockHandleFormChange} />);

		const usernameInput = wrapper.find('input[name="confirmPassword"]');

		usernameInput.simulate('change', {target: {value: 'confirmPassword'}});

		expect(mockHandleFormChange.mock.calls.length).toBe(1);
	});
});
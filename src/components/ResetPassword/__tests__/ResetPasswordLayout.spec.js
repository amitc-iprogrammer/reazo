import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import ResetPasswordLayout from '../ResetPasswordLayout'

configure({ adapter: new Adapter() });

it('Renders without crashing', () => {
	shallow(<ResetPasswordLayout />);
});
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import LayoutView, { TopMenu, TopMenuUser } from '../LayoutView'

configure({ adapter: new Adapter() });

it('LayoutView renders without crashing', () => {
	shallow(<LayoutView />);
});

it('TopMenu renders without crashing', () => {
	shallow(<TopMenu />);
});

it('TopMenu renders without crashing', () => {
	shallow(<TopMenuUser />);
});
import Enzyme, { shallow } from "enzyme";
import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Cookies from 'js-cookie';
import Drive from "../Drive";

Enzyme.configure({ adapter: new Adapter() })

describe("navbar", () => {

    let wrapper;

    beforeEach(() => {
        Cookies.get = jest.fn().mockImplementation(() => 'token');
        wrapper = shallow(<Drive />);
    });

    it("TODO1", () => {
        
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
})

import Enzyme, { shallow } from "enzyme";
import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Cookies from 'js-cookie';
import MapSelector from "../MapSelector";

Enzyme.configure({ adapter: new Adapter() })

describe("map-selector", () => {

    let wrapper;

    beforeEach(() => {
        Cookies.get = jest.fn().mockImplementation(() => 'token');
        wrapper = shallow(<MapSelector />);
    });

    it("Should render source button", () => {
        const sourceButton= wrapper.find(`[data-test='close-button']`);
        expect(sourceButton.length).toBe(1);
     });

    afterEach(() => {
        jest.clearAllMocks();
    });
})

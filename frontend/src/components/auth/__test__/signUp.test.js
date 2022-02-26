import Enzyme, { mount, shallow } from "enzyme";
import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Signup from "../Signup";

Enzyme.configure({ adapter: new Adapter() });

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ token: 'token' }),
    })
);

describe("signUp", () => {
    const setToken = jest.fn();
    const handleSubmit = jest.fn();
    let wrapper;
    // const setState = jest.fn();
    // const useStateSpy = jest.spyOn(React, "useState");
    // useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
        // fetch.mockClear();
        wrapper = shallow(<Signup setToken={setToken} />);
    });

    it("Should render Signup button", () => {
        const signUpButton = wrapper.find(`[data-test='signUp-button']`);
        expect(signUpButton.length).toBe(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
})
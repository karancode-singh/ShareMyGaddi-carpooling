import Enzyme, { shallow } from "enzyme";
import React from "react";
import SignUp from "../SignUp";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ token: 'token' }),
    })
);

describe("signup", () => {
    const setToken = jest.fn();
    const handleSubmit = jest.fn();
    let wrapper;
    // const setState = jest.fn();
    // const useStateSpy = jest.spyOn(React, "useState");
    // useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
        // fetch.mockClear();
        wrapper = shallow(<SignUp setToken={setToken} />);
    });

    it("Should render Signup button", () => {
        const signUpButton = wrapper.find(`[data-test='signup-button']`);
        expect(signUpButton.length).toBe(1);
    });

    it("Should sign-up", () => {
        wrapper.find(`[data-test='first-name-form-control']`).simulate("change", { target: { value: "foofoo" } });
        wrapper.find(`[data-test='last-name-form-control']`).simulate("change", { target: { value: "barbar" } });
        wrapper.find(`[data-test='email-form-control']`).simulate("change", { target: { value: "foo@bar.com" } });
        wrapper.find(`[data-test='password-form-control']`).simulate("change", { target: { value: "foobar" } });
        wrapper.find(`[data-test='conf-password-form-control']`).simulate("change", { target: { value: "foobar" } });
        wrapper.find(`[data-test='signup-button']`).simulate('click');
        //TODO: cover the handle signup function by stubbing it
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
})

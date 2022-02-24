import Enzyme, { mount, shallow } from "enzyme";
import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Login from "../Login";

Enzyme.configure({ adapter: new Adapter() });

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ token: 'token' }),
  })
);

//or try//
// window.fetch = jest.fn().mockImplementation(() => {
//     return new Promise((resolve, reject) => {
//         resolve({
//             status: 200,
//             ok: true,
//             json: () => new Promise((resolve, reject) => {
//                 resolve({
//                     'players': [
//                         { 'firstname': 'Robbie', 'lastname': 'Keane' },
//                         { 'firstname': 'Alan', 'lastname': 'Shearer' }
//                     ]
//                 });
//             })
//         });
//     });
// });

describe("login", () => {
    const setToken = jest.fn();
    let wrapper;
    // const setState = jest.fn();
    // const useStateSpy = jest.spyOn(React, "useState");
    // useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
        // fetch.mockClear();
        wrapper = shallow(<Login setToken={setToken} />);
    });

    it("TODO1", () => {
        console.log(wrapper.find('.form-group').debug());
        // wrapper.find('.form-group')[0].simulate("change", { target: { value: "foo" }})
        // wrapper.find('.form-group')[1].simulate("change", { target: { value: "bar" }})
        // wrapper.find('.login-button')[0].simulate('click');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
})

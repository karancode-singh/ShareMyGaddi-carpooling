import { shallow } from "enzyme";
import React from "react";
import Login from "../Login";

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ token: 'tokken' }),
//   })
// );

//or try
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
    wrapper = shallow(<Login setToken={setToken} />);
  });

  it("Should render login button", () => {
    const loginButton = wrapper.find(`[data-test='login-button']`);
    expect(loginButton.length).toBe(1);
  });

  it("Should log-in", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: 'tokken' }),
      })
    );
    wrapper.find(`[data-test='email-form-control']`).simulate("change", { target: { value: "foo@bar.com" } });
    wrapper.find(`[data-test='password-form-control']`).simulate("change", { target: { value: "foobar" } });
    wrapper.find(`[data-test='login-button']`).simulate('click');
  });

  afterEach(() => {
    // fetch.mockClear();
    jest.clearAllMocks();
  });
})

import React from "react";
import  ReactDOM  from "react-dom";
import {render,fireEvent} from "@testing-library/react"
import Login, {validateForm} from "../Login";
// it ("renders without crashing", ()=> {
//     const div = document.createElement("div");
//     ReactDOM.render(<loginuser></loginuser>,div)

// })
describe ("login",()=>{
    // test('Validate function should pass correct input', () => {
    //     const text= true;
    //     expect(text).toBe(true)

    //  })

    //  test('should be false', () => {
    //     const text= false;
    //     expect(text).toBe(false)

    //  })

     it("accepts set token props in login", () => {
        const setToken  = ()=>{
            return "token"
        }
        const wrapper = render(<Login setToken ={setToken } />);
        expect(wrapper.props().setToken).toEqual(setToken );
      });
})

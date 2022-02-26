import Enzyme, { shallow } from "enzyme";
import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Cookies from 'js-cookie';
import Navbar from "../Navbar";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/example/path"
    })
}));

describe("navbar", () => {

    let wrapper;

    beforeEach(() => {
        Cookies.get = jest.fn().mockImplementation(() => 'token');
        wrapper = shallow(<Navbar />);
    });
   
    it("render name image", () => {
        const im= wrapper.find(`[data-test='name-image']`);
        expect(im.length).toBe(1);
     });

     it("render ShareMyGaddi logo", () => {
        const im= wrapper.find(`[data-test='shareMyGaddi-logo']`);
        expect(im.length).toBe(1);
     });

     it("Should render active trip button", () => {
        const activeTripButton= wrapper.find(`[data-test='activeTrip-button']`);
        expect(activeTripButton.length).toBe(1);
     });

     it("Should render drive button", () => {
        const driveButton= wrapper.find(`[data-test='drive-button']`);
        expect(driveButton.length).toBe(1);
     });

     it("Should render ride button", () => {
        const rideButton= wrapper.find(`[data-test='ride-button']`);
        expect(rideButton.length).toBe(1);
     });

     it("Should render active trip icon", () => {
        const activeTripIcon= wrapper.find(`[data-test='activeTrip-icon']`);
        expect(activeTripIcon.length).toBe(1);
     });

     it("Should render drive icon", () => {
        const driveIcon= wrapper.find(`[data-test='drive-icon']`);
        expect(driveIcon.length).toBe(1);
     });

     it("Should render ride icon", () => {
        const rideIcon= wrapper.find(`[data-test='ride-icon']`);
        expect(rideIcon.length).toBe(1);
     });

    afterEach(() => {
        jest.clearAllMocks();
    });
})

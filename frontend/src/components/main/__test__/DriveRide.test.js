import Enzyme, { shallow } from "enzyme";
import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Cookies from 'js-cookie';
import DriveRide from "../DriveRide";

Enzyme.configure({ adapter: new Adapter() })

describe("drive", () => {

    let wrapper;

    beforeEach(() => {
        Cookies.get = jest.fn().mockImplementation(() => 'tokken');
        wrapper = shallow(<DriveRide type={'drive'} />);
    });

    it("Should render source button", () => {
        const sourceButton= wrapper.find(`[data-test='source-button']`);
        expect(sourceButton.length).toBe(1);
     });

     it("Should render destination button", () => {
        const destinationButton= wrapper.find(`[data-test='destination-button']`);
        expect(destinationButton.length).toBe(1);
     });

     it("Should render drive button", () => {
        const driveButton= wrapper.find(`[data-test='drive-button']`);
        expect(driveButton.length).toBe(1);
     });

    afterEach(() => {
        jest.clearAllMocks();
    });
})

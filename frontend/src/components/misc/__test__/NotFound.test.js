import { shallow } from "enzyme";
import React from "react";
import NotFound from "../NotFound";

describe("not-found", () => {

   it("Should render", () => {
      shallow(<NotFound />);
   });
})

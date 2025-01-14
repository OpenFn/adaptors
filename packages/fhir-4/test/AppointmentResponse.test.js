import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("AppointmentResponse", () => {
    it("should create a simple AppointmentResponse", () => {
        const resource = builders.appointmentResponse("AppointmentResponse", {});
        assert.isOk(resource);
    });
});
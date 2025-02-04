import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("AppointmentResponse", () => {
    it("should create a simple AppointmentResponse", () => {
        const resource = builders.appointmentResponse({});
        assert.isOk(resource);
    });
});
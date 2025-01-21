import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("AppointmentResponse", () => {
    it("should create a simple AppointmentResponse", () => {
        const resource = builders.appointmentResponse({});
        assert.isOk(resource);
    });
});
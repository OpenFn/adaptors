import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Appointment", () => {
    it("should create a simple Appointment", () => {
        const resource = builders.appointment({});
        assert.isOk(resource);
    });
});
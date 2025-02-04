import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Appointment", () => {
    it("should create a simple Appointment", () => {
        const resource = builders.appointment({});
        assert.isOk(resource);
    });
});
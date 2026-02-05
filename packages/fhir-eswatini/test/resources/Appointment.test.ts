import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzAppointment", () => {
    it("should create a simple SzAppointment", () => {
        const resource = builders.appointment("SzAppointment", {});
        assert.isOk(resource);
    });
});
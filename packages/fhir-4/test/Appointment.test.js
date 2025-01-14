import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Appointment", () => {
    it("should create a simple Appointment", () => {
        const resource = builders.appointment("Appointment", {});
        assert.isOk(resource);
    });
});
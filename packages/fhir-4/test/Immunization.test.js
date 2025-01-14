import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Immunization", () => {
    it("should create a simple Immunization", () => {
        const resource = builders.immunization("Immunization", {});
        assert.isOk(resource);
    });
});
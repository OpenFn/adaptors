import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Practitioner", () => {
    it("should create a simple Practitioner", () => {
        const resource = builders.practitioner("Practitioner", {});
        assert.isOk(resource);
    });
});
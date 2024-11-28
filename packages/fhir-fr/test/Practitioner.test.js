import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-practitioner", () => {
    it("should create a simple fr-core-practitioner", () => {
        const resource = builders.practitioner("fr-core-practitioner", {});
        assert.isOk(resource);
    });
});
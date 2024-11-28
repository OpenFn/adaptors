import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-address", () => {
    it("should create a simple fr-core-address", () => {
        const resource = builders.address("fr-core-address", {});
        assert.isOk(resource);
    });
});
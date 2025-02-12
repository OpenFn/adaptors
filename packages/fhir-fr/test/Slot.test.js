import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-slot", () => {
    it("should create a simple fr-core-slot", () => {
        const resource = builders.slot("fr-core-slot", {});
        assert.isOk(resource);
    });
});
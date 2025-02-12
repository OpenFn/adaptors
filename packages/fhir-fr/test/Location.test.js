import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-location", () => {
    it("should create a simple fr-core-location", () => {
        const resource = builders.location("fr-core-location", {});
        assert.isOk(resource);
    });
});
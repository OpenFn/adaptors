import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Provenance", () => {
    it("should create a simple Provenance", () => {
        const resource = builders.provenance("Provenance", {});
        assert.isOk(resource);
    });
});
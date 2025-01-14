import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("SubstanceDefinition", () => {
    it("should create a simple SubstanceDefinition", () => {
        const resource = builders.substanceDefinition("SubstanceDefinition", {});
        assert.isOk(resource);
    });
});
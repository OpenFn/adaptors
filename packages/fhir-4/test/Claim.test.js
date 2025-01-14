import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Claim", () => {
    it("should create a simple Claim", () => {
        const resource = builders.claim("Claim", {});
        assert.isOk(resource);
    });
});
import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ClaimResponse", () => {
    it("should create a simple ClaimResponse", () => {
        const resource = builders.claimResponse("ClaimResponse", {});
        assert.isOk(resource);
    });
});
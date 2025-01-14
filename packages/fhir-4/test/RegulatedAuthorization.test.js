import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("RegulatedAuthorization", () => {
    it("should create a simple RegulatedAuthorization", () => {
        const resource = builders.regulatedAuthorization("RegulatedAuthorization", {});
        assert.isOk(resource);
    });
});
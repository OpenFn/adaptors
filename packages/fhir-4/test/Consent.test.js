import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Consent", () => {
    it("should create a simple Consent", () => {
        const resource = builders.consent("Consent", {});
        assert.isOk(resource);
    });
});
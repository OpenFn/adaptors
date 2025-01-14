import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("TestScript", () => {
    it("should create a simple TestScript", () => {
        const resource = builders.testScript("TestScript", {});
        assert.isOk(resource);
    });
});
import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Endpoint", () => {
    it("should create a simple Endpoint", () => {
        const resource = builders.endpoint("Endpoint", {});
        assert.isOk(resource);
    });
});
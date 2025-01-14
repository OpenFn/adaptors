import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Basic", () => {
    it("should create a simple Basic", () => {
        const resource = builders.basic("Basic", {});
        assert.isOk(resource);
    });
});
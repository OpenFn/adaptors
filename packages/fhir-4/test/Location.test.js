import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Location", () => {
    it("should create a simple Location", () => {
        const resource = builders.location("Location", {});
        assert.isOk(resource);
    });
});
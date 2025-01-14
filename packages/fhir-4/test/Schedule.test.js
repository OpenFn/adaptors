import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Schedule", () => {
    it("should create a simple Schedule", () => {
        const resource = builders.schedule("Schedule", {});
        assert.isOk(resource);
    });
});
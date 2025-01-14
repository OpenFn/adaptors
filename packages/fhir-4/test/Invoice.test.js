import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Invoice", () => {
    it("should create a simple Invoice", () => {
        const resource = builders.invoice("Invoice", {});
        assert.isOk(resource);
    });
});
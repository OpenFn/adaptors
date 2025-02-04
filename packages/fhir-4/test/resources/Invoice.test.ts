import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Invoice", () => {
    it("should create a simple Invoice", () => {
        const resource = builders.invoice({});
        assert.isOk(resource);
    });
});
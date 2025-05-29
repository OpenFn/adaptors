import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Communication", () => {
    it("should create a simple Communication", () => {
        const resource = builders.communication({});
        assert.isOk(resource);
    });
});
import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Account", () => {
    it("should create a simple Account", () => {
        const resource = builders.account({});
        assert.isOk(resource);
    });
});
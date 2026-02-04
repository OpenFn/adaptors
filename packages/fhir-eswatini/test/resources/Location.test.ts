import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzLocation", () => {
    it("should create a simple SzLocation", () => {
        const resource = builders.location("SzLocation", {});
        assert.isOk(resource);
    });
});
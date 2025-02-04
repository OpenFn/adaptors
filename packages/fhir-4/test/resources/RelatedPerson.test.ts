import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("RelatedPerson", () => {
    it("should create a simple RelatedPerson", () => {
        const resource = builders.relatedPerson({});
        assert.isOk(resource);
    });
});
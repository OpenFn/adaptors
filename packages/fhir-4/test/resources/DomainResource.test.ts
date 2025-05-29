import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("DomainResource", () => {
    it("should create a simple DomainResource", () => {
        const resource = builders.domainResource({});
        assert.isOk(resource);
    });
});
import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ServiceRequest", () => {
    it("should create a simple ServiceRequest", () => {
        const resource = builders.serviceRequest({});
        assert.isOk(resource);
    });
});
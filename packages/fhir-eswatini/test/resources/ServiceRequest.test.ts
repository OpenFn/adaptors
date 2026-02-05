import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzLabRequest", () => {
    it("should create a simple SzLabRequest", () => {
        const resource = builders.serviceRequest("SzLabRequest", {});
        assert.isOk(resource);
    });
});

describe("SzReferral", () => {
    it("should create a simple SzReferral", () => {
        const resource = builders.serviceRequest("SzReferral", {});
        assert.isOk(resource);
    });
});
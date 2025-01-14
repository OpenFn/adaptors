import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ServiceRequest", () => {
    it("should create a simple ServiceRequest", () => {
        const resource = builders.serviceRequest("ServiceRequest", {});
        assert.isOk(resource);
    });
});
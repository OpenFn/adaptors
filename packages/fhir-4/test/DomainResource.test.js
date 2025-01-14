import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("DomainResource", () => {
    it("should create a simple DomainResource", () => {
        const resource = builders.domainResource("DomainResource", {});
        assert.isOk(resource);
    });
});
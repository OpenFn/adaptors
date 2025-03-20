import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("PractitionerRole", () => {
    it("should create a simple PractitionerRole", () => {
        const resource = builders.practitionerRole({});
        assert.isOk(resource);
    });
});
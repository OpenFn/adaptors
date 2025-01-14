import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("PractitionerRole", () => {
    it("should create a simple PractitionerRole", () => {
        const resource = builders.practitionerRole("PractitionerRole", {});
        assert.isOk(resource);
    });
});
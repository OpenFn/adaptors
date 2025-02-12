import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-practitioner-role-exercice", () => {
    it("should create a simple fr-core-practitioner-role-exercice", () => {
        const resource = builders.practitionerRole("fr-core-practitioner-role-exercice", {});
        assert.isOk(resource);
    });
});

describe("fr-core-practitioner-role-profession", () => {
    it("should create a simple fr-core-practitioner-role-profession", () => {
        const resource = builders.practitionerRole("fr-core-practitioner-role-profession", {});
        assert.isOk(resource);
    });
});
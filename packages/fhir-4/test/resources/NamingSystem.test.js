import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("NamingSystem", () => {
    it("should create a simple NamingSystem", () => {
        const resource = builders.namingSystem({});
        assert.isOk(resource);
    });
});
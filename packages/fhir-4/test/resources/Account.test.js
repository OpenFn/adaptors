import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Account", () => {
    it("should create a simple Account", () => {
        const resource = builders.account({});
        assert.isOk(resource);
    });
});
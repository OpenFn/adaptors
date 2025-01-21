import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("MessageHeader", () => {
    it("should create a simple MessageHeader", () => {
        const resource = builders.messageHeader({});
        assert.isOk(resource);
    });
});
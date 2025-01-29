import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("CommunicationRequest", () => {
    it("should create a simple CommunicationRequest", () => {
        const resource = builders.communicationRequest({});
        assert.isOk(resource);
    });
});
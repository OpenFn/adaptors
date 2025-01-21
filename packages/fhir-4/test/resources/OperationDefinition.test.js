import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("OperationDefinition", () => {
    it("should create a simple OperationDefinition", () => {
        const resource = builders.operationDefinition({});
        assert.isOk(resource);
    });
});
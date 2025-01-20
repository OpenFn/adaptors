import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("OperationOutcome", () => {
    it("should create a simple OperationOutcome", () => {
        const resource = builders.operationOutcome({});
        assert.isOk(resource);
    });
});
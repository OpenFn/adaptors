import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("OperationOutcome", () => {
    it("should create a simple OperationOutcome", () => {
        const resource = builders.operationOutcome("OperationOutcome", {});
        assert.isOk(resource);
    });
});
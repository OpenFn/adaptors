import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("OperationDefinition", () => {
    it("should create a simple OperationDefinition", () => {
        const resource = builders.operationDefinition("OperationDefinition", {});
        assert.isOk(resource);
    });
});
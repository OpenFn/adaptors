import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("DeviceUseStatement", () => {
    it("should create a simple DeviceUseStatement", () => {
        const resource = builders.deviceUseStatement({});
        assert.isOk(resource);
    });
});
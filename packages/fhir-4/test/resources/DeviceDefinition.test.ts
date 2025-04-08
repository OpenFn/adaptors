import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("DeviceDefinition", () => {
    it("should create a simple DeviceDefinition", () => {
        const resource = builders.deviceDefinition({});
        assert.isOk(resource);
    });
});
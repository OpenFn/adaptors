import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("DeviceRequest", () => {
    it("should create a simple DeviceRequest", () => {
        const resource = builders.deviceRequest({});
        assert.isOk(resource);
    });
});
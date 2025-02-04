import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("DeviceMetric", () => {
    it("should create a simple DeviceMetric", () => {
        const resource = builders.deviceMetric({});
        assert.isOk(resource);
    });
});
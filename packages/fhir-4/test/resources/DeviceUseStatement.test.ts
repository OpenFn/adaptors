import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("DeviceUseStatement", () => {
    it("should create a simple DeviceUseStatement", () => {
        const resource = builders.deviceUseStatement({});
        assert.isOk(resource);
    });
});
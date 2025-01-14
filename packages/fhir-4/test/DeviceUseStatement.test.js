import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("DeviceUseStatement", () => {
    it("should create a simple DeviceUseStatement", () => {
        const resource = builders.deviceUseStatement("DeviceUseStatement", {});
        assert.isOk(resource);
    });
});
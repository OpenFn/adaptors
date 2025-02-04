import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("CommunicationRequest", () => {
    it("should create a simple CommunicationRequest", () => {
        const resource = builders.communicationRequest({});
        assert.isOk(resource);
    });
});
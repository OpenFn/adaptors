import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ObservationDefinition", () => {
    it("should create a simple ObservationDefinition", () => {
        const resource = builders.observationDefinition({});
        assert.isOk(resource);
    });
});
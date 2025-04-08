import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("EpisodeOfCare", () => {
    it("should create a simple EpisodeOfCare", () => {
        const resource = builders.episodeOfCare({});
        assert.isOk(resource);
    });
});
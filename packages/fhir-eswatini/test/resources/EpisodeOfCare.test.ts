import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzEpisodeOfCare", () => {
    it("should create a simple SzEpisodeOfCare", () => {
        const resource = builders.episodeOfCare("SzEpisodeOfCare", {});
        assert.isOk(resource);
    });
});
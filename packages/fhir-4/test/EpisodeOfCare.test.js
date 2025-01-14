import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("EpisodeOfCare", () => {
    it("should create a simple EpisodeOfCare", () => {
        const resource = builders.episodeOfCare("EpisodeOfCare", {});
        assert.isOk(resource);
    });
});
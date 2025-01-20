import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("EpisodeOfCare", () => {
    it("should create a simple EpisodeOfCare", () => {
        const resource = builders.episodeOfCare({});
        assert.isOk(resource);
    });
});
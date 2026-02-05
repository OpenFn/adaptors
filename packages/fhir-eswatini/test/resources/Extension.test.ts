import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzAuthorizerExtension", () => {
    it("should create a simple SzAuthorizerExtension", () => {
        const resource = builders.extension("SzAuthorizerExtension", {});
        assert.isOk(resource);
    });
});

describe("SzChiefdomExtension", () => {
    it("should create a simple SzChiefdomExtension", () => {
        const resource = builders.extension("SzChiefdomExtension", {});
        assert.isOk(resource);
    });
});

describe("SzInkhundlaExtension", () => {
    it("should create a simple SzInkhundlaExtension", () => {
        const resource = builders.extension("SzInkhundlaExtension", {});
        assert.isOk(resource);
    });
});

describe("SzLocationCodeExtension", () => {
    it("should create a simple SzLocationCodeExtension", () => {
        const resource = builders.extension("SzLocationCodeExtension", {});
        assert.isOk(resource);
    });
});

describe("SzReferralRecipientExtension", () => {
    it("should create a simple SzReferralRecipientExtension", () => {
        const resource = builders.extension("SzReferralRecipientExtension", {});
        assert.isOk(resource);
    });
});

describe("SzRegistrationDate", () => {
    it("should create a simple SzRegistrationDate", () => {
        const resource = builders.extension("SzRegistrationDate", {});
        assert.isOk(resource);
    });
});

describe("SzTestingLabExtension", () => {
    it("should create a simple SzTestingLabExtension", () => {
        const resource = builders.extension("SzTestingLabExtension", {});
        assert.isOk(resource);
    });
});
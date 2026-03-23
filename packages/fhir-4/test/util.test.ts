import { expect } from 'chai';
import { sortBundle, logValidationErrors } from '../src/util';

const mockLogger = { log: () => {}, error: () => {} };

// Helper to build a minimal bundle entry
const entry = (
  resourceType: string,
  id: string,
  props: Record<string, unknown> = {},
) => ({
  resource: Object.assign(
    {
      resourceType,
      id,
    },
    props,
  ),
  request: { method: 'PUT', url: `${resourceType}/${id}` },
});

describe('sortBundle', () => {
  it('should place resources with no dependencies before those that depend on them', () => {
    const encounter = entry('Encounter', 'e1', {
      subject: { reference: 'Patient/p1' },
    });
    const patient = entry('Patient', 'p1');

    // Encounter is listed first in the input
    const result = sortBundle([encounter, patient]);

    const sortedIds = result.map(e => e.resource.id);
    expect(sortedIds).eql(['p1', 'e1']);
  });

  it('should not reorder resources that are already sorted', () => {
    const patient = entry('Patient', 'p1');
    const encounter = entry('Encounter', 'e1', {
      subject: { reference: 'Patient/p1' },
    });

    const result = sortBundle([patient, encounter]);

    const sortedIds = result.map(e => e.resource.id);
    expect(sortedIds).eql(['p1', 'e1']);
  });

  it('should resolve a three-level dependency chain', () => {
    const observation = entry('Observation', 'o1', {
      encounter: { reference: 'Encounter/e1' },
    });
    const encounter = entry('Encounter', 'e1', {
      subject: { reference: 'Patient/p1' },
    });
    const patient = entry('Patient', 'p1');

    // Worst-case input order: deepest dependent first
    const result = sortBundle([observation, encounter, patient]);

    const sortedIds = result.map(e => e.resource.id);
    expect(sortedIds).eql(['p1', 'e1', 'o1']);
  });

  it('should place a shared dependency before all resources that reference it', () => {
    const encounter1 = entry('Encounter', 'e1', {
      subject: { reference: 'Patient/p1' },
    });
    const encounter2 = entry('Encounter', 'e2', {
      subject: { reference: 'Patient/p1' },
    });
    const patient = entry('Patient', 'p1');

    const result = sortBundle([encounter1, encounter2, patient]);

    const sortedIds = result.map(e => e.resource.id);
    expect(sortedIds.indexOf('p1')).to.be.lessThan(sortedIds.indexOf('e1'));
    expect(sortedIds.indexOf('p1')).to.be.lessThan(sortedIds.indexOf('e2'));
  });

  it('should handle a reference to a resource not in the bundle', () => {
    const encounter = entry('Encounter', 'e1', {
      subject: { reference: 'Patient/p1' },
      serviceProvider: { reference: 'Organization/o1' }, // not in bundle
    });
    const patient = entry('Patient', 'p1');

    const result = sortBundle([encounter, patient]);

    const sortedIds = result.map(e => e.resource.id);
    // Both resources should still be present and patient should come first
    expect(sortedIds).to.include('p1');
    expect(sortedIds).to.include('e1');
    expect(sortedIds.indexOf('p1')).to.be.lessThan(sortedIds.indexOf('e1'));
  });

  it('should find references in arrays and deeply nested objects', () => {
    const encounter = entry('Encounter', 'e1', {
      // Reference inside an array
      participant: [{ reference: 'Practitioner/pr1' }],
      // Reference several levels deep in an object
      hospitalization: {
        destination: {
          reference: 'Location/l1',
        },
      },
    });
    const practitioner = entry('Practitioner', 'pr1');
    const location = entry('Location', 'l1');

    const result = sortBundle([encounter, practitioner, location]);

    const sortedIds = result.map(e => e.resource.id);
    expect(sortedIds.indexOf('pr1')).to.be.lessThan(sortedIds.indexOf('e1'));
    expect(sortedIds.indexOf('l1')).to.be.lessThan(sortedIds.indexOf('e1'));
  });

  it('should preserve the input order for resources with no references', () => {
    const p1 = entry('Patient', 'p1');
    const p2 = entry('Patient', 'p2');
    const p3 = entry('Patient', 'p3');

    const result = sortBundle([p1, p2, p3]);

    const sortedIds = result.map(e => e.resource.id);
    expect(sortedIds).eql(['p1', 'p2', 'p3']);
  });
});

describe('logValidationErrors', () => {
  it('should extract errors for a single resource', () => {
    // This is what you might get when uploading a single resource
    const response = {
      statusCode: 422,
      statusMessage: 'Unprocessable Entity',
      url: 'http://172.209.216.154:3447/fhir/EpisodeOfCare',
      duration: 539,
      method: 'POST',
      body: '{\n  "resourceType": "OperationOutcome",\n  "issue": [ {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 174\n    } ],\n    "severity": "warning",\n    "code": "processing",\n    "diagnostics": "Rule dom-6: \'A resource should have narrative for robust management\' Failed",\n    "location": [ "EpisodeOfCare", "Line[1] Col[174]" ]\n  }, {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 174\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-message-id",\n      "valueString": "Validation_VAL_Profile_Minimum"\n    } ],\n    "severity": "error",\n    "code": "processing",\n    "details": {\n      "coding": [ {\n        "system": "http://hl7.org/fhir/java-core-messageId",\n        "code": "Validation_VAL_Profile_Minimum"\n      } ]\n    },\n    "diagnostics": "EpisodeOfCare.status: minimum required = 1, but only found 0 (from https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzEpisodeOfCare|0.1.0)",\n    "location": [ "EpisodeOfCare", "Line[1] Col[174]" ]\n  }, {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 174\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-message-id",\n      "valueString": "Validation_VAL_Profile_Minimum"\n    } ],\n    "severity": "error",\n    "code": "processing",\n    "details": {\n      "coding": [ {\n        "system": "http://hl7.org/fhir/java-core-messageId",\n        "code": "Validation_VAL_Profile_Minimum"\n      } ]\n    },\n    "diagnostics": "EpisodeOfCare.type: minimum required = 1, but only found 0 (from https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzEpisodeOfCare|0.1.0)",\n    "location": [ "EpisodeOfCare", "Line[1] Col[174]" ]\n  }, {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 174\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-message-id",\n      "valueString": "Validation_VAL_Profile_Minimum"\n    } ],\n    "severity": "error",\n    "code": "processing",\n    "details": {\n      "coding": [ {\n        "system": "http://hl7.org/fhir/java-core-messageId",\n        "code": "Validation_VAL_Profile_Minimum"\n      } ]\n    },\n    "diagnostics": "EpisodeOfCare.patient: minimum required = 1, but only found 0 (from https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzEpisodeOfCare|0.1.0)",\n    "location": [ "EpisodeOfCare", "Line[1] Col[174]" ]\n  }, {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 174\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-message-id",\n      "valueString": "Validation_VAL_Profile_Minimum"\n    } ],\n    "severity": "error",\n    "code": "processing",\n    "details": {\n      "coding": [ {\n        "system": "http://hl7.org/fhir/java-core-messageId",\n        "code": "Validation_VAL_Profile_Minimum"\n      } ]\n    },\n    "diagnostics": "EpisodeOfCare.period: minimum required = 1, but only found 0 (from https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzEpisodeOfCare|0.1.0)",\n    "location": [ "EpisodeOfCare", "Line[1] Col[174]" ]\n  } ]\n}',
      headers: {},
    };
    const result = logValidationErrors(response, mockLogger);

    expect(result.validationIssues).to.eql({
      EpisodeOfCare: {
        warning: [
          "Rule dom-6: 'A resource should have narrative for robust management' Failed",
        ],
        error: [
          'EpisodeOfCare.status: minimum required = 1, but only found 0 (from https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzEpisodeOfCare|0.1.0)',
          'EpisodeOfCare.type: minimum required = 1, but only found 0 (from https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzEpisodeOfCare|0.1.0)',
          'EpisodeOfCare.patient: minimum required = 1, but only found 0 (from https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzEpisodeOfCare|0.1.0)',
          'EpisodeOfCare.period: minimum required = 1, but only found 0 (from https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzEpisodeOfCare|0.1.0)',
        ],
      },
    });
  });

  it('should extract errors for a bundle', () => {
    // This is what you might get when uploading a bundle
    const response = {
      statusCode: 422,
      statusMessage: 'Unprocessable Entity',
      url: 'http://172.209.216.154:3447/fhir/',
      duration: 543,
      method: 'POST',
      body: '{\n  "resourceType": "OperationOutcome",\n  "issue": [ {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 327\n    } ],\n    "severity": "warning",\n    "code": "processing",\n    "diagnostics": "Rule dom-6: \'A resource should have narrative for robust management\' Failed",\n    "location": [ "Bundle.entry[0].resource/*EpisodeOfCare/92719063-043c-494c-9de0-18e68f0ad336*/", "Line[1] Col[327]" ]\n  }, {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 327\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-message-id",\n      "valueString": "Validation_VAL_Profile_Minimum"\n    } ],\n    "severity": "error",\n    "code": "processing",\n    "details": {\n      "coding": [ {\n        "system": "http://hl7.org/fhir/java-core-messageId",\n        "code": "Validation_VAL_Profile_Minimum"\n      } ]\n    },\n    "diagnostics": "EpisodeOfCare.status: minimum required = 1, but only found 0 (from http://hl7.org/fhir/StructureDefinition/EpisodeOfCare|4.0.1)",\n    "location": [ "Bundle.entry[0].resource/*EpisodeOfCare/92719063-043c-494c-9de0-18e68f0ad336*/", "Line[1] Col[327]" ]\n  }, {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 327\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-message-id",\n      "valueString": "Validation_VAL_Profile_Minimum"\n    } ],\n    "severity": "error",\n    "code": "processing",\n    "details": {\n      "coding": [ {\n        "system": "http://hl7.org/fhir/java-core-messageId",\n        "code": "Validation_VAL_Profile_Minimum"\n      } ]\n    },\n    "diagnostics": "EpisodeOfCare.patient: minimum required = 1, but only found 0 (from http://hl7.org/fhir/StructureDefinition/EpisodeOfCare|4.0.1)",\n    "location": [ "Bundle.entry[0].resource/*EpisodeOfCare/92719063-043c-494c-9de0-18e68f0ad336*/", "Line[1] Col[327]" ]\n  }, {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 327\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-message-id",\n      "valueString": "VALIDATION_VAL_PROFILE_UNKNOWN_NOT_POLICY"\n    } ],\n    "severity": "error",\n    "code": "processing",\n    "details": {\n      "coding": [ {\n        "system": "http://hl7.org/fhir/java-core-messageId",\n        "code": "VALIDATION_VAL_PROFILE_UNKNOWN_NOT_POLICY"\n      } ]\n    },\n    "diagnostics": "Profile reference \'http://172.209.216.154:3447/fhir/StructureDefinition/SzEpisodeOfCare\' has not been checked because it is unknown, and the validator is set to not fetch unknown profiles",\n    "location": [ "Bundle.entry[0].resource/*EpisodeOfCare/92719063-043c-494c-9de0-18e68f0ad336*/.meta.profile[0]", "Line[1] Col[327]" ]\n  }, {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 686\n    } ],\n    "severity": "warning",\n    "code": "processing",\n    "diagnostics": "Rule dom-6: \'A resource should have narrative for robust management\' Failed",\n    "location": [ "Bundle.entry[1].resource/*EpisodeOfCare/117080e0-6de4-4a30-8544-533d2e25df29*/", "Line[1] Col[686]" ]\n  }, {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 686\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-message-id",\n      "valueString": "Validation_VAL_Profile_Minimum"\n    } ],\n    "severity": "error",\n    "code": "processing",\n    "details": {\n      "coding": [ {\n        "system": "http://hl7.org/fhir/java-core-messageId",\n        "code": "Validation_VAL_Profile_Minimum"\n      } ]\n    },\n    "diagnostics": "EpisodeOfCare.status: minimum required = 1, but only found 0 (from http://hl7.org/fhir/StructureDefinition/EpisodeOfCare|4.0.1)",\n    "location": [ "Bundle.entry[1].resource/*EpisodeOfCare/117080e0-6de4-4a30-8544-533d2e25df29*/", "Line[1] Col[686]" ]\n  }, {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 686\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-message-id",\n      "valueString": "Validation_VAL_Profile_Minimum"\n    } ],\n    "severity": "error",\n    "code": "processing",\n    "details": {\n      "coding": [ {\n        "system": "http://hl7.org/fhir/java-core-messageId",\n        "code": "Validation_VAL_Profile_Minimum"\n      } ]\n    },\n    "diagnostics": "EpisodeOfCare.patient: minimum required = 1, but only found 0 (from http://hl7.org/fhir/StructureDefinition/EpisodeOfCare|4.0.1)",\n    "location": [ "Bundle.entry[1].resource/*EpisodeOfCare/117080e0-6de4-4a30-8544-533d2e25df29*/", "Line[1] Col[686]" ]\n  }, {\n    "extension": [ {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",\n      "valueInteger": 1\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",\n      "valueInteger": 686\n    }, {\n      "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-message-id",\n      "valueString": "VALIDATION_VAL_PROFILE_UNKNOWN_NOT_POLICY"\n    } ],\n    "severity": "error",\n    "code": "processing",\n    "details": {\n      "coding": [ {\n        "system": "http://hl7.org/fhir/java-core-messageId",\n        "code": "VALIDATION_VAL_PROFILE_UNKNOWN_NOT_POLICY"\n      } ]\n    },\n    "diagnostics": "Profile reference \'http://172.209.216.154:3447/fhir/StructureDefinition/SzEpisodeOfCare\' has not been checked because it is unknown, and the validator is set to not fetch unknown profiles",\n    "location": [ "Bundle.entry[1].resource/*EpisodeOfCare/117080e0-6de4-4a30-8544-533d2e25df29*/.meta.profile[0]", "Line[1] Col[686]" ]\n  } ]\n}',
      headers: {},
    };
    const result = logValidationErrors(response, mockLogger);

    expect(result.validationIssues).to.eql({
      'EpisodeOfCare/92719063-043c-494c-9de0-18e68f0ad336': {
        warning: [
          "Rule dom-6: 'A resource should have narrative for robust management' Failed",
        ],
        error: [
          'EpisodeOfCare.status: minimum required = 1, but only found 0 (from http://hl7.org/fhir/StructureDefinition/EpisodeOfCare|4.0.1)',
          'EpisodeOfCare.patient: minimum required = 1, but only found 0 (from http://hl7.org/fhir/StructureDefinition/EpisodeOfCare|4.0.1)',
          "Profile reference 'http://172.209.216.154:3447/fhir/StructureDefinition/SzEpisodeOfCare' has not been checked because it is unknown, and the validator is set to not fetch unknown profiles",
        ],
      },
      'EpisodeOfCare/117080e0-6de4-4a30-8544-533d2e25df29': {
        warning: [
          "Rule dom-6: 'A resource should have narrative for robust management' Failed",
        ],
        error: [
          'EpisodeOfCare.status: minimum required = 1, but only found 0 (from http://hl7.org/fhir/StructureDefinition/EpisodeOfCare|4.0.1)',
          'EpisodeOfCare.patient: minimum required = 1, but only found 0 (from http://hl7.org/fhir/StructureDefinition/EpisodeOfCare|4.0.1)',
          "Profile reference 'http://172.209.216.154:3447/fhir/StructureDefinition/SzEpisodeOfCare' has not been checked because it is unknown, and the validator is set to not fetch unknown profiles",
        ],
      },
    });
  });
});

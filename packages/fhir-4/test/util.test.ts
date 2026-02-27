import { expect } from 'chai';
import { sortBundle } from '../src/util';

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

describe.only('sortBundle', () => {
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

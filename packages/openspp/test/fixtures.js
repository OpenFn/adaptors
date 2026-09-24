// Trimmed response bodies captured from a local OpenSPP2 19.0 instance
// (spp_mis_demo_v2 demo data) through the REST API v2.

export const IND_ID = 'urn:openspp:vocab:id-type#birth_certificate|BC-2295-094436';
export const IND_PATH =
  'urn%3Aopenspp%3Avocab%3Aid-type%23birth_certificate%7CBC-2295-094436';

export const GRP_ID = 'urn:openspp:vocab:id-type#national_id|HH-4424-648849';
export const GRP_PATH =
  'urn%3Aopenspp%3Avocab%3Aid-type%23national_id%7CHH-4424-648849';

export const PROGRAM_ID = 'urn:openspp:program|universal-child-grant';
export const PROGRAM_PATH = 'urn%3Aopenspp%3Aprogram%7Cuniversal-child-grant';

export const OTHER_PROGRAM_ID = 'urn:openspp:program|disability-support-grant';

export const individual = {
  type: 'Individual',
  identifier: [
    {
      system: 'urn:openspp:vocab:id-type#birth_certificate',
      value: 'BC-2295-094436',
    },
  ],
  active: true,
  name: { family: 'ABAD', given: 'CLARITA', text: 'ABAD, CLARITA' },
  birthDate: '2016-05-02',
  gender: {
    coding: [{ system: 'urn:iso:std:iso:5218', code: '2', display: 'Female' }],
  },
  meta: { versionId: '1790220616815078', lastUpdated: '2026-09-24T03:30:16' },
};

export const group = {
  type: 'Group',
  identifier: [
    { system: 'urn:openspp:vocab:id-type#national_id', value: 'HH-4424-648849' },
  ],
  active: true,
  groupType: 'household',
  name: 'Abad',
  member: [
    {
      entity: {
        reference: 'Individual/urn:openspp:vocab:id-type|BC-2295-094436',
        display: 'ABAD, CLARITA',
      },
      inactive: false,
      role: {
        coding: [
          {
            system: 'urn:openspp:vocab:group-membership-type',
            code: 'child',
            display: 'Child',
          },
        ],
      },
    },
  ],
  quantity: 1,
};

export const program = {
  type: 'Program',
  identifier: [{ system: 'urn:openspp:program', value: 'universal-child-grant' }],
  active: true,
  name: 'Universal Child Grant',
  programType: {
    coding: [{ system: 'urn:openspp:vocab:program-type', code: 'cash' }],
  },
  targetType: 'individual',
};

export const searchResult = (data, path = '/api/v2/spp/X') => ({
  data,
  meta: { total: data.length, count: data.length, offset: 0 },
  links: { self: `${path}?_count=20&_offset=0`, next: null, prev: null },
});

export const membership = (
  status = 'enrolled',
  programId = PROGRAM_ID,
  beneficiary = `Individual/${IND_ID}`
) => ({
  type: 'ProgramMembership',
  program: { reference: `Program/${programId}`, display: 'Program' },
  beneficiary: { reference: beneficiary, display: 'ABAD, CLARITA' },
  status,
  identifier: [
    {
      system: 'urn:openspp:vocab:id-type#birth_certificate',
      value: 'BC-2295-094436',
    },
  ],
  enrollmentDate: '2024-12-16',
  meta: { versionId: '1790220616815078' },
});

export const groupMember = (roleCode = 'member') => ({
  type: 'GroupMember',
  group: { reference: `Group/${GRP_ID}` },
  entity: { reference: `Individual/${IND_ID}` },
  role: {
    coding: [
      { system: 'urn:openspp:vocab:group-membership-type', code: roleCode },
    ],
  },
  start_date: '2026-09-24',
  status: 'active',
});

export const servicePoint = {
  resourceType: 'ServicePoint',
  identifier: 'OpenFn Test Service Point 1',
  name: 'OpenFn Test Service Point 1',
  contractActive: false,
  disabled: false,
  country: 'PH',
  area: {
    reference: 'Area/Agoncillo (PH0401001)',
    display: 'Agoncillo (PH0401001)',
  },
};

export const servicePointBundle = resources => ({
  resourceType: 'Bundle',
  type: 'searchset',
  total: resources.length,
  link: [{ relation: 'self', url: '/api/v2/spp/ServicePoint?&_count=20&_offset=0' }],
  entry: resources.map(resource => ({
    resource,
    search: { mode: 'match', score: 1.0 },
  })),
});

import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { http } from '../src/index.js';

const testServer = enableMockClient('https://ihris.example.com');

describe('http namespace', () => {
  const state = {
    configuration: {
      baseUrl: 'https://ihris.example.com',
      username: 'admin@ihris.org',
      password: 'admin123',
    },
    data: {},
    references: [],
  };

  beforeEach(() => {
    testServer
      .intercept({
        path: '/auth/login',
        method: 'POST',
        body: JSON.stringify({
          username: 'admin@ihris.org',
          password: 'admin123',
        }),
      })
      .reply(200, { success: true }, {
        headers: { 'set-cookie': ['session=abc123; Path=/'] },
      });
  });

  describe('http.get', () => {
    it('retrieves a Practitioner resource by ID', async () => {
      testServer
        .intercept({
          path: '/fhir/Practitioner/P10004',
          method: 'GET',
          headers: {
            'Cookie': 'session=abc123',
            'content-type': 'application/fhir+json',
          },
        })
        .reply(200, {
          resourceType: 'Practitioner',
          id: 'P10004',
          meta: {
            versionId: '1',
            lastUpdated: '2024-08-06T06:13:10.163+00:00',
            profile: ['http://ihris.org/fhir/StructureDefinition/ihris-practitioner'],
          },
          active: true,
          name: [
            {
              use: 'official',
              text: 'Dr. Sarah Johnson',
              family: 'Johnson',
              given: ['Sarah'],
              prefix: ['Dr.'],
            },
          ],
          gender: 'female',
          birthDate: '1985-03-15',
          qualification: [
            {
              code: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/v2-0360|2.7',
                    code: 'MD',
                  },
                ],
                text: 'Doctor of Medicine',
              },
            },
          ],
        });

      const finalState = await http.get('/fhir/Practitioner/P10004')(state);

      expect(finalState.data.resourceType).to.eql('Practitioner');
      expect(finalState.data.id).to.eql('P10004');
      expect(finalState.data.name[0].family).to.eql('Johnson');
      expect(finalState.data.active).to.be.true;
    });

    it('retrieves multiple Practitioners with query parameters', async () => {
      testServer
        .intercept({
          path: '/fhir/Practitioner',
          method: 'GET',
          headers: {
            'Cookie': 'session=abc123',
            'content-type': 'application/fhir+json',
          },
          query:{ active: 'true', _count: '10'}
        })
        .reply(200, {
          resourceType: 'Bundle',
          type: 'searchset',
          total: 2,
          entry: [
            {
              resource: {
                resourceType: 'Practitioner',
                id: 'P10004',
                active: true,
                name: [{ family: 'Johnson', given: ['Sarah'] }],
              },
            },
            {
              resource: {
                resourceType: 'Practitioner',
                id: 'P10005',
                active: true,
                name: [{ family: 'Smith', given: ['John'] }],
              },
            },
          ],
        });

      const finalState = await http.get('/fhir/Practitioner', {
        query: { active: 'true', _count: '10' },
      })(state);

      expect(finalState.data.resourceType).to.eql('Bundle');
      expect(finalState.data.entry).to.have.length(2);
      expect(finalState.data.total).to.eql(2);
    });
    it('retrieves all Practitioners', async () => {
      testServer
        .intercept({
          path: '/fhir/Practitioner',
            method: 'GET',
            headers: {
                'Cookie': 'session=abc123',
                'content-type': 'application/fhir+json',
            },
        })
        .reply(200, {
          resourceType: 'Bundle',
          type: 'searchset',
          total: 2,
          entry: [
            {
              resource: {
                resourceType: 'Practitioner',
                id: 'P10004',
                active: true,
                name: [{ family: 'Johnson', given: ['Sarah'] }],
              },
            },
            {
              resource: {
                resourceType: 'Practitioner',
                id: 'P10005',
                active: true,
                name: [{ family: 'Smith', given: ['John'] }],
              },
            },
          ],
        });

      const finalState = await http.get('/fhir/Practitioner')(state);

      expect(finalState.data.resourceType).to.eql('Bundle');
      expect(finalState.data.entry).to.have.length(2);
      expect(finalState.data.total).to.eql(2);
    });
  });

  describe('http.post', () => {
    it('creates a new Practitioner resource', async () => {
      const newPractitioner = {
        resourceType: 'Practitioner',
        meta: {
          profile: ['http://ihris.org/fhir/StructureDefinition/ihris-practitioner'],
        },
        extension: [
          {
            url: 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-nationality',
            valueCoding: {
              system: 'urn:iso:std:iso:3166',
              code: 'UG',
            },
          },
        ],
        active: true,
        name: [
          {
            use: 'official',
            text: 'Dr. Jane Smith',
            family: 'Smith',
            given: ['Jane'],
            prefix: ['Dr.'],
          },
        ],
        gender: 'female',
        birthDate: '1990-05-20',
        qualification: [
          {
            code: {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/v2-0360|2.7',
                  code: 'MD',
                },
              ],
              text: 'Doctor of Medicine',
            },
          },
        ],
      };

      testServer
        .intercept({
          path: '/fhir/Practitioner',
          method: 'POST',
          body: JSON.stringify(newPractitioner),
          headers: {
            'Cookie': 'session=abc123',
            'content-type': 'application/fhir+json',
          },
        })
        .reply(201, {
          ...newPractitioner,
          id: 'P10010',
          meta: {
            ...newPractitioner.meta,
            versionId: '1',
            lastUpdated: '2024-11-02T10:00:00.000+00:00',
          },
        });

      const finalState = await http.post('/fhir/Practitioner', newPractitioner)(state);

      expect(finalState.data.id).to.eql('P10010');
      expect(finalState.data.resourceType).to.eql('Practitioner');
      expect(finalState.data.name[0].family).to.eql('Smith');
    });

    it('creates a PractitionerRole resource', async () => {
      const newRole = {
        resourceType: 'PractitionerRole',
        meta: {
          profile: ['http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role'],
        },
        practitioner: {
          reference: 'Practitioner/P10004',
        },
        organization: {
          reference: 'Organization/ministry-of-health',
        },
        location: [
          {
            reference: 'Location/kampala-hospital',
          },
        ],
        code: [
          {
            coding: [
              {
                system: 'http://ihris.org/fhir/CodeSystem/ihris-job',
                code: 'doctor',
                display: 'Doctor',
              },
            ],
          },
        ],
        active: true,
      };

      testServer
        .intercept({
          path: '/fhir/PractitionerRole',
          method: 'POST',
          body: JSON.stringify(newRole),
          headers: {
            'Cookie': 'session=abc123',
            'content-type': 'application/fhir+json',
          },
        })
        .reply(201, {
          ...newRole,
          id: 'PR10001',
          meta: {
            ...newRole.meta,
            versionId: '1',
            lastUpdated: '2024-11-02T10:00:00.000+00:00',
          },
        });

      const finalState = await http.post('/fhir/PractitionerRole', newRole)(state);

      expect(finalState.data.id).to.eql('PR10001');
      expect(finalState.data.resourceType).to.eql('PractitionerRole');
      expect(finalState.data.practitioner.reference).to.eql('Practitioner/P10004');
    });
  });

  describe('http.put', () => {
    it('updates an existing Practitioner resource', async () => {
      const updatedPractitioner = {
        resourceType: 'Practitioner',
        id: 'P10004',
        meta: {
          versionId: '2',
          lastUpdated: '2024-11-02T10:30:00.000+00:00',
          profile: ['http://ihris.org/fhir/StructureDefinition/ihris-practitioner'],
        },
        active: true,
        name: [
          {
            use: 'official',
            text: 'Dr. Sarah Johnson-Williams',
            family: 'Johnson-Williams',
            given: ['Sarah'],
            prefix: ['Dr.'],
          },
        ],
        gender: 'female',
        birthDate: '1985-03-15',
      };

      testServer
        .intercept({
          path: '/fhir/Practitioner/P10004',
          method: 'PUT',
          body: JSON.stringify(updatedPractitioner),
          headers: {
            'Cookie': 'session=abc123',
            'content-type': 'application/fhir+json',
          },
        })
        .reply(200, updatedPractitioner);

      const finalState = await http.put('/fhir/Practitioner/P10004', updatedPractitioner)(state);

      expect(finalState.data.name[0].family).to.eql('Johnson-Williams');
      expect(finalState.data.meta.versionId).to.eql('2');
    });
  });

});
getIndividual('urn:openspp:vocab:id-type#national_id|PH-123456789');
searchIndividual({ name: 'Santos' }, { count: 20 });
createIndividual({
  identifier: [
    { system: 'urn:openspp:vocab:id-type#national_id', value: 'PH-123456789' },
  ],
  name: { family: 'Santos', given: 'Maria' },
});
updateIndividual('urn:openspp:vocab:id-type#national_id|PH-123456789', {
  birthDate: '1985-03-15',
});
getGroup('urn:openspp:vocab:id-type#household_id|HH-1');
searchGroup({ name: 'Santos', type: 'household' });
createGroup({
  identifier: [
    { system: 'urn:openspp:vocab:id-type#household_id', value: 'HH-1' },
  ],
  name: 'Santos Household',
  groupType: 'household',
});
updateGroup('urn:openspp:vocab:id-type#household_id|HH-1', {
  name: 'Santos-Reyes Household',
});
getGroupMembers('urn:openspp:vocab:id-type#household_id|HH-1');
addToGroup(
  'urn:openspp:vocab:id-type#household_id|HH-1',
  'urn:openspp:vocab:id-type#national_id|PH-123456789',
  'head'
);
removeFromGroup(
  'urn:openspp:vocab:id-type#household_id|HH-1',
  'urn:openspp:vocab:id-type#national_id|PH-123456789'
);
getProgram('urn:openspp:program|universal-child-grant');
getPrograms();
getEnrolledPrograms('Group/urn:openspp:vocab:id-type#household_id|HH-1');
enroll(
  'Group/urn:openspp:vocab:id-type#household_id|HH-1',
  'urn:openspp:program|universal-child-grant'
);
unenroll(
  'Group/urn:openspp:vocab:id-type#household_id|HH-1',
  'urn:openspp:program|universal-child-grant'
);
getServicePoint('Agoncillo Payment Center');
searchServicePoint({ country: 'PH' });

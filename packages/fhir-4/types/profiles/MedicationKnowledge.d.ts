export declare type MedicationKnowledge_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    code?: any;
    status?: any;
    manufacturer?: any;
    doseForm?: any;
    amount?: any;
    synonym?: any;
    relatedMedicationKnowledge?: any;
    associatedMedication?: any;
    productType?: any;
    monograph?: any;
    ingredient?: any;
    preparationInstruction?: any;
    intendedRoute?: any;
    cost?: any;
    monitoringProgram?: any;
    administrationGuidelines?: any;
    medicineClassification?: any;
    packaging?: any;
    drugCharacteristic?: any;
    contraindication?: any;
    regulatory?: any;
    kinetics?: any;
};
export default function (props: Partial<MedicationKnowledge_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};

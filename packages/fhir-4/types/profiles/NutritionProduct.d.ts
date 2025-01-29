export declare type NutritionProduct_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    status?: any;
    category?: any;
    code?: any;
    manufacturer?: any;
    nutrient?: any;
    ingredient?: any;
    knownAllergen?: any;
    productCharacteristic?: any;
    instance?: any;
    note?: any;
};
export default function (props: Partial<NutritionProduct_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};

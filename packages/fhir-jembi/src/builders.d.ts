
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import "./globals";

type Patient_patient_Props = {
    address: {
        /**
         * Unique id for inter-element referencing
         *  */
        id: string;
        /**
         * Residential Type
         *  */
        residentialType: any;
        /**
         * home | work | temp | old | billing - purpose of this address
         *  */
        use: string;
        /**
         * postal | physical | both
         *  */
        type: string;
        /**
         * Text representation of the address
         *  */
        text: string;
        /**
         * Street name, number, direction & P.O. Box etc.
         *  */
        line: string;
        /**
         * Name of city, town etc.
         *  */
        city: string;
        /**
         * District name (aka county)
         *  */
        district: string;
        /**
         * Sub-unit of country (abbreviations ok)
         *  */
        state: string;
        /**
         * Postal code for area
         *  */
        postalCode: string;
        /**
         * Country (e.g. can be ISO 3166 2 or 3 letter code)
         *  */
        country: string;
        /**
         * Time period when address was/is in use
         *  */
        period: Period;
    };
    religion: CodeableConcept;
};

type Patient_variants = "patient";

type Patient__lookups = {
    "patient": Patient_patient_Props;
};

export declare function patient<T extends Patient_variants>(type: Patient_variants, props: Patient__lookups[T]);;
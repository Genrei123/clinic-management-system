export default interface Patient {
  clientID: number;

  patientID: string;

  imagePath: string;

  lastName: string;

  givenName: string;

  middleInitial: string;

  sex: string;

  address: string;

  age: number;

  birthday: string;

  religion: string;

  occupation: string;

  lastDelivery: string | null;

  philhealthID: string;

  expectedDateConfinement: string;

  spouse: {

    spouseName: string;

    spouseBirthday: string;

    spouseReligion: string;

    spouseOccupation: string;

    spouseContactNumber: string;

    spouseAge: number;

  };

  pregnancy: {

    gravida: number;

    para: number;

    term: number;

    preTerm: number;

    abortion: number;

    living: number;

    LMP: string;

    EDC: string;

    ITDate: string | null;

    menarche: string;

  };

  consultation: {

    consultation_date: string;

    AOG: number;

    BP: string;

    weight: number;

    FH: number;

    FHT: number;

    remarks: string;

  };

  medicalHistory: {

    smoking: boolean;

    allergies: string;

    drugIntake: boolean;

    bleedingAnemia: boolean;

    diabetesCongenitalAnomalies: boolean;

    previousCSection: boolean;

    consectuivemiscarriage: boolean;

    postPartumHemorrhage: boolean;

    forcepDelivery: boolean;

    hypertension: boolean;

  };

}
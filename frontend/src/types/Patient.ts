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
  status: string;
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
    pre_term: number;
    abortion: number;
    living: number;
    LMP: string;
    edc: string;
    IT_date: string;
    menarche: string;
  };

  consultation: {
    consultation_date: string; // Corrected from `consultation_date`
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
    consecutiveMiscarriages: boolean; // Corrected from `consectuivemiscarriage`
    postPartumHemorrhage: boolean;
    forcepDelivery: boolean;
    hypertension: boolean;
  };
}

interface ServiceDTO {
  serviceID: number;
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
}

interface ItemDTO {
  itemID: number;
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
}

interface RenderedServiceDTO {
  id: number;
  patientId: number;
  services: ServiceDTO[];
  items: ItemDTO[];
  totalCost: number;
  notes: string;
  renderedDate?: string; // if you added this field in the DTO
}

interface Visit {
  visitDate: string;
  reason: string;
}

interface File {
  name: string;
  uploadDate: string;
  type: string;
}


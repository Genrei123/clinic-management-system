interface Spouse {
    name: string;
}

export interface Patient {
    clientID: number;
    varcharID: string;
    lastName: string;
    givenName: string;
    middleInitial: string | null;  // 'null' in case middle initial is not provided
    sex: 'M' | 'F';  // Assuming 'M' for Male and 'F' for Female
    address: string;
    age: number;
    birthday: string;  // Date as a string in 'YYYY-MM-DD' format
    religion: string;
    occupation: string;
    lastDelivery: string;  // Date as a string in 'YYYY-MM-DD' format
    philhealthID: string;
    spouse?: Spouse;  // Optional field
}


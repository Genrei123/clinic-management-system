import React from 'react'

interface PatientFormData {
  birthday: string
  patientID: string
  lastName: string
  givenName: string
  middleName: string
  address: string
  religion: string
  occupation: string
  age: number
  sex: string
}

interface PatientInformationSectionProps {
  formData: PatientFormData
  setFormData: React.Dispatch<React.SetStateAction<PatientFormData>>
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

type FormField = {
  label: string
  name: keyof PatientFormData
  type?: 'text' | 'number' | 'date'
}

const PatientInformationSection: React.FC<PatientInformationSectionProps> = ({
  formData,
  setFormData,
  handleInputChange,
}) => {
  const calculateAge = (birthday: string): number => {
    const birthDate = new Date(birthday)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const isBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate())
    return isBirthdayPassed ? age : age - 1
  }

  const formFields: FormField[] = [
    { label: 'Birthday', name: 'birthday', type: 'date' },
    { label: 'Patient ID', name: 'patientID' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Given Name', name: 'givenName' },
    { label: 'Middle Name', name: 'middleName' },
    { label: 'Address', name: 'address' },
    { label: 'Religion', name: 'religion' },
    { label: 'Occupation', name: 'occupation' },
    { label: 'Age', name: 'age', type: 'number' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map(({ label, name, type = 'text' }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium mb-1">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={
                name === 'birthday'
                  ? (e) => {
                      handleInputChange(e)
                      const updatedAge = calculateAge(e.target.value)
                      setFormData((prev) => ({ ...prev, age: updatedAge }))
                    }
                  : handleInputChange
              }
              className="w-full border rounded-lg p-2"
            />
          </div>
        ))}

        <div>
          <label htmlFor="sex" className="block text-sm font-medium mb-1">
            Sex
          </label>
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 bg-white"
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default PatientInformationSection
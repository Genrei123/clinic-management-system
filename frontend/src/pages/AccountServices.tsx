import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import {
  getServices,
  addService,
  updateService,
  deleteService,
  Services,
} from '../services/serviceService'

export default function AccountServices() {
  const [services, setServices] = useState<Services[]>([])
  const [serviceData, setServiceData] = useState<Services>({
    id: undefined,
    service_name: '',
    service_description: '',
    service_price: '',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch services from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getServices()
        setServices(response.data)
      } catch (error) {
        console.error('Error fetching services:', error)
        setMessage('Unable to fetch services.')
      }
    }
    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (isEditing) {
        // Update service
        await updateService(serviceData)
        setServices((prev) =>
          prev.map((service) =>
            service.id === serviceData.id ? { ...serviceData } : service
          )
        )
        setMessage('Service updated successfully!')
      } else {
        // Add new service
        const response = await addService(serviceData)
        setServices((prev) => [...prev, response.data])
        setMessage('Service added successfully!')
      }
    } catch (error) {
      console.error('Error saving service:', error)
      setMessage('An error occurred while saving the service.')
    }

    setServiceData({ id: undefined, service_name: '', service_description: '', service_price: '' })
    setIsEditing(false);
    setIsModalOpen(false);

    // Refresh the service list
    const response = await getServices()
    setServices(response.data)
  }

  const handleEdit = (service: Services) => {
    setServiceData(service)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteService(id)
      setServices((prev) => prev.filter((service) => service.id !== id))
      setMessage('Service deleted successfully!')
    } catch (error) {
      console.error('Error deleting service:', error)
      setMessage('An error occurred while deleting the service.')
    }
  }

  const handleCancelEdit = () => {
    setServiceData({ id: undefined, service_name: '', service_description: '', service_price: '' })
    setIsEditing(false)
    setIsModalOpen(false)
    setMessage('')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Account Services</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Service
            </button>
          </div>
          {message && (
            <div
              className={`p-4 mb-6 rounded-md ${
                message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          {/* Service List or Empty State */}
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.service_name}</h3>
                  <p className="text-gray-600 mb-2">{service.service_description}</p>
                  <p className="text-lg font-medium text-gray-700 mb-4">Price: ${service.service_price}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(service)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id!)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">No services available</h2>
              <p className="text-gray-600 mb-6">Start by adding a new service to help users interact with your offerings.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Your First Service
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{isEditing ? 'Edit Service' : 'Add New Service'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="service_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  id="service_name"
                  name="service_name"
                  value={serviceData.service_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="service_description" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Description
                </label>
                <textarea
                  id="service_description"
                  name="service_description"
                  value={serviceData.service_description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label htmlFor="service_price" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Price
                </label>
                <input
                  type="text"
                  id="service_price"
                  name="service_price"
                  value={serviceData.service_price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isEditing ? 'Update Service' : 'Add Service'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

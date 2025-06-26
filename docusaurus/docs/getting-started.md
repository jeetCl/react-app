// App.js
import React, { useState, useEffect } from 'react';

// Main App component for the CRM Client List
function App() {
  // State to hold the list of clients
  const [clients, setClients] = useState([]);
  // State for the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');
  // State for loading status (simulated)
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching client data from an API
  useEffect(() => {
    // Mock client data
    const mockClients = [
      { id: '1', name: 'Reformas del Sol S.L.', contactPerson: 'Juan García', email: 'juan.garcia@reformasdelsol.es', phone: '+34 600 123 456', project: 'Reforma Integral Cocina' },
      { id: '2', name: 'Constructora Atlántica', contactPerson: 'María Pérez', email: 'maria.perez@constructora.es', phone: '+34 610 234 567', project: 'Aislamiento Térmico Fachada' },
      { id: '3', name: 'Innovación Hogar S.A.', contactPerson: 'Carlos Ruiz', email: 'carlos.ruiz@innovacionhogar.com', phone: '+34 620 345 678', project: 'Ampliación Salón' },
      { id: '4', name: 'Reformas Compostela', contactPerson: 'Ana López', email: 'ana.lopez@reformascompostela.es', phone: '+34 630 456 789', project: 'Reforma Baño Principal' },
      { id: '5', name: 'Grupo Edifica Galicia', contactPerson: 'Pablo Martínez', email: 'pablo.martinez@grupoedifica.es', phone: '+34 640 567 890', project: 'Impermeabilización Cubierta' },
      { id: '6', name: 'Arquitectura Viva', contactPerson: 'Laura Fernández', email: 'laura.fernandez@arq-viva.es', phone: '+34 650 678 901', project: 'Diseño y Construcción Jardín' },
      { id: '7', name: 'Soluciones Constructivas Norte', contactPerson: 'David Castro', email: 'david.castro@solucionesnorte.es', phone: '+34 660 789 012', project: 'Rehabilitación Edificio Histórico' },
      { id: '8', name: 'Reforma Express', contactPerson: 'Elena Gómez', email: 'elena.gomez@reformaexpress.es', phone: '+34 670 890 123', project: 'Cambio de Ventanas' },
      { id: '9', name: 'Hogar Confort S.L.', contactPerson: 'Javier Santos', email: 'javier.santos@hogarconfort.es', phone: '+34 680 901 234', project: 'Instalación de Calefacción' },
      { id: '10', name: 'Acabados Premium Galicia', contactPerson: 'Sofía Torres', email: 'sofia.torres@acabadospremium.es', phone: '+34 690 012 345', project: 'Pulido y Barnizado de Suelos' },
    ];

    setTimeout(() => {
      setClients(mockClients);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  // Filter clients based on the search term
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 font-inter p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">Gestión de Clientes CRM</h1>

        {/* Search input section */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar clientes por nombre, contacto o email..."
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out text-base sm:text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Campo de búsqueda de clientes"
          />
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="text-center text-lg sm:text-xl text-gray-600 p-8">Cargando clientes...</div>
        ) : (
          <>
            {/* Desktop Table View (for larger screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-blue-600 text-white rounded-t-lg">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold rounded-tl-lg">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Empresa</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Persona de Contacto</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Teléfono</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold rounded-tr-lg">Proyecto Asignado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
                        <td className="py-3 px-4 text-sm text-gray-700">{client.id}</td>
                        <td className="py-3 px-4 text-sm font-medium text-blue-700">{client.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{client.contactPerson}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{client.email}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{client.phone}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{client.project}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-gray-500 text-base">
                        No se encontraron clientes que coincidan con la búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (for smaller screens) */}
            <div className="md:hidden">
              {filteredClients.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredClients.map((client) => (
                    <div key={client.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition duration-150 ease-in-out">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-blue-700">{client.name}</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">ID: {client.id}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">**Contacto:** {client.contactPerson}</p>
                      <p className="text-sm text-gray-700 mb-1">**Email:** {client.email}</p>
                      <p className="text-sm text-gray-700 mb-1">**Teléfono:** {client.phone}</p>
                      <p className="text-sm text-gray-700">**Proyecto:** {client.project}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-base text-gray-500 p-6 bg-white rounded-lg shadow-sm">
                  No se encontraron clientes que coincidan con la búsqueda.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

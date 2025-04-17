<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control Financiero Personal</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        body {
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
            padding: 20px;
            max-width: 100%;
            overflow-x: hidden;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        header, .form-container, .history-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 20px;
            margin-bottom: 20px;
        }
        header {
            text-align: center;
        }
        h1 {
            color: #3b82f6;
            margin-bottom: 16px;
        }
        h2 {
            color: #374151;
            margin-bottom: 12px;
            font-size: 1.2rem;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-top: 20px;
        }
        .summary-box {
            background: #f3f4f6;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
        }
        .summary-label {
            color: #6b7280;
            font-size: 0.875rem;
        }
        .summary-value {
            font-weight: bold;
            font-size: 1.1rem;
        }
        .positive {
            color: #10b981;
        }
        .negative {
            color: #ef4444;
        }
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
        }
        @media (max-width: 600px) {
            .form-grid {
                grid-template-columns: 1fr;
            }
        }
        .form-group {
            margin-bottom: 10px;
        }
        label {
            display: block;
            color: #4b5563;
            margin-bottom: 5px;
            font-size: 0.875rem;
        }
        input[type="text"], input[type="number"] {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            font-size: 1rem;
        }
        input[type="text"]:focus, input[type="number"]:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }
        .radio-group {
            display: flex;
            gap: 15px;
        }
        .radio-label {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        .button-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
        }
        button {
            background-color: #3b82f6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background-color 0.2s;
        }
        button:hover {
            background-color: #2563eb;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.875rem;
        }
        th {
            text-align: left;
            padding: 10px;
            background-color: #f3f4f6;
            font-weight: 600;
        }
        td {
            padding: 10px;
            border-bottom: 1px solid #e5e7eb;
        }
        tr:hover {
            background-color: #f9fafb;
        }
        .transaction-amount {
            text-align: right;
            font-weight: 500;
        }
        .delete-btn {
            background: none;
            color: #6b7280;
            border: none;
            padding: 2px 5px;
            cursor: pointer;
        }
        .delete-btn:hover {
            color: #ef4444;
        }
        .empty-message {
            text-align: center;
            color: #6b7280;
            padding: 30px 0;
        }
        .setup-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
        }
        .setup-box {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            padding: 30px;
            width: 100%;
            max-width: 400px;
        }
        .action-cell {
            text-align: center;
        }
    </style>
</head>
<body>
    <div id="app">
        <!-- El contenido se cargará dinámicamente con JavaScript -->
    </div>

    <script>
        // Estado de la aplicación
        const appState = {
            capitalInicial: 0,
            movimientos: [],
            capitalInicialEstablecido: false
        };

        // Cargar datos del almacenamiento local
        function cargarDatos() {
            const datos = localStorage.getItem('controlFinanciero');
            if (datos) {
                const datosGuardados = JSON.parse(datos);
                appState.capitalInicial = datosGuardados.capitalInicial || 0;
                appState.movimientos = datosGuardados.movimientos || [];
                appState.capitalInicialEstablecido = datosGuardados.capitalInicialEstablecido || false;
            }
        }

        // Guardar datos en el almacenamiento local
        function guardarDatos() {
            localStorage.setItem('controlFinanciero', JSON.stringify({
                capitalInicial: appState.capitalInicial,
                movimientos: appState.movimientos,
                capitalInicialEstablecido: appState.capitalInicialEstablecido
            }));
        }

        // Calcular balance actual
        function calcularBalance() {
            let balance = appState.capitalInicial;
            appState.movimientos.forEach(mov => {
                if (mov.tipo === 'ingreso') {
                    balance += mov.cantidad;
                } else {
                    balance -= mov.cantidad;
                }
            });
            return balance;
        }

        // Establecer capital inicial
        function establecerCapitalInicial() {
            const inputCapital = document.getElementById('capitalInicialInput');
            const monto = parseFloat(inputCapital.value);
            
            if (!isNaN(monto) && monto >= 0) {
                appState.capitalInicial = monto;
                appState.capitalInicialEstablecido = true;
                guardarDatos();
                renderizarApp();
            } else {
                alert('Por favor ingresa un monto válido');
            }
        }

        // Agregar nuevo movimiento
        function agregarMovimiento() {
            const descripcion = document.getElementById('descripcionInput').value;
            const cantidad = document.getElementById('cantidadInput').value;
            const tipoIngreso = document.getElementById('ingresoRadio').checked;
            
            if (descripcion.trim() === '' || cantidad.trim() === '') {
                alert('Por favor completa todos los campos');
                return;
            }
            
            const monto = parseFloat(cantidad);
            if (isNaN(monto) || monto <= 0) {
                alert('Por favor ingresa un monto válido');
                return;
            }
            
            const nuevoMovimiento = {
                id: Date.now(),
                fecha: new Date().toLocaleDateString(),
                descripcion,
                cantidad: monto,
                tipo: tipoIngreso ? 'ingreso' : 'egreso'
            };
            
            appState.movimientos.unshift(nuevoMovimiento);
            guardarDatos();
            
            // Limpiar campos
            document.getElementById('descripcionInput').value = '';
            document.getElementById('cantidadInput').value = '';
            
            renderizarHistorialMovimientos();
            actualizarResumen();
        }

        // Eliminar movimiento
        function eliminarMovimiento(id) {
            if (confirm('¿Estás seguro de eliminar este movimiento?')) {
                appState.movimientos = appState.movimientos.filter(mov => mov.id !== id);
                guardarDatos();
                renderizarHistorialMovimientos();
                actualizarResumen();
            }
        }

        // Actualizar el resumen financiero
        function actualizarResumen() {
            const balance = calcularBalance();
            document.getElementById('capitalInicialValor').textContent = `$${appState.capitalInicial.toFixed(2)}`;
            
            const balanceElement = document.getElementById('balanceActualValor');
            balanceElement.textContent = `$${balance.toFixed(2)}`;
            balanceElement.className = balance >= 0 ? 'summary-value positive' : 'summary-value negative';
            
            document.getElementById('totalMovimientosValor').textContent = appState.movimientos.length;
        }

        // Renderizar la pantalla de configuración inicial
        function renderizarConfiguracionInicial() {
            const app = document.getElementById('app');
            app.innerHTML = `
                <div class="setup-container">
                    <div class="setup-box">
                        <h1>Control Financiero Personal</h1>
                        <div class="form-group">
                            <label for="capitalInicialInput">Capital Inicial:</label>
                            <input 
                                type="number" 
                                id="capitalInicialInput"
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                            />
                        </div>
                        <button onclick="establecerCapitalInicial()" style="width: 100%; margin-top: 15px;">
                            Comenzar
                        </button>
                    </div>
                </div>
            `;
        }

        // Renderizar el historial de movimientos
        function renderizarHistorialMovimientos() {
            const historialContainer = document.getElementById('historialContainer');
            
            if (appState.movimientos.length === 0) {
                historialContainer.innerHTML = `<p class="empty-message">No hay movimientos registrados</p>`;
                return;
            }
            
            let html = `
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            appState.movimientos.forEach(mov => {
                html += `
                    <tr>
                        <td>${mov.fecha}</td>
                        <td>${mov.descripcion}</td>
                        <td class="transaction-amount ${mov.tipo === 'ingreso' ? 'positive' : 'negative'}">
                            ${mov.tipo === 'ingreso' ? '+' : '-'}$${mov.cantidad.toFixed(2)}
                        </td>
                        <td class="action-cell">
                            <button class="delete-btn" onclick="eliminarMovimiento(${mov.id})">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            html += `
                    </tbody>
                </table>
            `;
            
            historialContainer.innerHTML = html;
        }

        // Renderizar la aplicación principal
        function renderizarAppPrincipal() {
            const app = document.getElementById('app');
            app.innerHTML = `
                <div class="container">
                    <header>
                        <h1>Control Financiero Personal</h1>
                        <div class="summary">
                            <div class="summary-box">
                                <div class="summary-label">Capital Inicial</div>
                                <div class="summary-value" id="capitalInicialValor">$${appState.capitalInicial.toFixed(2)}</div>
                            </div>
                            <div class="summary-box">
                                <div class="summary-label">Balance Actual</div>
                                <div class="summary-value" id="balanceActualValor">$0.00</div>
                            </div>
                            <div class="summary-box">
                                <div class="summary-label">Movimientos</div>
                                <div class="summary-value" id="totalMovimientosValor">0</div>
                            </div>
                        </div>
                    </header>

                    <div class="form-container">
                        <h2>Nuevo Movimiento</h2>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="descripcionInput">Descripción:</label>
                                <input 
                                    type="text" 
                                    id="descripcionInput"
                                    placeholder="Descripción"
                                />
                            </div>
                            <div class="form-group">
                                <label for="cantidadInput">Cantidad:</label>
                                <input 
                                    type="number" 
                                    id="cantidadInput"
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                />
                            </div>
                        </div>
                        <div class="button-container">
                            <div class="radio-group">
                                <label class="radio-label">
                                    <input 
                                        type="radio" 
                                        name="tipo" 
                                        id="egresoRadio"
                                        checked
                                    />
                                    <span style="color: #ef4444; margin-left: 5px;">Egreso</span>
                                </label>
                                <label class="radio-label">
                                    <input 
                                        type="radio" 
                                        name="tipo" 
                                        id="ingresoRadio" 
                                    />
                                    <span style="color: #10b981; margin-left: 5px;">Ingreso</span>
                                </label>
                            </div>
                            <button onclick="agregarMovimiento()">Agregar</button>
                        </div>
                    </div>

                    <div class="history-container">
                        <h2>Historial de Movimientos</h2>
                        <div id="historialContainer">
                            <!-- El historial se cargará dinámicamente -->
                        </div>
                    </div>
                </div>
            `;
            
            renderizarHistorialMovimientos();
            actualizarResumen();
        }

        // Inicializar la aplicación
        function inicializarApp() {
            cargarDatos();
            
            if (appState.capitalInicialEstablecido) {
                renderizarAppPrincipal();
            } else {
                renderizarConfiguracionInicial();
            }
        }

        // Iniciar la aplicación cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', inicializarApp);
    </script>
</body>
</html>

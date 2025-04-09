# 📦 Delivery Manager - Sistema de Gestão de Entregadores em Tempo Real

![Badge](https://img.shields.io/badge/Status-Completo-success) ![Badge](https://img.shields.io/badge/Version-1.0.0-blue)

## 📌 Visão Geral
Sistema fullstack para monitoramento em tempo real de entregadores, com:
- **Mapa interativo** com rotas de entrega
- **Rastreamento** de posição em tempo real
- **Painel administrativo** com filtros avançados

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Função |
|------------|--------|
| Node.js | Ambiente de execução |
| Express | Framework web |
| Socket.IO | Comunicação em tempo real |
| PostgreSQL | Banco de dados relacional |
| MongoDB | Banco de dados de rastreamento |
| Sequelize | ORM para PostgreSQL |
| Mongoose | ODM para MongoDB |

### Frontend
| Tecnologia | Função |
|------------|--------|
| React | Biblioteca para UI |
| Leaflet | Mapas interativos |
| Socket.IO Client | Conexão com WebSocket |
| Axios | Requisições HTTP |
| Styled Components | Estilização |

## 🏗️ Arquitetura do Sistema

```
delivery-manager/
├── backend/
│   ├── config/      
│   ├── controllers/ 
│   ├── models/       
│   ├── routes/      
│   ├── services/     
│   ├── app.js
│   ├── sockets 
│   └── server.js 
└── frontend/
    ├── public/     
    └── src/
        ├── components/ 
        ├── contexts/
        ├── hooks/
        ├── services/
        ├── pages/      
        └── App.js    
```

## 🔌 Funcionalidades Principais

### 1. Gestão de Entregadores
- Cadastro com foto, veículo e contato
- Ativação/desativação de entregadores
- Filtros por status e localização

### 2. Mapa Interativo
- Visualização de todos os entregadores
- Rotas com pontos de entrega
- Acompanhamento em tempo real

### 3. Sistema de Rotas
- Definição de pontos de coleta e entrega
- Ajuste dinâmico de trajetos
- Histórico de entregas

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 16+
- PostgreSQL 12+
- MongoDB 4.4+
- NPM/Yarn

### Passo a Passo

1. **Configuração Inicial**
```bash
git clone https://github.com/seu-usuario/delivery-manager.git
cd delivery-manager
```

2. **Backend**
```bash
cd backend
cp .env.example .env
# Edite o .env com suas credenciais
npm install
npm start
```

3. **Frontend**
```bash
cd ../frontend
npm install
npm start
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

## ⚙️ Variáveis de Ambiente (`.env`)

```ini
# Backend
PORT=5001
PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=sua_senha
PG_DATABASE=delivery_manager
MONGO_URI=mongodb://localhost:27017/delivery_tracking

# Frontend
REACT_APP_API_URL=http://localhost:5001
REACT_APP_MAP_TOKEN=seu_token_do_mapbox
```

## 📊 Banco de Dados

### PostgreSQL (Dados Estruturados)
```sql
CREATE TABLE delivery_persons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  vehicle_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### MongoDB (Dados de Rastreamento)
```javascript
{
  deliveryPersonId: ObjectId,
  position: { type: "Point", coordinates: [lng, lat] },
  route: {
    start: { lat: Number, lng: Number },
    checkpoints: [{ lat: Number, lng: Number }],
    end: { lat: Number, lng: Number }
  },
  lastUpdated: Date
}
```

## 🔄 Fluxo de Comunicação

1. **Frontend** → **Backend** (HTTP)
   - Gestão de cadastros
   - Consulta de históricos

2. **Backend** ↔ **Frontend** (WebSocket)
   - Atualizações de posição
   - Notificações em tempo real

3. **Mobile** → **Backend** (WebSocket)
   - Envio de localização
   - Status de entregas

## 🧪 Testando a API

### Exemplo com cURL:
```bash
# Criar entregador
curl -X POST http://localhost:5001/api/delivery \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","phone":"11999999999","vehicleType":"motorcycle"}'

# Atualizar localização
curl -X POST http://localhost:5001/api/delivery/1/location \
  -H "Content-Type: application/json" \
  -d '{"lat":-23.5505,"lng":-46.6333}'
```

### Teste WebSocket:
```bash
npx wscat -c "ws://localhost:5001/socket.io/?EIO=3&transport=websocket"
> subscribe delivery_1
```

## 🛠️ Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm run seed` | Popula banco com dados de teste |
| `npm run lint` | Verifica qualidade do código |
| `npm run migrate` | Executa migrações do banco |

## 🚨 Solução de Problemas

### Erro comum: Porta em uso
```bash
npx kill-port 5001
```

### Erro: Conexão com MongoDB
Verifique se o serviço está ativo:
```bash
sudo systemctl status mongod
```

## 📈 Próximos Passos

1. Implementar autenticação JWT
2. Adicionar relatórios de desempenho
3. Desenvolver app mobile para entregadores

## 📄 Licença
MIT License - [LICENSE](LICENSE)

// API COM DEBUG DETALHADO
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

// MÉTODO getUsers COM LOGS DETALHADOS
api.getUsers = async () => {
  console.log("🔍 INÍCIO getUsers()");
  console.log("🌐 URL completa:", "http://localhost:3000/api/membros");
  
  try {
    console.log("📡 Fazendo requisição GET /api/membros...");
    const response = await api.get("/api/membros");
    
    console.log("✅ RESPOSTA RECEBIDA!");
    console.log("📊 Status:", response.status);
    console.log("📦 Dados:", response.data);
    console.log("🔢 Quantidade:", response.data?.length || 0, "membros");
    
    return response.data;
    
  } catch (error) {
    console.error("❌ ERRO DETALHADO:");
    console.error("Mensagem:", error.message);
    console.error("Código:", error.code);
    console.error("URL:", error.config?.url);
    console.error("Método:", error.config?.method);
    
    // Fallback SIMPLES
    console.log("🔄 Usando fallback...");
    return [
      { id: "1", nome: "João (fallback)", email: "joao@email.com", status: "Ativo" },
      { id: "2", nome: "Maria (fallback)", email: "maria@email.com", status: "Ativo" }
    ];
  }
};

// Outros métodos simplificados
api.getWorkouts = async () => [];
api.getPlans = async () => [];
api.createUser = async () => ({});

export default api;
export { api };

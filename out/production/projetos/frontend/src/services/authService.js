export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    const payload = JSON.parse(atob(parts[1]));

    const currentTime = Math.floor(Date.now() / 1000); // em segundos
    if (payload.exp && currentTime > payload.exp) {
      // Token expirado
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (e) {
    console.error("Erro ao decodificar token:", e);
    return false;
  }
};

export const getTokenPayload = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch("https://backend-estoque-clinica-1.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", // <-- Adicionado!
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Erro ao fazer login: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na autenticação:", error);
    throw error;
  }
};


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.href = "/login";
};

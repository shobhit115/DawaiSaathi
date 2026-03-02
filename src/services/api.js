import axios from "axios";

const API = axios.create({
  baseURL: "https://dawaisaathi-api.onrender.com/api",
  timeout: 60000, 
});

// 1. Direct Search (Search Bar) - GET request
export const fetchMedicineByName = async (name) => {
  const response = await API.get(`/medicine-direct`, {
    params: { name },
  });
  return response.data;
};

// 2. Image Analysis (Camera/Upload) - POST request
export const analyzeImageLLM = async (imageFile, language = "en") => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("language", language); // 🔥 Added language

  const response = await API.post(`/llm-analyze`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// 3. Text Chat & Recommendations - GET request
export const analyzeTextLLM = async (query, language = "en") => {
  const response = await API.get(`/llm-analyze-text`, {
    params: { query, language } // 🔥 Attaches ?query=...&language=hi
  });
  return response.data;
};
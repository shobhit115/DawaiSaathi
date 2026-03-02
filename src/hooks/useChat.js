import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchMedicineByName, analyzeTextLLM, analyzeImageLLM } from "../services/api";

// 1. Formats the Database Direct Search into Markdown
const formatMedicineResponse = (data) => {
  const productName = data.product_name ? data.product_name.toUpperCase() : "UNKNOWN MEDICINE";
  const salt = data.salt_composition || "Not specified";

  let rawDesc = data.medicine_desc || data.description || "No description available.";
  rawDesc = rawDesc.replace(/([a-z])\.([A-Z])/g, '$1. $2'); 
  const descBullets = rawDesc
    .split(/\.\s+|\.$/)
    .filter(sentence => sentence.trim().length > 0)
    .map(sentence => `* ${sentence.trim()}.`)
    .join('\n');

  const sideEffectsStr = data.side_effects || "None reported";
  const sideEffectsList = sideEffectsStr
    .split(',')
    .filter(Boolean)
    .map(effect => `* ${effect.trim()}`)
    .join('\n');

  return `
**${productName}**

**Active Ingredient:** ${salt}

**Description & Usage**
${descBullets}

**Common side effects**
${sideEffectsList}

This information is for educational purposes only and is not medical advice. Please consult a doctor before taking any medicine.
  `.trim();
};

// 2. Converts Base64 string back to a File object for the Backend
const base64ToFile = (base64String, filename = "upload.jpg") => {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// 3. The Main Chat Hook
export const useChat = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("en"); // 🔥 Language State

  const hasInitialized = useRef(false);

  const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const addMessage = useCallback((text, isBot = false, imageUrl = null) => {
    setMessages((prev) => [...prev, { text, isBot, image: imageUrl, time: getTime() }]);
  }, []);

  const sendMessage = useCallback(async (directQuery = null, base64Image = null, apiType = 'chat') => {
    const userQuery = typeof directQuery === "string" ? directQuery : input;
    const trimmedQuery = userQuery?.trim();

    if ((!trimmedQuery && !base64Image) || isTyping) return;

    setInput(""); 
    
    const displayMsg = base64Image ? "📷 Uploaded Prescription/Medicine Image" : trimmedQuery;
    addMessage(displayMsg, false, base64Image); 
    
    setIsTyping(true);

    try {
      let formattedResponse = "";

      if (apiType === 'image' && base64Image) {
        const imageFile = base64ToFile(base64Image);
        const response = await analyzeImageLLM(imageFile, language);
        formattedResponse = response.explanation || response.message || JSON.stringify(response); 
      
      } else if (apiType === 'search') {
        const data = await fetchMedicineByName(trimmedQuery);
        formattedResponse = data.explanation || formatMedicineResponse(data);
      
      } else {
        const response = await analyzeTextLLM(trimmedQuery, language);
        formattedResponse = response.explanation || response.message || JSON.stringify(response);
      }

      addMessage(formattedResponse, true);

    } catch (error) {
      console.error("API Error:", error);
      addMessage("❌ Sorry, I encountered an error. Please try again or check your spelling.", true);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, addMessage, language]);

  // Handle initialization from Home routing
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const state = location.state;

    if (state?.query || state?.image) {
      sendMessage(state.query, state.image, state.type);
      navigate(location.pathname, { replace: true, state: {} }); 
    } else {
      addMessage("Hi! I’m DawaiSaathi, Search by medicine name or upload a prescription to get started. Question-based assistance will be available in a future update.", true);
    }
  }, [location, sendMessage, navigate, addMessage]);

  return { messages, input, setInput, isTyping, sendMessage, language, setLanguage };
};
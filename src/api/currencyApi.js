import axios from 'axios';

const BASE_URL = 'https://api.invertexto.com/api-conversor-moedas';
const TOKEN = '4121|t41vewuMEuMvZCLvjyNcTsfepihCmirg';

export const getCurrencyConversion = async (fromCurrency, toCurrency, amount) => {
  try {
    const response = await axios.get(`${BASE_URL}/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

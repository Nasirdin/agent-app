import axios from "axios";

// Функция регистрации
const register = (data) => {
  return axios
    .post("http://localhost:3000/register", data) // Поправьте URL и отправку данных
    .then((response) => {
      console.log("Registration successful:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      throw error; // Передача ошибки для дальнейшей обработки
    });
};

export { register };

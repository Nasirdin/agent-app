import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [
      {
        id: 1,
        image:
          ["https://ritadrinks.com/images/stories/RITA-banner-fruit--500ml.jpg", "https://ritadrinks.com/images/stories/RITA-banner-fruit--500ml.jpg", "https://ritadrinks.com/images/stories/RITA-banner-fruit--500ml.jpg"],
        title: "Товар 1",
        manufacturer: "Производитель 1",
        price: "100",
        description: "Описание товара 1",
      },
      {
        id: 2,
        image:
          ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReetdQ6OxI4fFmUJmYxQ_F8hsTFD_EJFxMjbH70LYp8em6WcUhcEPpqf1rgVEIrc5_tdc&usqp=CAU"],
        title: "Товар 2",
        manufacturer: "Производитель 2",
        price: "130",
        description: "Описание товара 2",
      },
      {
        id: 3,
        image:
          ["https://ritadrinks.com/images/stories/RITA-banner-fruit--500ml.jpg"],
        title: "Товар 1",
        manufacturer: "Производитель 1",
        price: "100",
        description: "Описание товара 1",
      },
      {
        id: 4,
        image:
          ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReetdQ6OxI4fFmUJmYxQ_F8hsTFD_EJFxMjbH70LYp8em6WcUhcEPpqf1rgVEIrc5_tdc&usqp=CAU"],
        title: "Товар 2",
        manufacturer: "Производитель 2",
        price: "130",
        description: "Описание товара 2",
      },
      {
        id: 5,
        image:
          ["https://ritadrinks.com/images/stories/RITA-banner-fruit--500ml.jpg"],
        title: "Товар 1",
        manufacturer: "Производитель 1",
        price: "100",
        description: "Описание товара 1",
      },
      {
        id: 6,
        image:
          ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReetdQ6OxI4fFmUJmYxQ_F8hsTFD_EJFxMjbH70LYp8em6WcUhcEPpqf1rgVEIrc5_tdc&usqp=CAU"],
        title: "Товар 2",
        manufacturer: "Производитель 2",
        price: "130",
        description: "Описание товара 2",
      },
      {
        id: 7,
        image:
          ["https://ritadrinks.com/images/stories/RITA-banner-fruit--500ml.jpg"],
        title: "Товар 1",
        manufacturer: "Производитель 1",
        price: "100",
        description: "Описание товара 1",
      },
      {
        id: 8,
        image:
          ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReetdQ6OxI4fFmUJmYxQ_F8hsTFD_EJFxMjbH70LYp8em6WcUhcEPpqf1rgVEIrc5_tdc&usqp=CAU"],
        title: "Товар 2",
        manufacturer: "Производитель 2",
        price: "130",
        description: "Описание товара 2",
      },
      {
        id: 9,
        image:
          ["https://ritadrinks.com/images/stories/RITA-banner-fruit--500ml.jpg"],
        title: "Товар 1",
        manufacturer: "Производитель 1",
        price: "100",
        description: "Описание товара 1",
      },
      {
        id: 10,
        image:
          ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReetdQ6OxI4fFmUJmYxQ_F8hsTFD_EJFxMjbH70LYp8em6WcUhcEPpqf1rgVEIrc5_tdc&usqp=CAU"],
        title: "Товар 2",
        manufacturer: "Производитель 2",
        price: "130",
        description: "Описание товара 2",
      },
    ],
    activeProduct: null,
  },
  reducers: {
    setActiveProduct: (state, action) => {
      state.activeProduct = action.payload;
    },
  },
});

export const { setActiveProduct } = productSlice.actions;

export default productSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Асинхронная операция для получения информации о продукте (например, из API)
// export const fetchProduct = createAsyncThunk(
//   "product/fetchProduct",
//   async (productId) => {
//     // Здесь используем fetch или axios для запроса к API
//     const response = await fetch(`https://api.example.com/products/${productId}`);
//     const data = await response.json();
//     return data; // Вернуть данные о продукте
//   }
// );

// export const productSlice = createSlice({
//   name: "product",
//   initialState: {
//     activeProduct: null,
//     status: "idle", // idle, loading, succeeded, failed
//     error: null,
//   },
//   reducers: {
//     setActiveProduct: (state, action) => {
//       state.activeProduct = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProduct.pending, (state) => {
//         state.status = "loading"; // Запрос в процессе
//       })
//       .addCase(fetchProduct.fulfilled, (state, action) => {
//         state.status = "succeeded"; // Запрос успешен
//         state.activeProduct = action.payload; // Данные о продукте
//       })
//       .addCase(fetchProduct.rejected, (state, action) => {
//         state.status = "failed"; // Запрос неудачен
//         state.error = action.error.message; // Сообщение об ошибке
//       });
//   },
// });

// export const { setActiveProduct } = productSlice.actions;

// export default productSlice.reducer;

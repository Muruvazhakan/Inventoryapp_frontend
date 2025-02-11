import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stock: {
    stockidcount: 1000,
    stockid: "",
    stocklist: [],
    stockdate: "",
    allStockAddedList: [],
    stockHistoryData: [],
    allStockList: [],
    allProfitStockList: [],
    allStockSalesList: [],
    allStockData: [],
    saleslist: [],
    productIdList: [],
    clientList: [],
    salesStockHistoryData: [],
    totalamt: 0,
    totalsalesamt: 0,
    totalprofiramt: 0,
    allstockstotalamt: 0,
    totalsubamt: 0,
    alladdedstockstotalamt: 0,
    allstockssalestotalamt: 0,
    availablestock: 0,
    editprodid: false,
    salestockid: "",
    salestockidcount: 1000,
    salestockdate: "",
    isEditStock: false,
    segregatedMonthData: {},
    id: 1,
    productid: "",
    desc: "",
    quantity: 0,
    rate: 0,
    salerate: 0,
    amount: 0,
    clientid: "",
    clientAdd: "",
    clientName: "",
    clientPhno: "",
  },
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    updateStock: (state, action) => {
      state.stock = { ...state.stock, ...action.payload };
    },
  },
});

export const { updateStock } = stockSlice.actions;

export default stockSlice.reducer;

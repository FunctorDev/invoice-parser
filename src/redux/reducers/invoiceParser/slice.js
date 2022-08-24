import { createSlice } from "@reduxjs/toolkit";
import * as InvoiceParserActions from "./actions";
import { assoc, modify, path, pathEq, reject } from "ramda";

const initialState = {
  invoices: [],
};

const invoiceParserSlice = createSlice({
  name: "invoiceParser",
  initialState,
  reducers: {
    removeInvoice: (state, action) => {
      const uid = path(["payload", "uid"], action);

      return modify("invoices", reject(pathEq(["file", "uid"], uid)), state);
    },
  },
  extraReducers: {
    [InvoiceParserActions.documentParser.fulfilled.type]: (state, action) => {
      const payload = action.payload;

      return assoc("invoices", payload, state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = invoiceParserSlice;

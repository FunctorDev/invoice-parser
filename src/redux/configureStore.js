import { configureStore } from "@reduxjs/toolkit";

import {
  reducer as InvoiceParserReducer,
  sliceKey as InvoiceParserSliceKey,
} from "./reducers/invoiceParser";

const configure = () => {
  const store = configureStore({
    reducer: {
      [InvoiceParserSliceKey]: InvoiceParserReducer,
    },
  });

  return store;
};

export default configure;

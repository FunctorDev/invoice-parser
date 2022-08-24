import { createSelector } from "@reduxjs/toolkit";
import { map, modifyPath, pipe, propOr } from "ramda";
import { JobDomain } from "../../../domains/job.domain";

export const selectInvoiceParser = (state) => state.invoiceParser;

export const selectInvoices = createSelector(
  selectInvoiceParser,
  (invoiceParser) =>
    pipe(
      propOr([], "invoices"),
      map(modifyPath(["document", "job"], (job) => new JobDomain(job)))
    )(invoiceParser)
);

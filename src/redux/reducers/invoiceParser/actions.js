import { createAsyncThunk } from "@reduxjs/toolkit";
import PdfCoRequest from "../../../api/PdfCoRequest";
import { assoc, omit, pipe, propOr } from "ramda";

const DEFAULT_TEMPLATE_ID = "1";

const sleep = (n) => new Promise((resolve) => setTimeout(n, resolve, n));

export const checkIfJobIsCompleted = createAsyncThunk(
  "invoiceParser/CHECK_IF_JOB_IS_COMPLETED",
  async ({ jobId, resultFileUrlJson }, thunkAPI) => {
    const checkIfJobIsCompletedResponse =
      await PdfCoRequest.checkIfJobIsCompleted({
        jobId,
      });

    if (checkIfJobIsCompletedResponse.status === "working") {
      await sleep(3000);

      return thunkAPI.dispatch(checkIfJobIsCompleted(jobId));
    }

    if (checkIfJobIsCompletedResponse.status === "failed") {
      const message = propOr(
        "Internal error",
        "message",
        checkIfJobIsCompletedResponse
      );

      throw new Error(message);
    }

    if (checkIfJobIsCompletedResponse.status === "success") {
      return checkIfJobIsCompletedResponse;
    }
  }
);

export const documentUrlParse = createAsyncThunk(
  "invoiceParser/DOCUMENT_URL_PARSER",
  async ({ url }, thunkAPI) => {
    const documentParserResponse = await PdfCoRequest.documentUrlParser({
      async: true,
      encrypt: "false",
      inline: "true",
      outputFormat: "JSON",
      password: "",
      profiles: "",
      templateId: DEFAULT_TEMPLATE_ID,
      url,
    });

    const checkIfJobIsCompletedResponse = await thunkAPI
      .dispatch(
        checkIfJobIsCompleted({
          jobId: documentParserResponse.jobId,
          resultFileUrlJson: documentParserResponse.url,
        })
      )
      .unwrap();

    return {
      job: checkIfJobIsCompletedResponse,
    };
  }
);

export const documentFileParser = createAsyncThunk(
  "invoiceParser/DOCUMENT_FILE_PARSER",
  async (file, thunkAPI) => {
    const getPreSignedUrlResponse = await PdfCoRequest.getPreSignedUrl({
      name: file.name,
      encrypt: true,
    });

    await PdfCoRequest.putFileFromUrl(
      getPreSignedUrlResponse.presignedUrl,
      file.originFileObj,
      {
        customConfig: {
          noToken: true,
        },
      }
    );

    const documentUrlParseResponse = await thunkAPI
      .dispatch(
        documentUrlParse({
          url: getPreSignedUrlResponse.url,
        })
      )
      .unwrap();

    return {
      document: documentUrlParseResponse,
      file: pipe(omit(["originFileObj"]), assoc("status", "success"))(file),
    };
  }
);

export const documentParser = createAsyncThunk(
  "invoiceParser/DOCUMENT_PARSER",
  async ({ url, files }, thunkAPI) => {
    try {
      if (Array.isArray(files)) {
        return await Promise.all(
          files.map((file) =>
            thunkAPI.dispatch(documentFileParser(file)).unwrap()
          )
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

import Request from "./Request";

const DEFAULT_TEMPLATE_ID = 1;

const PdfCoRequest = {
  getPreSignedUrl(params) {
    return Request().get("/file/upload/get-presigned-url", params);
  },

  putFileFromUrl(url, data) {
    return Request().custom({
      url,
      data,
    });
  },

  checkIfJobIsCompleted(data) {
    return Request().post("/job/check", data);
  },

  async documentParser({ url, file }) {
    if (file) {
      const getPreSignedUrlResponse = await this.getPreSignedUrl({
        name: file.name,
        encrypt: true,
      });

      await this.putFileFromUrl(getPreSignedUrlResponse.presignedUrl, file);

      const documentParserResponse = await Request.post("/pdf/documentparser", {
        async: true,
        encrypt: false,
        inline: true,
        outputFormat: "JSON",
        password: "",
        profiles: "",
        templateId: DEFAULT_TEMPLATE_ID,
        url: getPreSignedUrlResponse.url,
      });

      const checkIfJobIsCompletedResponse = await this.checkIfJobIsCompleted({
        jobId: documentParserResponse.jobId,
      });
    }

    return null;
  },
};

export default PdfCoRequest;

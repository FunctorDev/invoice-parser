import Request from "./Request";

const PdfCoRequest = {
  getPreSignedUrl(params) {
    return Request().get("/file/upload/get-presigned-url", params);
  },

  putFileFromUrl(url, data, options = {}) {
    return Request().custom({
      method: 'PUT',
      url,
      data,
      ...options,
    });
  },

  checkIfJobIsCompleted(data) {
    return Request().post("/job/check", data);
  },

  documentUrlParser(data) {
    return Request().post("/pdf/documentparser", data);
  },
};

export default PdfCoRequest;

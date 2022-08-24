export const customRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess(null, file);
  }, 200);
};

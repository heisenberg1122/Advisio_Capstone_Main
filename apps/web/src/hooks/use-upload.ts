export const useUpload = () => {
  return {
    uploadFile: async (file: File) => {
      return { url: "" };
    },
    isUploading: false,
  };
};

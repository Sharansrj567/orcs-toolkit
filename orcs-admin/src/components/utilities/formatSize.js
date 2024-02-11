export const formatBytes = (size) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (Math.floor(size) == 0) return "0 Bytes";
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return parseFloat((size / Math.pow(1024, i)).toFixed(1)) + " " + sizes[i];
};

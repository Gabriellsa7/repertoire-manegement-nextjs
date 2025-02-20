const useFileDownload = () => {
  const downloadFile = async (musicId: string, openInBrowser = false) => {
    try {
      const response = await fetch(
        `http://localhost:8080/music/${musicId}/download-pdf`
      );

      if (!response.ok) throw new Error("Error Download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      if (openInBrowser) {
        window.open(url, "_blank");
      } else {
        const link = document.createElement("a");
        link.href = url;
        link.download = "music-lyrics.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error(error);
      alert("Error Download file");
    }
  };

  return { downloadFile };
};

export default useFileDownload;

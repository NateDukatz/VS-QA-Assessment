/* created this utility to download the case study with its uri as 
a workaround for navigatiing to the new tab and clicking the download button */
const DownloadUri = {
  download(uri: string, name: string) : void {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default DownloadUri;
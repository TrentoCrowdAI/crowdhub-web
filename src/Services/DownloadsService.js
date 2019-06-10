import {getOptionsWithAuthorizationHeadersIfSignedIn} from "./rest/utils";

export default {
  async downloadAndSave (link, name) {
    const content = await this.download(link);
    this.save(content, name);
  },

  async download (link) {
    const res = await fetch(link, getOptionsWithAuthorizationHeadersIfSignedIn({}));
    return await res.text();
  },

  save(content, name) {
    const linkSource = `data:application/pdf;base64,${btoa(content)}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
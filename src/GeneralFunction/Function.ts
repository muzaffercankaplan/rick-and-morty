export const convertUrlsToIds = (urls: string[]) =>
  urls.map((url: any) => parseInt(url.match(/\d+$/)[0]));

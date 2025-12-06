export function getSiteURL(): string {
  let url: string = "http://localhost:3001/";

  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;

  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;

  return url;
}

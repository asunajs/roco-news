import iconv from "iconv-lite";

export async function getGBKHtml(url: string) {
  return iconv
    .decode(
      Buffer.from(await fetch(url).then((res) => res.arrayBuffer())),
      "GBK"
    )
    .toString();
}

import * as cheerio from "cheerio";
import { getGBKHtml } from "./req";

const baseUrl = `https://roco.qq.com`;

export async function 获取更新列表() {
  const $ = cheerio.load(
    await getGBKHtml(
      `${baseUrl}/webplat/info/news_version3/397/11016/11018/m8583/list_1.shtml`
    )
  );
  return $("ul.news-list li")
    .filter((i) => i < 3)
    .map((_, li) => {
      const $li = $(li);
      return {
        title: $li.find("font").text(),
        url: $li.find("a").attr("href"),
      };
    })
    .toArray();
}

export async function 获取最新新闻() {
  return await getGBKHtml(`${baseUrl}${(await 获取更新列表())[0].url}`);
}

export async function 获取系别禁赛() {
  const $ = cheerio.load(await 获取最新新闻());
  const $tt = $('p:contains("系别排位赛本周参与系别及禁赛宠物更新")');
  let news = $tt.next().text();
  news += "\n\n" + $tt.next().next().text();
  return news;
}

export async function 获取天梯禁赛() {
  const $ = cheerio.load(await 获取最新新闻());
  const $tt = $('p:contains("本周天梯禁赛")');
  let news = $tt.next().text();
  news += "\n\n" + $tt.next().next().text();
  return news;
}

export async function 获取游戏收益() {
  const $ = cheerio.load(await 获取最新新闻());
  const $sy = $('p:contains("游戏内收益提示")');
  const news = $sy.nextAll().text().replaceAll("；", "\n\n");
  return news;
}

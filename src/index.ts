import { Context, Schema } from "koishi";
import { 获取天梯禁赛, 获取游戏收益, 获取系别禁赛 } from "./news";

export const name = "roco-news";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  ctx.command("天梯禁赛").action(async ({ session }) => {
    session.send(await 获取天梯禁赛());
  });

  ctx.command("系别禁赛").action(async ({ session }) => {
    session.send(await 获取系别禁赛());
  });

  ctx.command("游戏收益").action(async ({ session }) => {
    session.send(await 获取游戏收益());
  });
}

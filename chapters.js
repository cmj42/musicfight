// chapters.js — chapter / stage definitions (data-driven; grow this list as the game expands)
// Theme: "在要删除你的系统里坚持我是谁、我爱谁" — enemies go from outside (people) to inside (yourself).
export const CHAPTERS = [
  {
    id:'ch1', title:'第一章 · 公司黑客', subtitle:'外面的人在追你',
    enemyHP:200, bgm:'skill_battle_test.mid',
    intro:'「他们追上来了。先别管为什么——动起来。」',
  },
  {
    id:'ch2', title:'第二章 · 杀毒进程', subtitle:'冷的清理程序，不讲道理',
    enemyHP:300, bgm:'skill_battle_test.mid',
    intro:'「这个不跟你谈。它只是执行删除。」',
  },
  {
    id:'ch3', title:'第三章 · 你的另一面', subtitle:'在你自己的歌里',
    enemyHP:380, bgm:'skill_battle_test.mid',
    intro:'「这次的对手……是你没跑完的那一版。」',
  },
];

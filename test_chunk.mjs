// test_chunk.mjs — 从 index.html 提取纯切分函数并用 Node 断言。
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import assert from "node:assert";

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, "index.html"), "utf-8");

// 提取标记之间的纯函数源码
const m = html.match(/\/\/ ===== 纯函数[\s\S]*?\/\/ ===== CHUNK_LOGIC_END =====/);
assert.ok(m, "未能在 index.html 中找到切分函数标记 CHUNK_LOGIC");

// 在沙箱中执行，仅暴露 chunkText
const factory = new Function(`${m[0]}\nreturn chunkText;`);
const chunkText = factory();

// --- 用例 ---
const text = "一二三四五六七八九十".repeat(6); // 60 字
const chunks = chunkText(text, 20, 5);

assert.ok(chunks.length > 1, "应切出多块");
// 每块长度 <= size
for (const c of chunks) assert.ok(c.text.length <= 20, "块长度不应超过 chunk_size");
// 相邻块应衔接：下一块起点 = 上一块起点 + (size - overlap)
assert.strictEqual(chunks[1].start, chunks[0].start + 15);
// 重叠区域：块0的末尾 overlap 个字符应与块1开头 overlap 个字符一致
const ov0 = chunks[0].text.slice(-5);
const ov1 = chunks[1].text.slice(0, 5);
assert.strictEqual(ov0, ov1, "相邻块的重叠内容应一致");

// 空文本
assert.deepStrictEqual(chunkText("", 20, 5), [], "空文本应返回空数组");

// 参数校验
assert.throws(() => chunkText("abc", 0, 5), /正整数/);
assert.throws(() => chunkText("abc", 10, 10), /overlap 必须小于/);
assert.throws(() => chunkText("abc", 10, -1), /overlap 必须/);

// 短文本单块
assert.strictEqual(chunkText("短", 100, 10).length, 1);

console.log(`OK: chunk-visualizer-web 全部 ${chunks.length} 个用例通过`);

// Math.Random関数の高速実装 
// 参考:https://zenn.dev/ame_x/articles/b3ada5021ed174
let seed = Date.now();
const MaxInt64 = Number.MAX_SAFE_INTEGER;
function min(a,b){return a<b?a:b};
function Xorshift(){seed^=seed<<7;seed^=seed>>>9;return min(1,Math.abs(seed)/2E9)};

// メルセンヌ・ツイスタのアルゴリズム
function next(x, a, c, m) {
  return (x * a + c) % m;
}

// 乱数生成関数
function MersenneRandom(seed) {
  // シード値の生成
  var x = seed || (Xorshift() * MaxInt64);
  var s0 = Xorshift() * MaxInt64;
  var s1 = Xorshift() * MaxInt64;
  var s2 = Xorshift() * MaxInt64;
  var s3 = Xorshift() * MaxInt64;

  // 攪拌処理
  for (var i = 0; i < 624; i++) {
    // 乱数を生成
    var r64 = Xorshift() * MaxInt64;

    // シード値を更新
    x = next(x, s0, s1, MaxInt64);

    // シフトレジスタを更新
    s0 = s1;
    s1 = s2;
    s2 = s3;
    s3 = r64;
  }

  // 0 以上 1 未満の乱数を生成
  return x / MaxInt64;
}



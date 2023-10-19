// メルセンヌ・ツイスタのアルゴリズム
function next(x, a, c, m) {
  return (x * a + c) % m;
}

// 乱数生成関数
function MersenneRandom(seed) {
  // シード値の生成
  var x = seed || Math.random() * 2**63 - 1;
  var s = [
    Math.random() * 2**63 - 1,
    Math.random() * 2**63 - 1,
    Math.random() * 2**63 - 1,
    Math.random() * 2**63 - 1,
  ];

  // 攪拌処理
  for (var i = 0; i < 624; i++) {
    // 暗号化された乱数を生成
    var r32 = Math.random() * 2**31 - 1;

    // シード値を更新
    x = next(x, s[0], s[1], 2**63 - 1);
    s.push(x);
    s.shift();

    // シフトレジスタを更新
    s[0] = r32;
  }

  // 0 以上 1 未満の乱数を生成
  return x / (2**63 - 1);
}

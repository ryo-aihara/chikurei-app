// === 計算部分 ===
document.getElementById("calcBtn").addEventListener("click", () => {
  const full = +document.getElementById("fullDollies").value || 0; // 正ドーリー台数
  const partialBoxes = +document.getElementById("partialBoxes").value || 0; // 端数ドーリー箱数
  const sheetsPerBox = +document.getElementById("sheetsPerBox").value || 2; // 1箱あたりの枚数

  const BOXES_PER_DOLLY = 24;          // 1ドーリーに24箱
  const SHEETS_PER_DOLLY = BOXES_PER_DOLLY * sheetsPerBox; // 48枚（2枚×24箱）
  const SHEETS_PER_CARRIER = 20;       // 1クールキャリア = 20枚
  const CARRIERS_PER_CART = 20;        // 1カゴ車 = 20クールキャリア
  const SHEETS_PER_CART = SHEETS_PER_CARRIER * CARRIERS_PER_CART; // 400枚

  // 合計枚数
  const totalSheets = (full * SHEETS_PER_DOLLY) + (partialBoxes * sheetsPerBox);

  // 分解
  const carts = Math.floor(totalSheets / SHEETS_PER_CART);
  const remAfterCarts = totalSheets % SHEETS_PER_CART;
  const carriers = Math.floor(remAfterCarts / SHEETS_PER_CARRIER);
  const sheets = remAfterCarts % SHEETS_PER_CARRIER;

  // 出力
  document.getElementById("result").innerHTML = `
    <div><strong>合計：</strong>${totalSheets.toLocaleString()} 枚</div>
    <div><strong>内訳：</strong>${carts} カゴ車 ＋ ${carriers} クールキャリア ＋ ${sheets} 枚</div>
  `;
});

// === 保存機能 ===
document.getElementById("savePrefs").addEventListener("click", () => {
  localStorage.setItem("prefSheets", document.getElementById("prefSheets").value);
  const msg = document.getElementById("saveMsg");
  msg.textContent = "保存しました";
  setTimeout(()=>msg.textContent="",1500);
});

document.getElementById("saveNotes").addEventListener("click", () => {
  localStorage.setItem("notes", document.getElementById("notes").value);
  const msg = document.getElementById("notesMsg");
  msg.textContent = "保存しました";
  setTimeout(()=>msg.textContent="",1500);
});

// === 復元 ===
(function restore(){
  const pref = localStorage.getItem("prefSheets");
  if (pref) document.getElementById("sheetsPerBox").value = pref;
  const notes = localStorage.getItem("notes");
  if (notes) document.getElementById("notes").value = notes;
})();

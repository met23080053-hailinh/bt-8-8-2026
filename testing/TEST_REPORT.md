# TEST REPORT - AURA LUXE E-Commerce System
---
 
## EXECUTIVE SUMMARY
 
### Lần chạy đầu tiên
| Chỉ số | Kết quả |
|-------|---------|
| **Tổng Test Cases** | 20 |
| **✅ Passed** | 18 / 20 |
| **❌ Failed** | 2 / 20 |
| **⏭️ Skipped** | 0 / 20 |
| **Pass Rate** | 90% |
| **Critical Bugs** | 2 |
| **High Bugs** | 0 |
| **Medium Bugs** | 1 (phát hiện thêm qua phân tích code, không nằm trong 20 case nhưng đã fix) |
| **Low Bugs** | 0 |
---
 
## 1. DETAILED TEST RESULTS
 
### Normal Flow Tests (10 cases)
 
#### ✅ TC_SEARCH_001: Tìm kiếm sản phẩm
- **Kết quả**: PASS
- **Mô tả**: Nhập "blazer" vào ô tìm kiếm → `handleSearchAndFilter()` lọc đúng 1/8 sản phẩm khớp tên ("Oversized Wool Blazer"), cập nhật đúng nhãn "Hiển thị 1 sản phẩm".
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_FILTER_001: Lọc theo danh mục
- **Kết quả**: PASS
- **Mô tả**: Chọn danh mục "Footwear" → chỉ hiển thị đúng 1 sản phẩm thuộc danh mục này (Chunky Leather Loafers).
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_CART_001: Thêm vào giỏ
- **Kết quả**: PASS
- **Mô tả**: Mở modal sản phẩm #1, thêm biến thể mặc định vào giỏ → badge giỏ hàng = 1, `state.cart` có 1 dòng.
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_CART_002: Tăng số lượng
- **Kết quả**: PASS
- **Mô tả**: Gọi `updateCartQty(sku, +1)` trên item đã có trong giỏ → số lượng tăng đúng từ 1 lên 2.
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_VOUCHER_001: Áp dụng voucher hợp lệ
- **Kết quả**: PASS
- **Mô tả**: Áp mã "GENZ10" (giảm 10%) cho giỏ có Blazer 2.450.000đ → `appliedVoucher.code === 'GENZ10'`, dòng giảm giá hiển thị khác 0.
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_SHIPPING_002: Tính phí ship
- **Kết quả**: PASS
- **Mô tả**: Chọn tỉnh "Hà Nội" → `calculateShippingFee()` set đúng phí ship 35.000đ theo bảng giá GHN mock.
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_AUTH_001: Đăng nhập
- **Kết quả**: PASS
- **Mô tả**: Submit form đăng nhập Email → `handleLogin()` tạo user "khach" (lấy từ phần trước @ của email), hiển thị đúng trên header.
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_LOYALTY_001: Tích điểm
- **Kết quả**: PASS
- **Mô tả**: Đăng nhập (150 điểm mặc định) → thêm sản phẩm vào giỏ → checkout thành công → điểm tăng đúng theo công thức `floor(finalVND / 50000)`.
- **Ghi chú**: Không phát hiện lỗi (đã re-test lại sau khi fix Bug #1 để đảm bảo điểm được tính trên đúng finalVND đã bao gồm giảm giá).
#### ✅ TC_I18N_001: Đổi ngôn ngữ
- **Kết quả**: PASS
- **Mô tả**: Gọi `setLanguage('EN')` → tiêu đề catalog đổi đúng từ "Bộ Sưu Tập Mới" sang "New Collection".
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_CURRENCY_001: Đổi tiền tệ
- **Kết quả**: PASS
- **Mô tả**: Gọi `setCurrency('USD')` rồi render lại danh sách sản phẩm → giá hiển thị đổi đúng định dạng "$xx.xx".
- **Ghi chú**: Không phát hiện lỗi.
---
 
### Invalid/Empty Data Tests (2 cases)
 
#### ✅ TC_VOUCHER_002: Voucher không hợp lệ
- **Kết quả**: PASS
- **Mô tả**: Nhập mã "KHONGTONTAI" → hệ thống từ chối, hiện alert "Mã giảm giá không hợp lệ!", `appliedVoucher` giữ nguyên `null`.
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_CHECKOUT_002: Checkout thiếu dữ liệu
- **Kết quả**: PASS
- **Mô tả**: Để trống Họ tên + SĐT rồi bấm "Xác Nhận Đặt Hàng" → hệ thống chặn, hiện alert yêu cầu nhập đủ, không tạo đơn hàng mới.
- **Ghi chú**: Không phát hiện lỗi.
---
 
### Boundary Cases (2 cases)
 
#### ✅ TC_CART_003: Vượt quá tồn kho
- **Kết quả**: PASS
- **Mô tả**: Biến thể "BLZ-BLK-L" chỉ còn tồn kho = 2. Thêm vào giỏ 2 lần (đạt giới hạn), lần thêm thứ 3 bị chặn, hiện alert "Số lượng vượt quá tồn kho khả dụng!", số lượng giữ nguyên = 2.
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_SHIPPING_001: Miễn phí ship (>=2M)
- **Kết quả**: PASS
- **Mô tả**: Thêm Blazer (2.450.000đ, tự đủ điều kiện >= 2.000.000đ) → phí ship hiển thị đúng "0 ₫".
- **Ghi chú**: Không phát hiện lỗi (đã re-test đảm bảo mốc freeship cũng được áp dụng đúng ở bước lưu đơn hàng thật — xem Bug #1).
---
 
### Edge Cases (2 cases)
 
#### ✅ TC_PRODUCT_001: Biến thể hết hàng
- **Kết quả**: PASS
- **Mô tả**: Chọn biến thể "Kem / L" của Blazer (stock = 0) → nút "Thêm vào giỏ" bị disable, nhãn tồn kho đổi thành "Tạm Hết Hàng Biến Thể Này!".
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_CART_004: Xóa item khi qty=0
- **Kết quả**: PASS
- **Mô tả**: Giảm số lượng 1 → 0 bằng `updateCartQty(sku, -1)` → item tự động bị loại khỏi `state.cart`.
- **Ghi chú**: Không phát hiện lỗi.
---
 
### Error Handling Tests (3 cases)
 
#### ✅ TC_CHECKOUT_001: Checkout giỏ trống
- **Kết quả**: PASS
- **Mô tả**: Gọi `processCheckout()` khi giỏ hàng rỗng → hiện alert "Giỏ hàng đang trống!", không tạo đơn hàng, không crash.
- **Ghi chú**: Không phát hiện lỗi.
#### ✅ TC_LOYALTY_002: Discount thành viên
- **Kết quả**: PASS
- **Mô tả**: User hạng Vàng (250 điểm, >=200) → giỏ hàng tự động cộng thêm giảm giá 5% mà không cần nhập mã voucher.
- **Ghi chú**: Không phát hiện lỗi ở bước hiển thị. **Tuy nhiên đây chính là dữ liệu nghiệp vụ đã hé lộ Bug #1** (số tiền hiển thị đúng nhưng số tiền *lưu vào đơn hàng* khi checkout lại sai — xem chi tiết Bug #1).
#### ✅ TC_CHECKOUT_003: Lưu đơn vào Admin
- **Kết quả**: PASS (lần đầu: ❌ FAIL)
- **Mô tả**: Thêm Blazer, áp voucher GENZ10 (-10%, đủ điều kiện freeship) → tổng hiển thị "2.205.000 ₫" → checkout → so khớp với `totalVND` thực lưu trong `state.orders[0]`.
- **Ghi chú**: **Lần chạy đầu tiên FAIL** vì số tiền lưu vào đơn hàng (2.475.000đ) khác với số tiền khách nhìn thấy (2.205.000đ) → đây là **Bug #1 (Critical)**, đã fix và re-test PASS (2.205.000đ = 2.205.000đ). Xem mục 2 & 6.
---
 
### Khác (1 case)
 
#### ✅ TC_ADMIN_001: Cập nhật stock
- **Kết quả**: PASS (lần đầu: ❌ FAIL)
- **Mô tả**: Bấm "+5 Kho" cho SKU "BLZ-BLK-L" → tồn kho tăng đúng +5. Bấm tiếp nút "Hết Hàng" (đưa tồn kho về 0).
- **Ghi chú**: **Lần chạy đầu tiên FAIL** — bấm nút "Hết Hàng" làm ứng dụng crash với lỗi `ReferenceError: item is not defined` → đây là **Bug #2 (Critical)**, đã fix và re-test PASS (tồn kho về đúng 0, không còn lỗi JS). Xem mục 2 & 6.
---
 
## 2. BUG SUMMARY
 
### Tổng số lỗi: 3 (2 Critical phát hiện qua 20 test case + 1 Medium phát hiện qua phân tích code sâu hơn)
 
### Bug #1
**ID**: BUG-001
**Tiêu đề**: Tổng tiền đơn hàng lưu vào hệ thống không khớp với tổng tiền hiển thị cho khách (bỏ sót giảm giá & freeship)
**Severity**: 🔴 Critical
**Test Case**: TC_CHECKOUT_003 (phát hiện), liên quan TC_LOYALTY_002, TC_VOUCHER_001, TC_SHIPPING_001
 
**Bước tái hiện**:
1. Thêm "Oversized Wool Blazer" (2.450.000đ) vào giỏ — đủ điều kiện freeship (>=2.000.000đ).
2. Áp mã voucher "GENZ10" (-10%). Giỏ hàng hiển thị đúng: Tạm tính 2.450.000đ, Ship 0đ (freeship), Giảm giá -245.000đ → **Tổng thanh toán: 2.205.000đ**.
3. Điền tên/SĐT, bấm "Xác Nhận Đặt Hàng COD".
4. Vào Admin Portal → xem đơn hàng vừa tạo.
**Kết quả thực tế**:
Đơn hàng được lưu với `totalVND = 2.475.000đ` (= 2.450.000đ tiền hàng + 25.000đ phí ship mặc định), **hoàn toàn bỏ qua** giảm giá voucher (-245.000đ) lẫn mốc miễn phí ship. Chênh lệch 270.000đ so với số tiền khách đã thấy và đồng ý thanh toán.
 
**Kết quả mong đợi**:
Số tiền lưu vào đơn hàng (và số tiền tài xế COD thu tại nhà) phải khớp 100% với số tiền hiển thị trong giỏ hàng lúc khách bấm đặt hàng.
 
**Root Cause**:
Hàm `renderCart()` (dòng ~966-981 bản gốc) và hàm `processCheckout()` (dòng ~996-997 bản gốc) **tính tổng tiền bằng 2 công thức độc lập, không dùng chung logic**:
```js
// processCheckout() - bản lỗi
const subtotalVND = state.cart.reduce((sum, i) => sum + (i.priceVND * i.qty), 0);
const finalVND = subtotalVND + state.shippingFeeVND; // <-- thiếu discountVND, thiếu check freeship >=2.000.000
```
Trong khi `renderCart()` tính đúng đủ 3 thành phần: `subtotalVND - discountVND + shippingVND` (đã áp mốc freeship). Khi 2 nơi tính tiền bị "trôi" (code duplication không đồng bộ), phần thanh toán thực tế (checkout) đã không được cập nhật theo cùng logic với phần hiển thị.
 
**Fix**:
Gộp toàn bộ công thức tính tiền vào **1 hàm dùng chung duy nhất** `computeCartTotals()`, cả `renderCart()` và `processCheckout()` đều gọi hàm này để đảm bảo không bao giờ lệch nhau nữa:
```js
function computeCartTotals() {
  const subtotalVND = state.cart.reduce((sum, i) => sum + (i.priceVND * i.qty), 0);
  let discountVND = 0;
  if (state.appliedVoucher) {
    discountVND = (typeof state.appliedVoucher.discountValue === 'number' && state.appliedVoucher.discountValue < 1)
      ? subtotalVND * state.appliedVoucher.discountValue
      : state.appliedVoucher.discountValue;
  }
  if (state.currentUser) {
    if (state.currentUser.points >= 500) discountVND += subtotalVND * 0.10;
    else if (state.currentUser.points >= 200) discountVND += subtotalVND * 0.05;
  }
  let shippingVND = state.cart.length > 0 ? state.shippingFeeVND : 0;
  if (subtotalVND >= 2000000) shippingVND = 0;
  const finalVND = Math.max(0, subtotalVND - discountVND + shippingVND);
  return { subtotalVND, discountVND, shippingVND, finalVND };
}
```
`processCheckout()` giờ chỉ còn: `const { finalVND } = computeCartTotals();`
 
**Status**: ✅ Verified (re-test TC_CHECKOUT_003: PASS — tổng lưu đơn = tổng hiển thị = 2.205.000đ)
 
---
 
### Bug #2
**ID**: BUG-002
**Tiêu đề**: Nút "Hết Hàng" trong Admin Portal làm ứng dụng crash (ReferenceError), không set được tồn kho về 0
**Severity**: 🔴 Critical
**Test Case**: TC_ADMIN_001
 
**Bước tái hiện**:
1. Vào Admin Portal → bảng "Quản Lý Tồn Kho Sản Phẩm".
2. Chọn 1 SKU bất kỳ còn hàng (ví dụ BLZ-BLK-L).
3. Bấm nút "Hết Hàng" ở cột Thao tác.
**Kết quả thực tế**:
Trình duyệt ném lỗi `Uncaught ReferenceError: item is not defined` ngay khi click. Hàm `updateStockByAdmin()` không được gọi, tồn kho **không** đổi.
 
**Kết quả mong đợi**:
Tồn kho của SKU đó phải được set về 0 (hết hàng), bảng tồn kho cập nhật lại.
 
**Root Cause**:
Trong `renderAdminDashboard()`, nút được sinh bằng template literal:
```js
<button onclick="updateStockByAdmin('${item.sku}', -item.stock)">Hết Hàng</button>
```
`${item.sku}` được nội suy đúng (nằm trong `${...}`), nhưng `-item.stock` **nằm ngoài `${...}`** nên bị in ra như **chuỗi JS thô** vào thuộc tính `onclick`. Khi trình duyệt thực thi thuộc tính `onclick` này, nó chạy đoạn mã `updateStockByAdmin('BLZ-BLK-L', -item.stock)` ở phạm vi global — nhưng biến `item` (biến của callback `.map(item => ...)`) không tồn tại ở phạm vi global, gây lỗi `ReferenceError`.
 
**Fix**:
Bọc `-item.stock` vào `${...}` để giá trị số được nội suy ngay lúc tạo HTML (đúng như `${item.sku}` đã làm):
```js
<button onclick="updateStockByAdmin('${item.sku}', ${-item.stock})">Hết Hàng</button>
```
 
**Status**: ✅ Verified (re-test TC_ADMIN_001: PASS — click "Hết Hàng" không còn lỗi, tồn kho về đúng 0)
 
---
 
### Bug #3
**ID**: BUG-003
**Tiêu đề**: Voucher "LUXURY50" không kiểm tra điều kiện đơn tối thiểu 1.000.000đ như quảng cáo
**Severity**: 🟡 Medium (tiềm ẩn — chưa gây lỗi thực tế với bộ dữ liệu sản phẩm hiện tại vì mọi sản phẩm đều >1.000.000đ, nhưng là lỗ hổng logic nghiêm trọng nếu thêm sản phẩm giá rẻ)
**Test Case**: Không nằm trong 20 test case ban đầu — phát hiện qua đọc kỹ code (banner khuyến mãi ghi rõ điều kiện, nhưng `applyVoucher()` không kiểm tra) và xác minh lại bằng script kiểm thử bổ sung.
 
**Bước tái hiện**:
1. Banner khuyến mãi trên trang chủ ghi: *"Giảm 50.000 ₫ Đơn Từ 1 Triệu"* — mã LUXURY50.
2. Thêm 1 sản phẩm bất kỳ có giá dưới 1.000.000đ vào giỏ (nếu có), hoặc test trực tiếp hàm `applyVoucher()` với giỏ hàng giả lập 300.000đ.
3. Áp mã LUXURY50.
**Kết quả thực tế**:
Mã vẫn được áp dụng thành công (`appliedVoucher.discountValue = 50000`) dù đơn chưa đạt 1.000.000đ như quảng cáo.
 
**Kết quả mong đợi**:
Hệ thống phải từ chối áp mã và thông báo rõ điều kiện tối thiểu khi đơn hàng chưa đạt 1.000.000đ.
 
**Root Cause**:
`applyVoucher()` (dòng ~929-939 bản gốc) chỉ kiểm tra `VOUCHERS[code]` có tồn tại hay không, hoàn toàn thiếu bước kiểm tra `subtotalVND` so với điều kiện tối thiểu ghi trong banner.
 
**Fix**:
Thêm bảng `VOUCHER_MIN_ORDER` và kiểm tra điều kiện tối thiểu trước khi áp mã:
```js
const VOUCHER_MIN_ORDER = { "LUXURY50": 1000000 };
function applyVoucher() {
  const code = document.getElementById('voucher-input').value.trim().toUpperCase();
  const subtotalVND = state.cart.reduce((sum, i) => sum + (i.priceVND * i.qty), 0);
  const minOrder = VOUCHER_MIN_ORDER[code];
  if (VOUCHERS[code] && minOrder && subtotalVND < minOrder) {
    alert(`Mã ${code} chỉ áp dụng cho đơn hàng từ ${minOrder.toLocaleString('vi-VN')} ₫!`);
    state.appliedVoucher = null;
  } else if (VOUCHERS[code]) {
    state.appliedVoucher = { code, discountValue: VOUCHERS[code] };
    alert(`Đã áp dụng mã giảm giá ${code} thành công!`);
  } else {
    alert("Mã giảm giá không hợp lệ!");
    state.appliedVoucher = null;
  }
  renderCart();
}
```
 
**Status**: ✅ Verified (script xác minh: giỏ 300.000đ + mã LUXURY50 → bị từ chối đúng với thông báo điều kiện)
 
---
 
## 3. AI SUPPORT SUMMARY
 
### AI đã hỗ trợ gì:
- ✅ Đọc toàn bộ 1142 dòng code, xác định 8 module chức năng chính
- ✅ Tạo 20 test case chi tiết (đủ 5 loại: Normal/Invalid/Boundary/Edge/Error Handling)
- ✅ Tạo `TEST_PLAN.md` (chiến lược test, lý do chọn framework jsdom thay vì trình duyệt thật do giới hạn sandbox)
- ✅ Viết bộ **Automated Test** bằng Node.js + jsdom (`tests/harness.js`, `tests/run_tests.js`) — chạy được thật, không phải mô tả suông
- ✅ Chạy test, ghi log Pass/Fail thật (`evidence/before_fix/`, `evidence/after_fix/`)
- ✅ Phân tích root cause bằng cách đọc code + viết script xác minh độc lập cho từng bug
- ✅ Sửa code trực tiếp trong file gốc (`AURA_LUXE_fixed.html`) và re-test đến khi Pass 100%
- ✅ Phát hiện thêm 1 bug tiềm ẩn (Bug #3) ngoài phạm vi 20 test case ban đầu qua đọc kỹ logic nghiệp vụ
### AI KHÔNG tự quyết định (đúng theo yêu cầu đề bài):
- Việc chọn 20 test case cụ thể được thiết kế bám sát 100% cấu trúc mà `TEST_REPORT.md` gốc (do người dùng cung cấp) đã liệt kê sẵn (đúng ID, đúng tên, đúng số lượng từng nhóm) — không tự ý thêm/bớt nhóm.
- Ngưỡng Pass Rate mục tiêu (>=90%) giữ nguyên theo đề bài, không tự đổi.
- Mọi số liệu Pass/Fail trong báo cáo này lấy trực tiếp từ log chạy thật của script (`evidence/*/console_output.txt`), không suy đoán.
---
 
## 4. STUDENT DECISION LOG
 
*(Mục này giữ nguyên định dạng gốc; do đây là phiên làm việc với AI Agent chạy test thay vì sinh viên thao tác tay từng bước trên UI, các quyết định "chọn gì / vì sao" được AI ghi lại minh bạch bên dưới thay cho phần điền tay.)*
 
#### Quyết định 1: Chọn test case
- Chạy **cả 20 test case** (không bỏ case nào), vì đề bài yêu cầu tối thiểu 10, và `TEST_REPORT.md` gốc do người dùng cung cấp đã định sẵn khung 20 case — tôn trọng khung đó để kết quả khớp với báo cáo mẫu.
#### Quyết định 2: Test case fail có hợp lệ không?
- TC_CHECKOUT_003 fail lần đầu: **hợp lệ → là bug thật** (BUG-001), vì số tiền lưu đơn sai lệch so với số tiền khách đã xác nhận thanh toán — ảnh hưởng trực tiếp tài chính, không phải do test case viết sai.
- TC_ADMIN_001 fail lần đầu: **hợp lệ → là bug thật** (BUG-002), vì lỗi `ReferenceError` là lỗi cú pháp/logic rõ ràng trong code sinh HTML động, không phải do môi trường test.
#### Quyết định 3: Root cause phân tích
- BUG-001: đọc lại 2 hàm `renderCart()` và `processCheckout()` cạnh nhau → phát hiện 2 công thức tính tiền khác nhau (code duplication không đồng bộ).
- BUG-002: soi kỹ chuỗi `onclick` được sinh ra thực tế (in ra bằng script) → phát hiện `-item.stock` nằm ngoài `${...}` nên bị hiểu là mã JS thô thay vì giá trị số.
- BUG-003: đối chiếu nội dung banner quảng cáo ("Đơn Từ 1 Triệu") với code `applyVoucher()` → phát hiện thiếu điều kiện kiểm tra.
#### Quyết định 4: Fix strategy
- BUG-001: sửa **logic JavaScript** — refactor về 1 hàm tính tiền dùng chung (`computeCartTotals()`) để tránh lệch số liệu về sau, không chỉ vá tạm 1 chỗ.
- BUG-002: sửa **logic JavaScript** trong template literal sinh HTML — thêm dấu `${}` bao đúng biểu thức số.
- BUG-003: sửa **logic JavaScript** — thêm bảng điều kiện `VOUCHER_MIN_ORDER` và bước kiểm tra trước khi áp mã.
- Không có lỗi nào cần sửa HTML structure hay CSS.
#### Quyết định 5: Re-test & verify
- Sau khi fix, chạy lại **toàn bộ 20/20 test case** (không chỉ case đã fail) để đảm bảo fix không phá vỡ chức năng khác (regression).
- Kết quả: **20/20 PASS (100%)** — log lưu tại `evidence/after_fix/console_output.txt`.
- Vì môi trường test là jsdom (không phải trình duyệt thật có localStorage/cache), không cần hard refresh hay clear localStorage thủ công — mỗi test case tự khởi tạo 1 DOM hoàn toàn mới (đảm bảo isolation tương đương "refresh sạch" mỗi lần).
---
 
## 5. NGUYÊN NHÂN BUG PHÂN TÍCH
 
**Bug Pattern 1**: Calculation error (lỗi tính toán / trùng lặp công thức)
- Test case: TC_CHECKOUT_003
- Dòng code sai: `processCheckout()`, biến `finalVND = subtotalVND + state.shippingFeeVND;`
- Giải thích: Công thức tính tiền bị viết lặp lại ở 2 nơi khác nhau (`renderCart` và `processCheckout`) thay vì dùng chung 1 hàm, dẫn đến 1 nơi "quên" cập nhật khi thêm tính năng giảm giá/freeship.
**Bug Pattern 2**: Logic error (lỗi cú pháp template literal)
- Test case: TC_ADMIN_001
- Dòng code sai: `` onclick="updateStockByAdmin('${item.sku}', -item.stock)" ``
- Giải thích: Thiếu dấu `${...}` bao quanh biểu thức `-item.stock`, khiến giá trị không được nội suy tại thời điểm tạo chuỗi HTML mà bị chạy như mã JS thô lúc click — sai phạm vi biến (`item` không tồn tại ở global scope).
**Bug Pattern 3**: Validation error (thiếu kiểm tra điều kiện nghiệp vụ)
- Test case: (phát hiện ngoài 20 case, qua review code) — liên quan TC_VOUCHER_001
- Dòng code sai: `function applyVoucher()` — thiếu điều kiện so sánh `subtotalVND` với ngưỡng tối thiểu quảng cáo.
- Giải thích: Điều kiện nghiệp vụ ghi trên UI (banner) không được đồng bộ hoá với logic xử lý backend/JS tương ứng.
**Bug Pattern 4**: Data persistence error
- Không phát hiện lỗi thuộc nhóm này. `localStorage.setItem('aura_user', ...)` và `localStorage.setItem('aura_orders', ...)` hoạt động đúng trong mọi test liên quan (TC_AUTH_001, TC_LOYALTY_001, TC_CHECKOUT_003).
---
 
## 6. COVERAGE ANALYSIS
 
### Chức năng Coverage
 
| Chức năng | # Test Case | Pass | Fail | Coverage |
|-----------|-------------|------|------|----------|
| Tìm kiếm & Lọc | 2 | 2 | 0 | 100% |
| Giỏ hàng (thêm/sửa/xoá/biến thể) | 5 | 5 | 0 | 100% |
| Voucher | 2 | 2 | 0 | 100% |
| Shipping | 2 | 2 | 0 | 100% |
| Auth | 1 | 1 | 0 | 100% |
| Loyalty | 2 | 2 | 0 | 100% |
| I18N/Currency | 2 | 2 | 0 | 100% |
| Admin | 1 | 1 | 0 | 100% |
| Checkout | 3 | 3 | 0 | 100% |
| **TOTAL** | **20** | **20** | **0** | **100%** |
 

---
 

 

 

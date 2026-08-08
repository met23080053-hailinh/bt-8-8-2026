# TEST PLAN - AURA LUXE E-Commerce System

**Ngày tạo**: 08/08/2026  
**Phiên bản**: 1.0  
**Trạng thái**: Ready for Testing

---

## 1. ĐỐI TƯỢNG TEST

### Ứng dụng
- **Tên**: AURA LUXE E-Commerce Website
- **Loại**: Single Page App (SPA) - HTML/CSS/JavaScript
- **Chức năng chính**:
  - Hiển thị & tìm kiếm sản phẩm
  - Quản lý giỏ hàng
  - Thanh toán COD
  - Hệ thống thành viên & tích điểm
  - Admin Dashboard (Quản lý tồn kho & đơn hàng)

### Phạm vi test
- ✅ Giao diện storefront (cửa hàng)
- ✅ Chức năng giỏ hàng & checkout
- ✅ Hệ thống auth & loyalty
- ✅ Admin dashboard
- ✅ Tùy chọn ngôn ngữ & tiền tệ
- ❌ Backend (không có) - dùng localStorage mock
- ❌ Payment gateway (mock COD)

---

## 2. MỤC TIÊU TEST

| Mục tiêu | Tiêu chí thành công |
|---------|-------------------|
| **Chức năng bình thường** | ✅ Tất cả 10 test Normal Flow pass |
| **Xử lý dữ liệu sai/rỗng** | ✅ Validation hoạt động, không crash |
| **Boundary cases** | ✅ Kiểm tra giới hạn số lượng, giá tiền |
| **Edge cases** | ✅ Xử lý lỗi biên đặc biệt |
| **Error handling** | ✅ Các lỗi được catch, hiển thị alert |
| **Data persistence** | ✅ localStorage lưu/tải đúng |

---

## 3. CHIẾN LƯỢC TEST

### 3.1 Phương pháp test
- **Manual Testing**: Kiểm thử thủ công từng test case
- **Exploratory Testing**: Khám phá UI, tìm bugs không lường trước
- **Browser Compatibility**: Test trên Chrome, Firefox, Edge

### 3.2 Phạm vi test
- **Test Case**: 20 test cases (xem TEST_CASES.md)
- **Loại test**:
  - Normal Flow: 10 cases
  - Invalid/Empty Data: 2 cases
  - Boundary Cases: 2 cases
  - Edge Cases: 2 cases
  - Error Handling: 3 cases
  - Other: 1 case

### 3.3 Công cụ & Môi trường
| Công cụ | Phiên bản | Mục đích |
|---------|----------|---------|
| Browser | Chrome 125+ | Testing UI |
| DevTools | F12 | Kiểm tra Console/Network/Storage |
| Text Editor | VS Code | Edit/track |
| Git | 2.40+ | Version control |

---

## 4. QUYẾT ĐỊNH TEST CASES

### Test Cases được chọn: 20 cases

#### Nhóm 1: Normal Flow (10 cases)
1. **TC_SEARCH_001**: Tìm kiếm sản phẩm
2. **TC_FILTER_001**: Lọc theo danh mục
3. **TC_CART_001**: Thêm vào giỏ
4. **TC_CART_002**: Tăng số lượng
5. **TC_VOUCHER_001**: Áp dụng voucher hợp lệ
6. **TC_SHIPPING_002**: Tính phí ship
7. **TC_AUTH_001**: Đăng nhập
8. **TC_LOYALTY_001**: Tích điểm
9. **TC_I18N_001**: Đổi ngôn ngữ
10. **TC_CURRENCY_001**: Đổi tiền tệ

#### Nhóm 2: Invalid/Empty Data (2 cases)
- **TC_VOUCHER_002**: Voucher không hợp lệ
- **TC_CHECKOUT_002**: Checkout thiếu dữ liệu

#### Nhóm 3: Boundary Cases (2 cases)
- **TC_CART_003**: Vượt quá tồn kho
- **TC_SHIPPING_001**: Miễn phí ship (>=2M)

#### Nhóm 4: Edge Cases (2 cases)
- **TC_PRODUCT_001**: Biến thể hết hàng
- **TC_CART_004**: Xóa item khi qty=0

#### Nhóm 5: Error Handling (3 cases)
- **TC_CHECKOUT_001**: Checkout giỏ trống
- **TC_LOYALTY_002**: Discount thành viên
- **TC_CHECKOUT_003**: Lưu đơn vào Admin

#### Nhóm 6: Khác (1 case)
- **TC_ADMIN_001**: Cập nhật stock

---

## 5. QUY TRÌNH TEST

### Phase 1: Chuẩn bị (Prep)
```
1. Mở website: file:///d:/WEB%20BÁN%20HÀNG/Demo%20website%20bán%20hàng.html
2. Mở DevTools: F12 → Application → LocalStorage
3. Clear localStorage để reset state
4. Có sẵn danh sách test case
```

### Phase 2: Thực hiện Test (Execution)
```
Cho mỗi test case:
1. Đọc "Bước thực hiện"
2. Thực hiện từng bước
3. So sánh với "Kết quả mong đợi"
4. Ghi lại: ✅ Pass hoặc ❌ Fail
5. Nếu Fail: Chụp screenshot + mô tả lỗi
```

### Phase 3: Bug Reporting
```
Nếu test fail:
1. Tạo Bug Report (xem template dưới)
2. Ghi ID, Tiêu đề, Severity, Steps, Actual vs Expected
3. Chụp screenshot
```

### Phase 4: Fix & Re-test
```
1. Phân tích lỗi từ code
2. Sửa code HTML/JS
3. Reload browser (Ctrl+Shift+R hard refresh)
4. Re-test case đó → Pass
```

### Phase 5: Báo cáo Cuối (Final Report)
```
1. Tính tổng: Pass/Fail/Pass Rate
2. Liệt kê lỗi tìm được
3. Ghi rõ AI đã hỗ trợ gì
4. Ghi rõ sinh viên tự quyết định gì
```

---

## 6. BUG REPORT TEMPLATE

```markdown
### 🐛 BUG REPORT

**ID**: TC_XXX_YYY  
**Tiêu đề**: [Mô tả tóm tắt lỗi]  
**Severity**: Critical / High / Medium / Low  
**Ngày phát hiện**: DD/MM/YYYY  

#### Bước tái hiện:
1. ...
2. ...
3. ...

#### Kết quả thực tế:
[Mô tả chi tiết lỗi, hành vi sai]

#### Kết quả mong đợi:
[Hành vi đúng theo spec]

#### Environment:
- Browser: Chrome 125
- OS: Windows 10
- URL: file:///...

#### Screenshots:
[Gắn ảnh chụp màn hình]

#### Root Cause:
[Phân tích nguyên nhân nếu có]

#### Fix:
[Mô tả cách sửa]
```

---

## 7. TIÊU CHÍ PASS/FAIL

### Pass Criteria
- ✅ Kết quả thực tế = Kết quả mong đợi 100%
- ✅ Không có lỗi JS trong Console
- ✅ LocalStorage lưu/tải đúng
- ✅ UI hiển thị đúng tất cả dữ liệu

### Fail Criteria
- ❌ Kết quả khác lỗi mong đợi
- ❌ Có lỗi Exception trong Console
- ❌ Dữ liệu không lưu/không tải
- ❌ UI crash hoặc hiển thị sai

---

## 8. EXIT CRITERIA (Điều kiện dừng test)

| Điều kiện | Tiêu chí |
|----------|---------|
| **Minimum Pass Rate** | >= 90% (18/20 cases pass) |
| **Critical Bugs** | 0 (không có bug Critical) |
| **Test Coverage** | Tất cả chức năng chính covered |

---

## 9. TIMELINE

| Phase | Thời gian | Công việc |
|-------|----------|----------|
| Chuẩn bị | 30 min | Setup, read docs |
| Thực hiện test | 2 hrs | Chạy 20 test cases |
| Bug analysis | 1 hr | Phân tích & fix |
| Re-test | 30 min | Verify fixes |
| Báo cáo | 30 min | Viết report |
| **TOTAL** | **4.5 hrs** | |

---

## 10. TRÁCH NHIỆM

### Sinh viên (người test)
- ✅ Chạy test thủ công từng case
- ✅ Ghi lại kết quả (Pass/Fail)
- ✅ Tự quyết định test case có valid không
- ✅ Chụp screenshot lỗi
- ✅ Phân tích root cause của bug
- ✅ Sửa code nếu phát hiện lỗi
- ✅ Viết báo cáo cuối

### AI (hỗ trợ)
- ✅ Tạo test case plan
- ✅ Hướng dẫn cách test
- ✅ Gợi ý nguyên nhân lỗi
- ✅ Kiểm tra lại code sau fix
- ❌ **KHÔNG tự chạy test** (sinh viên phải làm)
- ❌ **KHÔNG quyết định pass/fail** (sinh viên phải quyết định)

---

## 11. THỐNG KÊ KỲ VỌNG

```
Số test case: 20
Pass rate mong đợi: 85-95%
Expected Pass: 17-19 cases
Expected Fail: 1-3 cases

Bugs mong đợi:
- 0-2 bugs Critical
- 1-3 bugs High
- 2-4 bugs Medium
```

---

## 12. TÀI LIỆU THAM KHẢO

- [TEST_CASES.md](TEST_CASES.md) - Chi tiết 20 test case
- [TEST_REPORT.md](TEST_REPORT.md) - Template báo cáo
- [Demo website bán hàng.html](Demo%20website%20bán%20hàng.html) - Source code

---

## 13. APPROVAL

| Người | Vai trò | Ký | Ngày |
|-------|---------|-----|------|
| [Sinh viên] | Tester | ___ | ____ |
| [Giáo viên] | Reviewer | ___ | ____ |

---

**Phiên bản**: 1.0  
**Trạng thái**: ✅ Ready  
**Lần cập nhật cuối**: 08/08/2026

# TEST REPORT - AURA LUXE E-Commerce System

**Ngày test**: ______/______/2026  
**Người test**: ____________________  
**Phiên bản ứng dụng**: 1.0  
**Môi trường**: Windows 10, Chrome 125+  
**Trạng thái**: 🟡 In Progress

---

## EXECUTIVE SUMMARY

> **Hãy điền thông tin sau khi test xong**

| Chỉ số | Kết quả |
|-------|---------|
| **Tổng Test Cases** | 20 |
| **✅ Passed** | ____ / 20 |
| **❌ Failed** | ____ / 20 |
| **⏭️ Skipped** | ____ / 20 |
| **Pass Rate** | ___% |
| **Critical Bugs** | ____ |
| **High Bugs** | ____ |
| **Medium Bugs** | ____ |
| **Low Bugs** | ____ |

**Mục tiêu**: Pass rate >= 90%  
**Đạt được**: ✅ / ❌

---

## 1. DETAILED TEST RESULTS

### Normal Flow Tests (10 cases)

#### ✅ / ❌ TC_SEARCH_001: Tìm kiếm sản phẩm
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_FILTER_001: Lọc theo danh mục
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_CART_001: Thêm vào giỏ
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_CART_002: Tăng số lượng
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_VOUCHER_001: Áp dụng voucher hợp lệ
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_SHIPPING_002: Tính phí ship
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_AUTH_001: Đăng nhập
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_LOYALTY_001: Tích điểm
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_I18N_001: Đổi ngôn ngữ
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_CURRENCY_001: Đổi tiền tệ
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

---

### Invalid/Empty Data Tests (2 cases)

#### ✅ / ❌ TC_VOUCHER_002: Voucher không hợp lệ
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_CHECKOUT_002: Checkout thiếu dữ liệu
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

---

### Boundary Cases (2 cases)

#### ✅ / ❌ TC_CART_003: Vượt quá tồn kho
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_SHIPPING_001: Miễn phí ship (>=2M)
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

---

### Edge Cases (2 cases)

#### ✅ / ❌ TC_PRODUCT_001: Biến thể hết hàng
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_CART_004: Xóa item khi qty=0
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

---

### Error Handling Tests (3 cases)

#### ✅ / ❌ TC_CHECKOUT_001: Checkout giỏ trống
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_LOYALTY_002: Discount thành viên
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

#### ✅ / ❌ TC_CHECKOUT_003: Lưu đơn vào Admin
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

---

### Khác (1 case)

#### ✅ / ❌ TC_ADMIN_001: Cập nhật stock
- **Kết quả**: PASS / FAIL
- **Mô tả**: 
- **Ghi chú**: 

---

## 2. BUG SUMMARY

### Tổng số lỗi: ____

### Bug #1
**ID**: ________________  
**Tiêu đề**: ______________________________  
**Severity**: 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low  
**Test Case**: ________________  

**Bước tái hiện**:
1. 
2. 
3. 

**Kết quả thực tế**:
[Mô tả lỗi]

**Kết quả mong đợi**:
[Hành vi đúng]

**Root Cause**:
[Phân tích nguyên nhân]

**Fix**:
[Mô tả cách sửa - dòng code, phần nào cần thay đổi]

**Status**: 🔴 New / 🟡 Fixed / ✅ Verified

---

### Bug #2
**ID**: ________________  
**Tiêu đề**: ______________________________  
**Severity**: 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low  
**Test Case**: ________________  

**Bước tái hiện**:
1. 
2. 
3. 

**Kết quả thực tế**:
[Mô tả lỗi]

**Kết quả mong đợi**:
[Hành vi đúng]

**Root Cause**:
[Phân tích nguyên nhân]

**Fix**:
[Mô tả cách sửa]

**Status**: 🔴 New / 🟡 Fixed / ✅ Verified

---

### Bug #3
**ID**: ________________  
**Tiêu đề**: ______________________________  
**Severity**: 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low  
**Test Case**: ________________  

**Bước tái hiện**:
1. 
2. 
3. 

**Kết quả thực tế**:
[Mô tả lỗi]

**Kết quả mong đợi**:
[Hành vi đúng]

**Root Cause**:
[Phân tích nguyên nhân]

**Fix**:
[Mô tả cách sửa]

**Status**: 🔴 New / 🟡 Fixed / ✅ Verified

---

## 3. AI SUPPORT SUMMARY

### AI đã hỗ trợ gì:
- ✅ Phân tích code & xác định chức năng
- ✅ Tạo 20 test cases chi tiết
- ✅ Tạo TEST_PLAN.md (chiến lược test)
- ✅ Tạo TEST_REPORT.md (template báo cáo)
- ✅ Hướng dẫn cách test thủ công
- ✅ Gợi ý nguyên nhân lỗi
- ✅ Giúp sửa code nếu phát hiện bug

### AI KHÔNG hỗ trợ:
- ❌ Chạy test tự động (sinh viên phải chạy)
- ❌ Quyết định pass/fail (sinh viên phải quyết định)
- ❌ Tự chọn test case (sinh viên phải hiểu & chọn)

---

## 4. STUDENT DECISION LOG

### Sinh viên tự quyết định gì:

#### Quyết định 1: Chọn test case
- ❌ / ✅ AI xây dựng 20 test case, sinh viên tự chọn run 20 / run subset?
- **Quyết định**: Run cả 20 test cases
- **Lý do**: 

#### Quyết định 2: Test case hợp lệ?
- Với mỗi test case fail, sinh viên phải tự quyết định:
  - ✅ Test case hợp lệ → là BUG ứng dụng
  - ❌ Test case sai → không count
- **Ví dụ**: 
  - Test case X fail → _________
  - Sinh viên đánh giá → hợp lệ? → là bug

#### Quyết định 3: Root cause phân tích
- Sinh viên phải tự phân tích code để hiểu tại sao bug xảy ra
- **Ví dụ**: Bug X → nguyên nhân → dòng code nào sai → sửa như thế nào

#### Quyết định 4: Fix strategy
- Sinh viên chọn cách sửa phù hợp:
  - Sửa logic JavaScript
  - Sửa HTML structure
  - Sửa CSS
- **Ví dụ**: 

#### Quyết định 5: Re-test & verify
- Sau khi fix, sinh viên tự chạy lại test để xác minh fix đúng
- Hard refresh browser (Ctrl+Shift+R)
- Clear localStorage nếu cần
- **Kết quả**: Pass / Fail

---

## 5. NGUYÊN NHÂN BUG PHÂN TÍCH

### (Điền sau khi phát hiện bug)

**Bug Pattern 1**: Logic error
- Test case: __________
- Dòng code sai: __________
- Giải thích: 

**Bug Pattern 2**: Validation error
- Test case: __________
- Dòng code sai: __________
- Giải thích: 

**Bug Pattern 3**: Calculation error
- Test case: __________
- Dòng code sai: __________
- Giải thích: 

**Bug Pattern 4**: Data persistence error
- Test case: __________
- Dòng code sai: __________
- Giải thích: 

---

## 6. FIXES APPLIED

### Fix #1
**Bug**: __________________________  
**Dòng code cũ**:
```javascript
// Cũ
[code sai]
```

**Dòng code mới**:
```javascript
// Mới - đã sửa
[code đúng]
```

**Giải thích**: 

**Test case verify**: ______  
**Kết quả**: ✅ Pass / ❌ Still fail

---

### Fix #2
**Bug**: __________________________  
**Dòng code cũ**:
```javascript
// Cũ
[code sai]
```

**Dòng code mới**:
```javascript
// Mới - đã sửa
[code đúng]
```

**Giải thích**: 

**Test case verify**: ______  
**Kết quả**: ✅ Pass / ❌ Still fail

---

## 7. COVERAGE ANALYSIS

### Chức năng Coverage

| Chức năng | # Test Case | Pass | Fail | Coverage |
|-----------|-------------|------|------|----------|
| Tìm kiếm & Lọc | 2 | ___ | ___ | __% |
| Giỏ hàng | 4 | ___ | ___ | __% |
| Voucher | 2 | ___ | ___ | __% |
| Shipping | 2 | ___ | ___ | __% |
| Auth | 1 | ___ | ___ | __% |
| Loyalty | 2 | ___ | ___ | __% |
| I18N/Currency | 2 | ___ | ___ | __% |
| Admin | 1 | ___ | ___ | __% |
| Checkout | 2 | ___ | ___ | __% |
| **TOTAL** | **20** | **___** | **___** | **___%** |

---

## 8. LESSONS LEARNED

### Điều tôi học được từ test này:

1. **Về test case**:
   - 

2. **Về code quality**:
   - 

3. **Về debugging**:
   - 

4. **Về teamwork (AI support)**:
   - 

5. **Về frontend development**:
   - 

---

## 9. RECOMMENDATIONS

### Cải thiện ứng dụng:
1. ________________________________________
2. ________________________________________
3. ________________________________________

### Cải thiện quy trình test:
1. ________________________________________
2. ________________________________________

### Cải thiện kế hoạch tiếp theo:
1. ________________________________________
2. ________________________________________

---

## 10. SIGN OFF

| Người | Vai trò | Ký | Ngày |
|-------|---------|-----|------|
| ________________ | Tester | _____ | __/__/26 |
| ________________ | Reviewer | _____ | __/__/26 |

---

## 11. ATTACHMENTS

- 📁 /evidence/ - Screenshots & logs
  - BUG_001_screenshot.png
  - BUG_002_screenshot.png
  - ...
- 📄 CODE_CHANGES.md - Chi tiết fixes
- 📊 TEST_STATS.json - Dữ liệu thống kê

---

**Report Status**: 🟡 In Progress → ✅ Complete  
**Last Updated**: ______/______/2026  
**Report Version**: 1.0

---

## QUICK REFERENCE

### Tất cả test cases: 20
- ✅ Pass: ____ 
- ❌ Fail: ____
- **Pass Rate**: ___% (Target: >= 90%)

### Tất cả bugs: ____
- 🔴 Critical: ____
- 🟠 High: ____
- 🟡 Medium: ____
- 🟢 Low: ____
- **Fixed**: ____
- **Pending**: ____

### Timeline thực tế
- Bắt đầu: ______/______/2026
- Hoàn thành: ______/______/2026
- **Thời gian**: _____ hours

---

> **Lưu ý**: Đây là template. Sinh viên cần điền đầy đủ thông tin thực tế sau mỗi test run.

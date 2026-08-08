/**
 * AURA LUXE - Automated Test Suite (Node.js + jsdom)
 *
 * Chạy: node tests/run_tests.js [path/to/site.html]
 * Mặc định test file: ../site.html (bản có stub Tailwind/Chart.js/Lucide để chạy offline)
 *
 * Vì sandbox không có Chromium cài sẵn và mạng bị chặn tải CDN (Tailwind, Chart.js,
 * Lucide), bộ test dùng jsdom để chạy toàn bộ logic JS gốc của app (không sửa 1 dòng
 * logic nào) trong 1 DOM giả lập. 3 thư viện bên ngoài được thay bằng stub no-op
 * (không ảnh hưởng logic nghiệp vụ đang được kiểm thử).
 */
const path = require('path');
const fs = require('fs');
const { loadApp, waitForBoot } = require('./harness');

const SITE = process.argv[2] || path.join(__dirname, '..', 'site.html');
const EVIDENCE_DIR = path.join(__dirname, '..', 'evidence');
if (!fs.existsSync(EVIDENCE_DIR)) fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

const results = [];

function snapshot(name, obj) {
  fs.writeFileSync(
    path.join(EVIDENCE_DIR, `${name}.json`),
    JSON.stringify(obj, null, 2),
    'utf8'
  );
}

async function test(id, title, fn) {
  const fresh = loadApp(SITE);
  await waitForBoot(fresh);
  const win = fresh.window;
  const errors = [];
  const origOnError = win.onerror;
  win.onerror = (msg) => { errors.push(String(msg)); return true; };

  let status = 'PASS';
  let note = '';
  try {
    await fn(win, fresh);
    if (errors.length) {
      status = 'FAIL';
      note = `Uncaught JS error during test: ${errors.join(' | ')}`;
    }
  } catch (e) {
    status = 'FAIL';
    note = e && e.message ? e.message : String(e);
  }

  results.push({ id, title, status, note });
  console.log(`[${status}] ${id} - ${title}${note ? '  => ' + note : ''}`);
  fresh.window.close();
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

(async () => {
  // ============ NORMAL FLOW (10 cases) ============

  await test('TC_SEARCH_001', 'Tìm kiếm sản phẩm', (win) => {
    const doc = win.document;
    doc.getElementById('search-input').value = 'blazer';
    win.handleSearchAndFilter();
    const count = String(doc.getElementById('product-count').innerText);
    const cards = doc.getElementById('product-grid').children.length;
    assert(cards === 1, `Expected 1 product matching "blazer", got ${cards}`);
    assert(count.includes('1'), `product-count text should show 1, got "${count}"`);
    snapshot('TC_SEARCH_001', { count, cards });
  });

  await test('TC_FILTER_001', 'Lọc theo danh mục', (win) => {
    const doc = win.document;
    doc.getElementById('category-filter').value = 'Footwear';
    win.handleSearchAndFilter();
    const cards = doc.getElementById('product-grid').children.length;
    // PRODUCTS_DATA has exactly 1 Footwear product (Chunky Leather Loafers)
    assert(cards === 1, `Expected 1 Footwear product, got ${cards}`);
    snapshot('TC_FILTER_001', { cards });
  });

  await test('TC_CART_001', 'Thêm vào giỏ', (win) => {
    const doc = win.document;
    win.openProductModal(1); // Oversized Wool Blazer
    win.addCurrentVariantToCart();
    const badge = doc.getElementById('cart-badge').innerText;
    assert(String(badge) === '1', `Expected cart badge = 1, got ${badge}`);
    assert(win.state.cart.length === 1, 'cart should have 1 line item');
    snapshot('TC_CART_001', { badge, cart: win.state.cart });
  });

  await test('TC_CART_002', 'Tăng số lượng', (win) => {
    win.openProductModal(1);
    win.addCurrentVariantToCart();
    const sku = win.state.cart[0].sku;
    win.updateCartQty(sku, 1);
    assert(win.state.cart[0].qty === 2, `Expected qty=2, got ${win.state.cart[0].qty}`);
    snapshot('TC_CART_002', { cart: win.state.cart });
  });

  await test('TC_VOUCHER_001', 'Áp dụng voucher hợp lệ', (win) => {
    const doc = win.document;
    win.openProductModal(1);
    win.addCurrentVariantToCart();
    doc.getElementById('voucher-input').value = 'GENZ10';
    win.applyVoucher();
    assert(win.state.appliedVoucher && win.state.appliedVoucher.code === 'GENZ10',
      'Voucher GENZ10 should be applied');
    const discountText = String(doc.getElementById('summary-discount').innerText);
    assert(discountText !== '-0 ₫', `Discount should be > 0, got "${discountText}"`);
    snapshot('TC_VOUCHER_001', { appliedVoucher: win.state.appliedVoucher, discountText });
  });

  await test('TC_SHIPPING_002', 'Tính phí ship', (win) => {
    const doc = win.document;
    doc.getElementById('shipping-city-select').value = 'HN';
    win.calculateShippingFee();
    assert(win.state.shippingFeeVND === 35000, `Expected 35000, got ${win.state.shippingFeeVND}`);
    snapshot('TC_SHIPPING_002', { shippingFeeVND: win.state.shippingFeeVND });
  });

  await test('TC_AUTH_001', 'Đăng nhập', (win) => {
    const doc = win.document;
    doc.getElementById('login-email').value = 'khach@example.com';
    doc.getElementById('login-pass').value = '123456';
    const fakeEvent = { preventDefault: () => {} };
    win.handleLogin(fakeEvent, 'email');
    assert(win.state.currentUser && win.state.currentUser.name === 'khach', 'User should be logged in as "khach"');
    assert(doc.getElementById('user-auth-section').innerHTML.includes('khach'), 'Auth section should show user name');
    snapshot('TC_AUTH_001', { currentUser: win.state.currentUser });
  });

  await test('TC_LOYALTY_001', 'Tích điểm', (win) => {
    const doc = win.document;
    doc.getElementById('login-email').value = 'vip@example.com';
    win.handleLogin({ preventDefault: () => {} }, 'email');
    const pointsBefore = win.state.currentUser.points; // mock login always grants 150
    win.openProductModal(1);
    win.addCurrentVariantToCart();
    doc.getElementById('customer-name').value = 'Nguyen Van A';
    doc.getElementById('customer-phone').value = '0900000000';
    win.processCheckout();
    const pointsAfter = win.state.currentUser.points;
    assert(pointsAfter > pointsBefore, `Points should increase after checkout (before=${pointsBefore}, after=${pointsAfter})`);
    snapshot('TC_LOYALTY_001', { pointsBefore, pointsAfter });
  });

  await test('TC_I18N_001', 'Đổi ngôn ngữ', (win) => {
    const doc = win.document;
    win.setLanguage('EN');
    const title = String(doc.getElementById('t-catalog-title').innerText);
    assert(title === 'New Collection', `Expected "New Collection", got "${title}"`);
    snapshot('TC_I18N_001', { title });
  });

  await test('TC_CURRENCY_001', 'Đổi tiền tệ', (win) => {
    const doc = win.document;
    win.setCurrency('USD');
    win.renderProducts();
    const priceText = String(doc.getElementById('product-grid').children[0].querySelector('p:last-child').textContent);
    assert(priceText.startsWith('$'), `Expected price to start with $, got "${priceText}"`);
    snapshot('TC_CURRENCY_001', { priceText });
  });

  // ============ INVALID / EMPTY DATA (2 cases) ============

  await test('TC_VOUCHER_002', 'Voucher không hợp lệ', (win) => {
    const doc = win.document;
    win.openProductModal(1);
    win.addCurrentVariantToCart();
    doc.getElementById('voucher-input').value = 'KHONGTONTAI';
    let alertMsg = '';
    win.alert = (m) => { alertMsg = m; };
    win.applyVoucher();
    assert(win.state.appliedVoucher === null, 'appliedVoucher should remain null for invalid code');
    assert(alertMsg.includes('không hợp lệ'), `Expected invalid-code alert, got "${alertMsg}"`);
    snapshot('TC_VOUCHER_002', { alertMsg, appliedVoucher: win.state.appliedVoucher });
  });

  await test('TC_CHECKOUT_002', 'Checkout thiếu dữ liệu', (win) => {
    const doc = win.document;
    win.openProductModal(1);
    win.addCurrentVariantToCart();
    doc.getElementById('customer-name').value = '';
    doc.getElementById('customer-phone').value = '';
    let alertMsg = '';
    win.alert = (m) => { alertMsg = m; };
    const ordersBefore = win.state.orders.length;
    win.processCheckout();
    assert(win.state.orders.length === ordersBefore, 'No order should be created when name/phone missing');
    assert(alertMsg.includes('Họ tên'), `Expected missing-info alert, got "${alertMsg}"`);
    snapshot('TC_CHECKOUT_002', { alertMsg, ordersCount: win.state.orders.length });
  });

  // ============ BOUNDARY CASES (2 cases) ============

  await test('TC_CART_003', 'Vượt quá tồn kho', (win) => {
    const doc = win.document;
    // BLZ-BLK-L has stock = 2
    win.openProductModal(1);
    win.selectColor('Đen');
    win.selectSize('L');
    win.addCurrentVariantToCart(); // qty 1
    win.addCurrentVariantToCart(); // qty 2 (at stock limit)
    let alertMsg = '';
    win.alert = (m) => { alertMsg = m; };
    win.addCurrentVariantToCart(); // attempt qty 3 > stock(2)
    const item = win.state.cart.find(i => i.sku === 'BLZ-BLK-L');
    assert(item.qty === 2, `Qty should be capped at stock (2), got ${item.qty}`);
    assert(alertMsg.includes('vượt quá'), `Expected over-stock alert, got "${alertMsg}"`);
    snapshot('TC_CART_003', { qty: item.qty, alertMsg });
  });

  await test('TC_SHIPPING_001', 'Miễn phí ship (>=2M)', (win) => {
    const doc = win.document;
    // Add enough items to exceed 2,000,000 VND (Blazer 2,450,000 alone qualifies)
    win.openProductModal(1);
    win.addCurrentVariantToCart();
    win.renderCart();
    const shippingText = String(doc.getElementById('summary-shipping').innerText);
    assert(shippingText === '0 ₫', `Expected free shipping "0 ₫", got "${shippingText}"`);
    snapshot('TC_SHIPPING_001', { shippingText });
  });

  // ============ EDGE CASES (2 cases) ============

  await test('TC_PRODUCT_001', 'Biến thể hết hàng', (win) => {
    const doc = win.document;
    // Blazer / Kem / L has stock 0
    win.openProductModal(1);
    win.selectColor('Kem');
    win.selectSize('L');
    const btn = doc.getElementById('add-to-cart-btn');
    assert(btn.disabled === true, 'Add-to-cart button should be disabled for out-of-stock variant');
    assert(String(doc.getElementById('modal-stock-count').innerText).includes('Hết Hàng'), 'Stock label should say Hết Hàng');
    snapshot('TC_PRODUCT_001', { disabled: btn.disabled, stockLabel: String(doc.getElementById('modal-stock-count').innerText) });
  });

  await test('TC_CART_004', 'Xóa item khi qty=0', (win) => {
    win.openProductModal(1);
    win.addCurrentVariantToCart();
    const sku = win.state.cart[0].sku;
    win.updateCartQty(sku, -1); // qty 1 -> 0 => should be removed
    const stillThere = win.state.cart.some(i => i.sku === sku);
    assert(!stillThere, 'Item should be removed from cart when qty drops to 0');
    snapshot('TC_CART_004', { cart: win.state.cart });
  });

  // ============ ERROR HANDLING (3 cases) ============

  await test('TC_CHECKOUT_001', 'Checkout giỏ trống', (win) => {
    let alertMsg = '';
    win.alert = (m) => { alertMsg = m; };
    const ordersBefore = win.state.orders.length;
    win.processCheckout();
    assert(win.state.orders.length === ordersBefore, 'No order should be created for empty cart');
    assert(alertMsg.includes('trống'), `Expected empty-cart alert, got "${alertMsg}"`);
    snapshot('TC_CHECKOUT_001', { alertMsg });
  });

  await test('TC_LOYALTY_002', 'Discount thành viên', (win) => {
    const doc = win.document;
    // Simulate an existing GOLD-tier member (>=200 points) via localStorage, then reload app state manually
    win.state.currentUser = { name: 'Gold Member', points: 250 };
    win.openProductModal(1);
    win.addCurrentVariantToCart();
    win.renderCart();
    const discountText = String(doc.getElementById('summary-discount').innerText);
    assert(discountText !== '-0 ₫', `Gold-tier member should get automatic 5% discount, got "${discountText}"`);
    snapshot('TC_LOYALTY_002', { discountText, points: win.state.currentUser.points });
  });

  await test('TC_CHECKOUT_003', 'Lưu đơn vào Admin', (win) => {
    const doc = win.document;
    win.openProductModal(1); // Blazer 2,450,000 -> qualifies for free ship (>=2,000,000)
    win.addCurrentVariantToCart();
    win.alert = () => {};
    doc.getElementById('voucher-input').value = 'GENZ10'; // -10% discount
    win.applyVoucher();
    win.renderCart();
    const shownFinal = String(doc.getElementById('summary-final').innerText);

    doc.getElementById('customer-name').value = 'Tran Thi B';
    doc.getElementById('customer-phone').value = '0911111111';
    const ordersBefore = win.state.orders.length;
    win.processCheckout();
    assert(win.state.orders.length === ordersBefore + 1, 'Order count should increase by 1');

    // Regression guard: the amount saved to the order MUST match what the customer
    // saw in the cart summary (voucher discount + free-ship threshold included).
    const savedOrder = win.state.orders[0];
    const savedFinalFormatted = `${savedOrder.totalVND.toLocaleString('vi-VN')} ₫`;
    assert(savedFinalFormatted === shownFinal,
      `Saved order total (${savedFinalFormatted}) must match cart summary shown to customer (${shownFinal})`);

    win.switchTab('admin');
    win.renderAdminDashboard();
    const adminHtml = doc.getElementById('admin-orders-table').innerHTML;
    assert(adminHtml.includes(win.state.orders[0].id), 'New order should appear in Admin orders table');
    snapshot('TC_CHECKOUT_003', { newOrderId: win.state.orders[0].id, shownFinal, savedFinalFormatted, totalOrders: win.state.orders.length });
  });

  // ============ KHÁC (1 case) ============

  await test('TC_ADMIN_001', 'Cập nhật stock', (win) => {
    const doc = win.document;
    win.switchTab('admin');
    win.renderAdminDashboard();
    const p = win.PRODUCTS_DATA.find(x => x.id === 1);
    const variant = p.variants.find(v => v.sku === 'BLZ-BLK-L'); // stock currently 2
    const stockBefore = variant.stock;

    // Click "+5 Kho" for this SKU
    win.updateStockByAdmin('BLZ-BLK-L', 5);
    assert(variant.stock === stockBefore + 5, `Expected stock ${stockBefore + 5}, got ${variant.stock}`);

    // Click "Hết Hàng" button exactly as the generated HTML does (this reproduces the
    // literal onclick attribute string that renderAdminDashboard() outputs).
    doc.getElementById('admin-inventory-table').innerHTML = '';
    win.renderAdminDashboard();
    const row = [...doc.querySelectorAll('#admin-inventory-table tr')]
      .find(tr => tr.innerHTML.includes('BLZ-BLK-L'));
    const outOfStockBtn = [...row.querySelectorAll('button')].find(b => String(b.textContent).includes('Hết Hàng'));
    const onclickAttr = outOfStockBtn.getAttribute('onclick');

    // Execute the button's actual onclick attribute the way a real browser would.
    let clickError = null;
    try {
      const fn = new win.Function(onclickAttr);
      fn.call(win);
    } catch (e) {
      clickError = e.message;
    }

    if (clickError) {
      throw new Error(`Clicking "Hết Hàng" button threw an error: ${clickError} (onclick="${onclickAttr}")`);
    }
    assert(variant.stock === 0, `Expected stock reset to 0 after "Hết Hàng" click, got ${variant.stock}`);
    snapshot('TC_ADMIN_001', { stockBefore, afterPlus5: stockBefore + 5, onclickAttr, clickError });
  });

  // ============ SUMMARY ============
  const passCount = results.filter(r => r.status === 'PASS').length;
  const failCount = results.filter(r => r.status === 'FAIL').length;
  console.log('\n================ SUMMARY ================');
  console.log(`Total: ${results.length} | Pass: ${passCount} | Fail: ${failCount} | Pass Rate: ${((passCount/results.length)*100).toFixed(1)}%`);
  fs.writeFileSync(path.join(__dirname, '..', 'evidence', 'RESULTS.json'), JSON.stringify(results, null, 2));
})();

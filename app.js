// Configuration
const CONFIG = {
    // Cập nhật BASE_URL này với domain của bạn khi deploy
    BASE_URL: 'https://doan-xa-tien-phuoc.github.io', // Ví dụ: 'https://streethub.github.io'
    QR_API: 'https://api.qrserver.com/v1/create-qr-code/'
};

// Street data configuration
const streets = [
    { id: 'huynh-thuc-khang', name: 'Huỳnh Thúc Kháng' },
    { id: '10-3', name: '10/3' },
    { id: 'ton-duc-thang', name: 'Tôn Đức Thắng' },
    { id: 'nga-son', name: 'Nga Sơn' },
    { id: 'cay-coc', name: 'Cây Cốc' },
    { id: 'hoang-sa', name: 'Hoàng Sa' },
    { id: 'le-vinh-huy', name: 'Lê Vĩnh Huy' },
    { id: 'tran-ngoc-suong', name: 'Trần Ngọc Sương' },
    { id: 'nguyen-dinh-tuu', name: 'Nguyễn Đình Tựu' },
    { id: 'tran-huynh', name: 'Trần Huỳnh' },
    { id: 'tran-quy-cap', name: 'Trần Quý Cáp' },
    { id: 'ho-truyen', name: 'Hồ Truyền' },
    { id: 'le-co', name: 'Lê Cơ' },
    { id: 'phan-chau-trinh', name: 'Phan Châu Trinh' },
    { id: 'dang-thuy-tram', name: 'Đặng Thùy Trâm' },
    { id: 'nguyen-du', name: 'Nguyễn Du' },
    { id: 'le-vinh-khanh', name: 'Lê Vĩnh Khanh' },
    { id: 'me-thu', name: 'Mẹ Thứ' }
];

// Router class
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const [path, ...params] = hash.split('/').filter(p => p);
        
        if (!path || path === '') {
            this.routes['/']();
        } else if (this.routes[`/${path}`]) {
            this.routes[`/${path}`](params);
        } else {
            this.showError();
        }
        
        window.scrollTo(0, 0);
    }

    navigate(path) {
        window.location.hash = path;
    }

    showError() {
        const content = document.getElementById('main-content');
        content.innerHTML = `
            <div class="container">
                <div class="error">
                    <h2>😕 Không tìm thấy trang</h2>
                    <p>Xin lỗi, trang bạn tìm kiếm không tồn tại.</p>
                    <a href="#/" class="cta-button" style="margin-top: 2rem;">Về trang chủ</a>
                </div>
            </div>
        `;
    }
}

// App class
class App {
    constructor() {
        this.router = new Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.addRoute('/', () => this.renderHome());
        
        streets.forEach(street => {
            this.router.addRoute(`/${street.id}`, () => this.renderStreetDetail(street.id));
        });
    }

    renderHome() {
        const content = document.getElementById('main-content');
        content.innerHTML = `
            <div class="container">
                <div class="hero">
                    <h2>🌟 Khám Phá Câu Chuyện Đằng Sau Tên Đường</h2>
                    <p>Mỗi con đường đều mang trong mình một câu chuyện lịch sử, một con người, một ý nghĩa đặc biệt. Hãy cùng chúng tôi khám phá những câu chuyện thú vị đó!</p>
                    <button id="explore-btn" class="cta-button">Bắt đầu khám phá</button>
                </div>

                <div class="street-list-section" id="explore">
                    <h2 class="section-title">📍 Danh Sách Các Tên Đường</h2>
                    <div class="street-grid">
                        ${streets.map(street => `
                            <a href="#/${street.id}" class="street-card">
                                <h3>${street.name}</h3>
                                <p>Nhấn để khám phá câu chuyện →</p>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Add event listener for explore button
        const exploreBtn = document.getElementById('explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                this.exploreRandom();
            });
        }
    }

    exploreRandom() {
        const content = document.getElementById('main-content');
        content.innerHTML = `
            <div class="container">
                <div class="hero" style="min-height: 60vh; display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div class="loading-spinner"></div>
                        <h2 style="margin-top: 2rem;">🎲 Đang chọn một tên đường ngẫu nhiên...</h2>
                        <p style="margin-top: 1rem; color: var(--text-light);">Hãy chuẩn bị khám phá câu chuyện thú vị!</p>
                    </div>
                </div>
            </div>
        `;

        // Wait 2 seconds then navigate to random street
        setTimeout(() => {
            const randomStreet = streets[Math.floor(Math.random() * streets.length)];
            window.location.hash = `/${randomStreet.id}`;
        }, 2000);
    }

    async renderStreetDetail(streetId) {
        const content = document.getElementById('main-content');
        content.innerHTML = `
            <div class="container">
                <div class="loading">Đang tải thông tin...</div>
            </div>
        `;

        try {
            const response = await fetch(`data/${streetId}.json`);
            if (!response.ok) throw new Error('Street not found');
            
            const data = await response.json();
            
            // Get random suggestions (3 different streets)
            const suggestions = this.getRandomStreets(streetId, 3);
            
            content.innerHTML = `
                <div class="container">
                    <div class="street-detail">
                        <a href="#/" class="back-button">← Về trang chủ</a>
                        
                        <div class="street-header">
                            <img src="${data.image}" alt="${data.name}" class="street-image" onerror="this.src='https://via.placeholder.com/800x400/667eea/ffffff?text=${encodeURIComponent(data.name)}'">
                            <h1 class="street-title">${data.name}</h1>
                            <button id="generate-qr-btn" class="qr-button">
                                📱 Tạo Mã QR
                            </button>
                        </div>

                        <div class="street-content">
                            <div class="info-section">
                                <h3>📏 Thông Tin Lý Trình</h3>
                                <div class="info-grid">
                                    <div class="info-item">
                                        <strong>Điểm đầu:</strong>
                                        ${data.route.start}
                                    </div>
                                    <div class="info-item">
                                        <strong>Điểm cuối:</strong>
                                        ${data.route.end}
                                    </div>
                                    <div class="info-item">
                                        <strong>Chiều dài:</strong>
                                        ${data.route.length}
                                    </div>
                                    <div class="info-item">
                                        <strong>Chiều rộng:</strong>
                                        ${data.route.width}
                                    </div>
                                </div>
                            </div>

                            <div class="info-section">
                                <h3>💡 Ý Nghĩa Tên Đường</h3>
                                <p class="meaning-text">${data.meaning}</p>
                            </div>
                        </div>

                        <div class="suggestions">
                            <h3>🔍 Khám Phá Thêm</h3>
                            <div class="street-grid">
                                ${suggestions.map(street => `
                                    <a href="#/${street.id}" class="street-card">
                                        <h3>${street.name}</h3>
                                        <p>Nhấn để khám phá câu chuyện →</p>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Add event listener for QR button
            const qrBtn = document.getElementById('generate-qr-btn');
            if (qrBtn) {
                qrBtn.addEventListener('click', () => {
                    this.showQRCode(streetId, data.name);
                });
            }
        } catch (error) {
            content.innerHTML = `
                <div class="container">
                    <div class="error">
                        <h2>😕 Không tìm thấy thông tin</h2>
                        <p>Xin lỗi, chúng tôi không thể tải thông tin về con đường này.</p>
                        <a href="#/" class="cta-button" style="margin-top: 2rem;">Về trang chủ</a>
                    </div>
                </div>
            `;
        }
    }

    showQRCode(streetId, streetName) {
        // Generate URL for current page
        const currentURL = `${CONFIG.BASE_URL}/#/${streetId}`;
        
        // Generate QR code URL
        const qrCodeURL = `${CONFIG.QR_API}?size=300x300&data=${encodeURIComponent(currentURL)}`;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'qr-modal';
        modal.innerHTML = `
            <div class="qr-modal-content">
                <button class="qr-close-btn">&times;</button>
                <h2>Mã QR - ${streetName}</h2>
                <p class="qr-instruction">Quét mã QR để chia sẻ hoặc lưu lại</p>
                <div class="qr-code-container">
                    <img src="${qrCodeURL}" alt="QR Code" class="qr-code-image">
                </div>
                <p class="qr-url">${currentURL}</p>
                <div class="qr-actions">
                    <a href="${qrCodeURL}" download="qr-${streetId}.png" class="qr-download-btn">💾 Tải về</a>
                    <button class="qr-copy-btn" data-url="${currentURL}">📋 Sao chép link</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeBtn = modal.querySelector('.qr-close-btn');
        const copyBtn = modal.querySelector('.qr-copy-btn');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        copyBtn.addEventListener('click', () => {
            const url = copyBtn.getAttribute('data-url');
            navigator.clipboard.writeText(url).then(() => {
                copyBtn.textContent = '✓ Đã sao chép!';
                setTimeout(() => {
                    copyBtn.textContent = '📋 Sao chép link';
                }, 2000);
            }).catch(() => {
                alert('Không thể sao chép. Vui lòng copy thủ công: ' + url);
            });
        });
    }

    getRandomStreets(excludeId, count) {
        const filtered = streets.filter(s => s.id !== excludeId);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
}

// Initialize app
const app = new App();

// 공지사항 데이터
        const notices = [
            {
                id: 1,
                category: '공지사항',
                title: '2024년 하반기 정기 시스템 점검 안내',
                content: `안녕하세요. 더 나은 서비스 제공을 위해 정기 시스템 점검을 실시합니다.

점검 일시: 2024년 7월 25일 (목) 02:00 ~ 06:00 (4시간)
점검 내용: 서버 업그레이드 및 보안 패치

점검 시간 동안 일시적으로 서비스 이용이 제한될 수 있습니다.
이용에 불편을 드려 죄송합니다.`,
                date: '2024-07-23',
                views: 1234,
                isPinned: true,
                isNew: true
            },
            {
                id: 2,
                category: '이벤트',
                title: '여름 특가 세일 이벤트 - 최대 70% 할인!',
                content: `🌞 여름 시즌을 맞아 특가 세일 이벤트를 진행합니다!

이벤트 기간: 2024년 7월 20일 ~ 8월 10일
할인 혜택:
- 의류: 최대 50% 할인
- 신발: 최대 40% 할인
- 액세서리: 최대 70% 할인

추가 혜택: 10만원 이상 구매 시 무료배송
쿠폰 코드: SUMMER2024`,
                date: '2024-07-20',
                views: 3456,
                isPinned: true,
                isNew: false
            },
            {
                id: 3,
                category: '배송안내',
                title: '택배사 파업으로 인한 배송 지연 안내',
                content: `고객님께 안내드립니다.

택배사 파업으로 인해 일부 지역 배송이 지연되고 있습니다.

영향 지역: 서울, 경기 일부
예상 지연: 1-2일

빠른 시일 내 정상화될 수 있도록 노력하겠습니다.
문의사항은 고객센터(1588-0000)로 연락주세요.`,
                date: '2024-07-22',
                views: 876,
                isPinned: false,
                isNew: true
            },
            {
                id: 4,
                category: '이벤트',
                title: '신규 회원 가입 이벤트 - 적립금 3만원 증정',
                content: `새로 가입하신 회원님들을 위한 특별 혜택!

혜택 내용:
- 회원가입 즉시: 적립금 10,000원
- 첫 구매 완료: 적립금 20,000원 추가

이벤트 기간: ~ 2024년 8월 31일까지
적립금 유효기간: 가입일로부터 6개월

지금 바로 가입하고 혜택을 받아보세요!`,
                date: '2024-07-15',
                views: 2341,
                isPinned: false,
                isNew: false
            },
            {
                id: 5,
                category: '공지사항',
                title: '개인정보처리방침 개정 안내',
                content: `개인정보처리방침 개정에 대해 안내드립니다.

개정 시행일: 2024년 8월 1일
주요 변경사항:
- 개인정보 보유기간 명시
- 제3자 제공 범위 구체화
- 개인정보보호 책임자 연락처 업데이트

자세한 내용은 홈페이지 하단의 개인정보처리방침을 확인해주세요.`,
                date: '2024-07-18',
                views: 567,
                isPinned: false,
                isNew: false
            }
        ];

        let currentCategory = '전체';
        let currentSearch = '';

        // DOM 요소들
        const searchInput = document.getElementById('searchInput');
        const categoryButtons = document.getElementById('categoryButtons');
        const pinnedNotices = document.getElementById('pinnedNotices');
        const regularNotices = document.getElementById('regularNotices');
        const emptyState = document.getElementById('emptyState');
        const pinnedSection = document.getElementById('pinnedSection');
        const regularSection = document.getElementById('regularSection');
        const regularTitle = document.getElementById('regularTitle');

        // 날짜 포맷팅
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('ko-KR');
        }

        // 조회수 포맷팅
        function formatViews(views) {
            return views.toLocaleString();
        }

        // 공지사항 HTML 생성
        function createNoticeHTML(notice) {
            var pinnedClass = notice.isPinned ? 'pinned' : '';
            var pinnedIcon = notice.isPinned ? '<span class="pin-icon">📌</span>' : '';
            var newBadge = notice.isNew ? '<span class="badge new">NEW</span>' : '';
            
            return '<div class="notice-item ' + pinnedClass + '" data-id="' + notice.id + '">' +
                '<div class="notice-header" onclick="toggleNotice(' + notice.id + ')">' +
                    '<div class="notice-top">' +
                        '<div class="notice-left">' +
                            '<div class="notice-badges">' +
                                pinnedIcon +
                                '<span class="badge category ' + notice.category + '">' + notice.category + '</span>' +
                                newBadge +
                            '</div>' +
                            '<div class="notice-title">' + notice.title + '</div>' +
                            '<div class="notice-meta">' +
                                '<div class="meta-item">' +
                                    '<span>📅</span>' +
                                    '<span>' + formatDate(notice.date) + '</span>' +
                                '</div>' +
                                '<div class="meta-item">' +
                                    '<span>👁️</span>' +
                                    '<span>' + formatViews(notice.views) + '</span>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="chevron">›</div>' +
                    '</div>' +
                '</div>' +
                '<div class="notice-body">' +
                    '<div class="notice-content-text">' + notice.content.replace(/\n/g, '<br>') + '</div>' +
                '</div>' +
            '</div>';
        }

        // 공지사항 토글
        function toggleNotice(id) {
            const noticeItem = document.querySelector('[data-id="' + id + '"]');
            noticeItem.classList.toggle('expanded');
        }

        // 필터링된 공지사항 가져오기
        function getFilteredNotices() {
            return notices.filter(notice => {
                const categoryMatch = currentCategory === '전체' || notice.category === currentCategory;
                const searchMatch = notice.title.toLowerCase().includes(currentSearch.toLowerCase());
                return categoryMatch && searchMatch;
            });
        }

        // 공지사항 목록 렌더링
        function renderNotices() {
            const filteredNotices = getFilteredNotices();
            const pinned = filteredNotices.filter(notice => notice.isPinned);
            const regular = filteredNotices.filter(notice => !notice.isPinned);

            // 고정 공지
            if (pinned.length > 0) {
                pinnedNotices.innerHTML = pinned.map(createNoticeHTML).join('');
                pinnedSection.style.display = 'block';
            } else {
                pinnedSection.style.display = 'none';
            }

            // 일반 공지
            if (regular.length > 0) {
                regularNotices.innerHTML = regular.map(createNoticeHTML).join('');
                regularSection.style.display = 'block';
                regularTitle.style.display = pinned.length > 0 ? 'flex' : 'none';
            } else {
                regularSection.style.display = 'none';
            }

            // 빈 상태
            if (filteredNotices.length === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
            }
        }

        // 카테고리 버튼 이벤트
        categoryButtons.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                // 모든 버튼에서 active 제거
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // 클릭된 버튼에 active 추가
                e.target.classList.add('active');
                
                // 현재 카테고리 업데이트
                currentCategory = e.target.dataset.category;
                renderNotices();
            }
        });

        // 검색 이벤트
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderNotices();
        });

        // 초기 렌더링
        renderNotices();
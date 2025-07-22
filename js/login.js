 // 폼 유효성 검사
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // 에러 메시지 초기화
            hideAllErrors();
            
            let isValid = true;
            
            if (!username.trim()) {
                showError('usernameError');
                isValid = false;
            }
            
            if (!password.trim()) {
                showError('passwordError');
                isValid = false;
            }
            
            if (isValid) {
                // 로그인 처리 (실제 구현 시 서버와 통신)
                login(username, password);
            }
        });
        
        function showError(errorId) {
            document.getElementById(errorId).style.display = 'block';
        }
        
        function hideAllErrors() {
            const errors = document.querySelectorAll('.error-message');
            errors.forEach(error => error.style.display = 'none');
        }
        
        function login(username, password) {
            // 로딩 상태 표시
            const loginBtn = document.querySelector('.login-btn');
            const originalText = loginBtn.textContent;
            loginBtn.textContent = '로그인 중...';
            loginBtn.disabled = true;
            
            // 실제 구현 시에는 서버 API 호출
            setTimeout(() => {
                alert(`로그인 성공!\n아이디: ${username}`);
                loginBtn.textContent = originalText;
                loginBtn.disabled = false;
                
                // 메인 페이지로 이동 (실제 구현 시)
                // window.location.href = '/main';
            }, 1500);
        }
        
        function socialLogin(provider) {
            alert(`${provider} 로그인을 시작합니다.`);
            // 실제 구현 시 해당 소셜 로그인 API 연동
        }
        
        function goToSignup() {
            alert('회원가입 페이지로 이동합니다.');
            // 실제 구현 시 회원가입 페이지로 이동
            // window.location.href = '/signup';
        }
        
        // 엔터키 로그인 지원
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('loginForm').dispatchEvent(new Event('submit'));
            }
        });
        
        // 입력 필드 포커스 시 에러 메시지 숨기기
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', function() {
                const errorElement = this.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            });
        });
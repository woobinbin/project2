let loginAttempts = 0;
        const maxAttempts = 5;

        // 폼 유효성 검사
        document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (loginAttempts >= maxAttempts) {
                alert('로그인 시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.');
                return;
            }
            
            const adminId = document.getElementById('adminId').value;
            const adminPassword = document.getElementById('adminPassword').value;
            
            // 에러 메시지 초기화
            hideAllErrors();
            
            let isValid = true;
            
            if (!adminId.trim()) {
                showError('adminIdError');
                isValid = false;
            }
            
            if (!adminPassword.trim()) {
                showError('adminPasswordError');
                isValid = false;
            } else if (adminPassword.length < 8) {
                showError('adminPasswordError', '관리자 비밀번호는 최소 8자리 이상이어야 합니다.');
                isValid = false;
            }
            
            if (isValid) {
                adminLogin(adminId, adminPassword);
            } else {
                loginAttempts++;
                updateAttemptCount();
            }
        });
        
        function showError(errorId, customMessage = null) {
            const errorElement = document.getElementById(errorId);
            if (customMessage) {
                errorElement.textContent = customMessage;
            }
            errorElement.style.display = 'block';
        }
        
        function hideAllErrors() {
            const errors = document.querySelectorAll('.error-message');
            errors.forEach(error => error.style.display = 'none');
        }
        
        function adminLogin(adminId, adminPassword) {
            const loginBtn = document.querySelector('.login-btn');
            const originalText = loginBtn.textContent;
            loginBtn.textContent = '인증 중...';
            loginBtn.disabled = true;
            
            // 실제 구현 시에는 서버 API 호출
            setTimeout(() => {
                // 데모용 관리자 계정 (실제로는 서버에서 검증)
                if (adminId === 'admin' && adminPassword === 'admin123!') {
                    alert('관리자 로그인 성공!\n관리자 대시보드로 이동합니다.');
                    // window.location.href = '/admin/dashboard';
                } else {
                    loginAttempts++;
                    updateAttemptCount();
                    alert('관리자 인증에 실패했습니다.\n올바른 관리자 계정 정보를 입력해주세요.');
                    
                    if (loginAttempts >= maxAttempts) {
                        alert('로그인 시도 횟수를 초과했습니다.\n보안을 위해 잠시 후 다시 시도해주세요.');
                        lockLoginForm();
                    }
                }
                
                loginBtn.textContent = originalText;
                loginBtn.disabled = false;
            }, 2000);
        }
        
        function updateAttemptCount() {
            document.getElementById('attemptCount').textContent = loginAttempts;
            
            if (loginAttempts >= 3) {
                document.getElementById('attemptCount').style.color = '#e74c3c';
            }
        }
        
        function lockLoginForm() {
            const inputs = document.querySelectorAll('.form-input');
            const loginBtn = document.querySelector('.login-btn');
            
            inputs.forEach(input => input.disabled = true);
            loginBtn.disabled = true;
            loginBtn.textContent = '계정 잠금됨';
            loginBtn.style.background = '#95a5a6';
            
            // 5분 후 잠금 해제 (실제로는 서버에서 관리)
            setTimeout(() => {
                inputs.forEach(input => input.disabled = false);
                loginBtn.disabled = false;
                loginBtn.textContent = '관리자 로그인';
                loginBtn.style.background = 'linear-gradient(135deg, #2c3e50, #3498db)';
                loginAttempts = 0;
                updateAttemptCount();
                alert('계정 잠금이 해제되었습니다.');
            }, 300000); // 5분
        }
        
        function goToMainSite() {
            if (confirm('일반 쇼핑몰 사이트로 이동하시겠습니까?')) {
                alert('일반 쇼핑몰로 이동합니다.');
                 window.location.href = '/index.html';
            }
        }
        
        // 비밀번호 강도 체크
        document.getElementById('adminPassword').addEventListener('input', function() {
            const password = this.value;
            const strengthBar = document.querySelector('.strength-bar');
            const strengthContainer = document.querySelector('.password-strength');
            
            if (password.length > 0) {
                strengthContainer.style.display = 'block';
                
                let strength = 0;
                if (password.length >= 8) strength += 25;
                if (/[A-Z]/.test(password)) strength += 25;
                if (/[a-z]/.test(password)) strength += 25;
                if (/[0-9!@#$%^&*]/.test(password)) strength += 25;
                
                strengthBar.style.width = strength + '%';
                
                if (strength <= 25) {
                    strengthBar.style.background = '#e74c3c';
                } else if (strength <= 50) {
                    strengthBar.style.background = '#f39c12';
                } else if (strength <= 75) {
                    strengthBar.style.background = '#f1c40f';
                } else {
                    strengthBar.style.background = '#27ae60';
                }
            } else {
                strengthContainer.style.display = 'none';
            }
        });
        
        // 엔터키 로그인 지원
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && loginAttempts < maxAttempts) {
                document.getElementById('adminLoginForm').dispatchEvent(new Event('submit'));
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

        // 보안 경고 메시지
        window.addEventListener('load', function() {
            console.warn('⚠️ 관리자 시스템에 접근하고 있습니다. 무단 접근은 법적 처벌을 받을 수 있습니다.');
        });
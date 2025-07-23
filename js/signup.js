// 전역 상태 관리
        const formState = {
            email: { valid: false, checked: false },
            password: { valid: false },
            passwordConfirm: { valid: false },
            name: { valid: false },
            phone: { valid: false, verified: false },
            terms: { valid: false }
        };

        // 디버그 정보 표시
        function updateDebugInfo() {
            const debugInfo = document.getElementById('debugInfo');
            if (debugInfo) {
                // debugInfo.innerHTML = `
                //     <div>이메일: ${formState.email.valid ? '✓' : '✗'} (중복확인: ${formState.email.checked ? '✓' : '✗'})</div>
                //     <div>비밀번호: ${formState.password.valid ? '✓' : '✗'}</div>
                //     <div>비밀번호 확인: ${formState.passwordConfirm.valid ? '✓' : '✗'}</div>
                //     <div>이름: ${formState.name.valid ? '✓' : '✗'}</div>
                //     <div>휴대폰: ${formState.phone.valid ? '✓' : '✗'} (인증: ${formState.phone.verified ? '✓' : '✗'})</div>
                //     <div>약관: ${formState.terms.valid ? '✓' : '✗'}</div>
                // `;
                debugInfo.style.display = 'block';
            }
            console.log('Form State:', formState);
        }

        // 이메일 유효성 검사
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // 비밀번호 유효성 검사
        function validatePassword(password) {
            // 최소 8자, 영문, 숫자, 특수문자 포함
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return passwordRegex.test(password);
        }

        // 휴대폰 번호 유효성 검사
        function validatePhone(phone) {
            const phoneRegex = /^010-\d{4}-\d{4}$/;
            return phoneRegex.test(phone);
        }

        // 이름 유효성 검사
        function validateName(name) {
            return name.trim().length >= 2;
        }

        // 폼 유효성 검사 및 버튼 활성화
        function validateForm() {
            // 데모 모드: 기본 유효성만 검사 (중복확인, 휴대폰 인증 선택사항)
            const isFormValid = 
                formState.email.valid &&
                formState.password.valid &&
                formState.passwordConfirm.valid &&
                formState.name.valid &&
                formState.phone.valid &&
                formState.terms.valid;

            const signupBtn = document.getElementById('signupBtn');
            signupBtn.disabled = !isFormValid;
            
            updateDebugInfo();
        }

        // 이메일 중복 확인
        function checkEmailDuplicate() {
            const email = document.getElementById('email').value;
            const messageDiv = document.getElementById('emailMessage');
            
            if (!validateEmail(email)) {
                messageDiv.textContent = '올바른 이메일 형식을 입력하세요.';
                messageDiv.className = 'validation-message error';
                return;
            }

            // 데모용 - 실제로는 서버 API 호출
            setTimeout(() => {
                formState.email.checked = true;
                messageDiv.textContent = '사용 가능한 이메일입니다.';
                messageDiv.className = 'validation-message success';
                validateForm();
            }, 500);
        }

        // 인증번호 발송
        function sendVerificationCode() {
            const phone = document.getElementById('phone').value;
            const messageDiv = document.getElementById('phoneMessage');
            
            if (!validatePhone(phone)) {
                messageDiv.textContent = '올바른 휴대폰 번호 형식을 입력하세요. (010-0000-0000)';
                messageDiv.className = 'validation-message error';
                return;
            }

            // 인증번호 입력 필드 표시
            document.getElementById('verificationGroup').style.display = 'block';
            messageDiv.textContent = '인증번호가 발송되었습니다. (데모: 123456 또는 000000)';
            messageDiv.className = 'validation-message success';
        }

        // 인증번호 확인
        function verifyCode() {
            const code = document.getElementById('verificationCode').value;
            const messageDiv = document.getElementById('verificationMessage');
            
            if (code === '123456' || code === '000000') {
                formState.phone.verified = true;
                messageDiv.textContent = '인증이 완료되었습니다.';
                messageDiv.className = 'validation-message success';
            } else {
                messageDiv.textContent = '인증번호가 일치하지 않습니다.';
                messageDiv.className = 'validation-message error';
            }
            validateForm();
        }

        // 전체 약관 동의 토글
        function toggleAllTerms() {
            const allTermsCheckbox = document.getElementById('allTerms');
            const requiredTerms = document.querySelectorAll('.required-term');
            const optionalTerms = document.querySelectorAll('#terms3');
            
            const isChecked = allTermsCheckbox.checked;
            
            requiredTerms.forEach(term => {
                term.checked = isChecked;
                term.parentElement.classList.toggle('checked', isChecked);
            });
            
            optionalTerms.forEach(term => {
                term.checked = isChecked;
                term.parentElement.classList.toggle('checked', isChecked);
            });
            
            validateTerms();
        }

        // 약관 유효성 검사
        function validateTerms() {
            const requiredTerms = document.querySelectorAll('.required-term');
            const allChecked = Array.from(requiredTerms).every(term => term.checked);
            
            formState.terms.valid = allChecked;
            
            // 전체 동의 체크박스 상태 업데이트
            const allTermsCheckbox = document.getElementById('allTerms');
            const allTerms = document.querySelectorAll('input[type="checkbox"]:not(#allTerms)');
            const allTermsChecked = Array.from(allTerms).every(term => term.checked);
            allTermsCheckbox.checked = allTermsChecked;
            
            validateForm();
        }

        // 이벤트 리스너 등록
        document.addEventListener('DOMContentLoaded', function() {
            // 이메일 입력 이벤트
            document.getElementById('email').addEventListener('input', function() {
                const email = this.value;
                formState.email.valid = validateEmail(email);
                formState.email.checked = false; // 이메일 변경시 중복확인 초기화
                
                const messageDiv = document.getElementById('emailMessage');
                if (email && !formState.email.valid) {
                    messageDiv.textContent = '올바른 이메일 형식을 입력하세요.';
                    messageDiv.className = 'validation-message error';
                } else {
                    messageDiv.textContent = '';
                }
                validateForm();
            });

            // 이메일 중복확인 버튼
            document.getElementById('emailCheckBtn').addEventListener('click', checkEmailDuplicate);

            // 비밀번호 입력 이벤트
            document.getElementById('password').addEventListener('input', function() {
                const password = this.value;
                formState.password.valid = validatePassword(password);
                
                const messageDiv = document.getElementById('passwordMessage');
                if (password && !formState.password.valid) {
                    messageDiv.textContent = '영문, 숫자, 특수문자를 포함하여 8자 이상 입력하세요.';
                    messageDiv.className = 'validation-message error';
                } else if (formState.password.valid) {
                    messageDiv.textContent = '사용 가능한 비밀번호입니다.';
                    messageDiv.className = 'validation-message success';
                } else {
                    messageDiv.textContent = '';
                }
                
                // 비밀번호 확인도 다시 검사
                const passwordConfirm = document.getElementById('passwordConfirm').value;
                if (passwordConfirm) {
                    formState.passwordConfirm.valid = password === passwordConfirm;
                    const confirmMessageDiv = document.getElementById('passwordConfirmMessage');
                    if (!formState.passwordConfirm.valid) {
                        confirmMessageDiv.textContent = '비밀번호가 일치하지 않습니다.';
                        confirmMessageDiv.className = 'validation-message error';
                    } else {
                        confirmMessageDiv.textContent = '비밀번호가 일치합니다.';
                        confirmMessageDiv.className = 'validation-message success';
                    }
                }
                
                validateForm();
            });

            // 비밀번호 확인 입력 이벤트
            document.getElementById('passwordConfirm').addEventListener('input', function() {
                const password = document.getElementById('password').value;
                const passwordConfirm = this.value;
                
                formState.passwordConfirm.valid = password === passwordConfirm && passwordConfirm.length > 0;
                
                const messageDiv = document.getElementById('passwordConfirmMessage');
                if (passwordConfirm && !formState.passwordConfirm.valid) {
                    messageDiv.textContent = '비밀번호가 일치하지 않습니다.';
                    messageDiv.className = 'validation-message error';
                } else if (formState.passwordConfirm.valid) {
                    messageDiv.textContent = '비밀번호가 일치합니다.';
                    messageDiv.className = 'validation-message success';
                } else {
                    messageDiv.textContent = '';
                }
                validateForm();
            });

            // 이름 입력 이벤트
            document.getElementById('name').addEventListener('input', function() {
                const name = this.value;
                formState.name.valid = validateName(name);
                
                const messageDiv = document.getElementById('nameMessage');
                if (name && !formState.name.valid) {
                    messageDiv.textContent = '이름을 2자 이상 입력하세요.';
                    messageDiv.className = 'validation-message error';
                } else if (formState.name.valid) {
                    messageDiv.textContent = '';
                } else {
                    messageDiv.textContent = '';
                }
                validateForm();
            });

            // 휴대폰 입력 이벤트
            document.getElementById('phone').addEventListener('input', function() {
                let phone = this.value.replace(/[^\d]/g, '');
                
                // 자동 하이픈 추가
                if (phone.length > 3 && phone.length <= 7) {
                    phone = phone.replace(/(\d{3})(\d{1,4})/, '$1-$2');
                } else if (phone.length > 7) {
                    phone = phone.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
                }
                
                this.value = phone;
                formState.phone.valid = validatePhone(phone);
                formState.phone.verified = false; // 번호 변경시 인증 초기화
                
                const messageDiv = document.getElementById('phoneMessage');
                if (phone && !formState.phone.valid) {
                    messageDiv.textContent = '올바른 휴대폰 번호 형식을 입력하세요.';
                    messageDiv.className = 'validation-message error';
                } else {
                    messageDiv.textContent = '';
                }
                validateForm();
            });

            // 인증번호 발송 버튼
            document.getElementById('phoneVerifyBtn').addEventListener('click', sendVerificationCode);

            // 인증번호 확인 버튼
            document.getElementById('verifyCodeBtn').addEventListener('click', verifyCode);

            // 전체 약관 동의
            document.getElementById('allTerms').addEventListener('change', toggleAllTerms);

            // 개별 약관 체크박스
            document.querySelectorAll('input[type="checkbox"]:not(#allTerms)').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    this.parentElement.classList.toggle('checked', this.checked);
                    validateTerms();
                });
            });

            // 폼 제출 이벤트
            document.getElementById('signupForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
               // 1. 성공 메시지 표시
        alert('회원가입이 완료되었습니다!');
        
        // 2. 폼 초기화
        this.reset();

        // 3. 폼 상태 초기화
        formState.email.valid = false;
        formState.email.checked = false;
        formState.password.valid = false;
        formState.passwordConfirm.valid = false;
        formState.name.valid = false;
        formState.phone.valid = false;
        formState.phone.verified = false;
        formState.terms.valid = false;
        
        // 4. 모든 메시지 초기화
        document.querySelectorAll('.validation-message').forEach(msg => {
            msg.textContent = '';
        });
        
        // 5. 인증번호 입력 필드 숨기기
        const verificationGroup = document.getElementById('verificationGroup');
        if (verificationGroup) {
            verificationGroup.style.display = 'none';
        }
        
        // 6. 체크박스 상태 초기화
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
            checkbox.parentElement.classList.remove('checked');
        });
        
        // 7. 로그인 화면으로 전환 (화면 전환 함수 호출)
        setTimeout(() => {
            window.location.href = 'login.html'; // 로그인 화면 표시 함수 호출
        }, 1000); // 1초 후 전환

            
            });

        // 초기 유효성 검사
            validateForm();
        
        
        });
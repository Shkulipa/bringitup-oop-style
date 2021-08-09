export default class Form {
    constructor(formSelector) {
        this.forms = document.querySelectorAll(formSelector);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'loading...',
            success: 'Thx, all ok',
            failure: 'Sorry, something going wrong...'
        };
        this.path = 'assets/question.php'
    }

    clearInputs(elem) {
        elem.forEach(item => {
            item.value = '';
        });
    }

    checkMail(inputSelector){
        const mailInputs = document.querySelectorAll(inputSelector);
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', e => {
                if(e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    };

    initMask(inputSelector){
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if(elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.move('character', pos);
                range.select();
            }
        }
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length) {
                val = def;
            };
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if(event.type === 'blur') {
                if(this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        };
    
        let inputs = document.querySelectorAll(inputSelector);
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    };

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data,
        });

        return await res.text();
    }

    init() {
        this.checkMail('[type="email"]');
        this.initMask('[name="phone"]');

        this.forms.forEach(item => {
            item.addEventListener('submit', e => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: white;
                `;
                item.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;
                const formData = new FormData(item);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs(this.inputs);
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5e3);
                    })
            });
        });
    }
};
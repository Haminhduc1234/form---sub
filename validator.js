function Validator(options) {
    function validate(inputElement, rule) { // Truyền vào input của người dùng và rule
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector); //Lấy ra phần tử báo lỗi
        var errorMessage = rule.test(inputElement.value); //Kiểm tra xem có lỗi không 
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            // Thêm class màu đỏ
            inputElement.parentElement.classList.add('invalid');
        }
        else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');

        }

    }

    var formElement = document.querySelector(options.form) // Lấy ra form mà mình muốn validate
    if (formElement) {
        options.rules.forEach(rule => {
            var inputElement = formElement.querySelector(rule.selector);
            var errorElement = inputElement.parentElement.querySelector(options.errorSelector); //Lấy ra phần tử báo lỗi
            
            if (inputElement) {
                // Xử lý khi người dùng blur ra ngoài
                inputElement.onblur = function () {
                    validate(inputElement,rule);
                    console.log('blur');
                }
                inputElement.oninput = function() {
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }

}


//Định nghĩa ra các rules
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Hey , nhập tên nào bạn ơi!'
            // trim() để loại bỏ các khoảng cách khi người dùng nhập vào
        }
    }

}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if (regex.test(value))
            {
                return undefined;
            }
            else return 'Awww, hãy nhập email hợp lệ !' 

        }
    }
}
Validator.isPasswordLength = function (selector, minLength) {
    return {
        selector: selector,
        test: function (value) {
            if (value.length >= minLength)
            {
                return undefined;
            }
            else return 'Hi, hãy nhập password tối thiểu 6 kí tự cậu ơi!' 

        }
    }
}
Validator.isConfirmPassWord = function (selector, getValuePassWord) {
    return {
        selector: selector,
        test: function (value) {
            if (value == getValuePassWord())
            {
                return undefined;
            }
            else return 'Ohhh, mật khẩu nhập lại sai rồi cậu ơi!' 
        }
    }
}
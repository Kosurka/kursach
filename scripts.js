function register () {
    let log = jQuery('#login').val()
    let pas = $('#passw').val()
    let email = $('#email').val()

    $.post('register.php', {login:log, password:pas, email:email}, function(data){
        let otvet = JSON.parse(data) 

        if ('error' in otvet) {
            alert(otvet['error']['text'])
        }
        else if ('response' in otvet) {
            console.log(otvet)
            alert(otvet['response']['text'])
            window.location.href="login.html"
        }
        else {
            alert('Непредвиденная ошибка')
            console.log(data)
        }
    });
}

function login() {
    let log = $('#login').val()
    let pas = $('#passw').val()

    $.get('authorize.php', {login:log, password:pas}, function(data){
        let otvet = JSON.parse(data)
        console.log(otvet['response'])
        if ('Error' in otvet) {
            alert(otvet['Error']['text'])
        }
        else if ('response' in otvet) {

            if(otvet['response'].length ==1) {
                alert('Вы успешно авторизировались')
                user = otvet['response'][0]
                localStorage['login'] = user['login']
                localStorage['token'] = user['token']
                localStorage['expire'] = user['expiration']
                window.location.href="index.html"
            }
            else {
                alert('Такого пользователя нет')
                console.log(data)
            }
        };
    })
}
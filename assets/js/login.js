$(function() {
    // go to reg
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        // go to log
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            pwd: [/^[\S]{6,12}$/, 'password needs to between 6 - 12'],
            //check two time pwd same
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return 'two time password do not match'
                }

            }
        })
        // regester event
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            $.post('http://www.liulongbin.top:3007/api/reguser', {
                    username: $('#form_reg [name=username]').val(),
                    password: $('#form_reg [name=password]').val()
                },
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('successful')
                    $('#link_login').click()
                })
        })
        // login event
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('successful login')
                    //save the token into local storage
                localStorage.setItem('token', res.token)
                location.href = 'index.html'

            }
        })
    })
})
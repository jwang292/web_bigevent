$(function() {
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return 'nicknanme 1-6 chars'
            }
        }
    })

    inituserInfo();

    function inituserInfo() {
        $.ajax({

            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('get user info fail')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // reset form data
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        inituserInfo()
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('reset user info fail')
                }
                layer.msg('reset user info success')
                window.parent.getUserInfo()

            }
        })
    })
})
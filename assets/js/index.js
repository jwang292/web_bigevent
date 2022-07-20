$(function() {

    getUserInfo()

    var layer = layui.layer

    $('#btnLogout').on('click', function() {
        layer.confirm('logout??', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = 'login.html'
            layer.close(index)
        })
    })


    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('get user info fail')
                }
                //call function
                renderAvatar(res.data)
            }
        })
    }
    // user pics
    function renderAvatar(user) {
        var name = user.nickname || user.username
        $('#welcome').html('welcome  ' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }

})
var homeTpl = require('../../views/home.html');

module.exports = {
    template: homeTpl,
    data: function () {
        return{
            homeSwiper: null,
            hotSwiper: null
        }
    },
    methods: {
        changeHome: function (e, n) {
            var $el = $(e.target);
            this.homeSwiper.slideTo(n);
            $el.addClass('active').siblings().removeClass('active');
        },
        changeHot: function (e, n) {
            var $el = $(e.target);
            this.hotSwiper.slideTo(n);
            $el.addClass('active').siblings().removeClass('active');
        }
    },
    ready: function () {
        var me = this;
        console.log(Swiper)
        me.homeSwiper = new Swiper('#home-swiper', {
            loop: false
        });

        me.hotSwiper = new Swiper('#home-hot-swiper', {
            loop: false
        });
        //TODO 这里需要动态取值
        var winHeight = $(window).height() - 44 - 40 - 44;
        $('#home-hot-swiper').css('height', winHeight + 'px')
    }
}
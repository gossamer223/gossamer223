$('#J_SearchCancel').on('input', function () {
    var keywords = $(this).val();
    console.log(keywords);
    buildList(keywords);
})
/**
 * 字符串拼接
 * 1 +  chrome V8 效率更高
 * 2 arr.join("") 稍微清楚  IE下效率更高
 */
function buildList(keywords) {
    var ul = $('#J_SearchList ul');
    var html = "";
    var arr = [];
    var len = Math.round(Math.random()*10);
    for (var i = 0; i < len; i++) {
        html += "<li>" + i + "</li>";
//        arr.push("<li>" + i + "</li>")
    }
    ul.html(html);
//    ul.html(arr.join(""));
}

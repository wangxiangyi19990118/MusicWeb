function signout(){
	$.cookie("userid", "", { expires: 7, path: '/' });
	$.cookie("nickname", "", { expires: 7, path: '/' });
}
function createList(){
	if($.cookie('userid') == "" || $.cookie('userid') == null){
		alert("请先登录！");
		self.location="signin.html";
	}
	else{
		self.location="create-list.html";
	}
}
function basic(){
    localMusicLists="";
    $.ajax({
        type: "GET",
        url: "/MusicWeb/api/musicsheet/getInfo?userid=" + $.cookie('userid'),
        data: {},
        async: true,
        success: function(datas) {
			if(datas.status==403){
				$.cookie("userid", "", { expires: 7, path: '/' });
				$.cookie("nickname", "", { expires: 7, path: '/' });
			}
            localMusicLists += "<li class='hidden-nav-xs padder m-t m-b-sm text-xs text-muted'>" +
                "<span class='pull-right'><a onclick='createList()' href='javascript:void(0);'><i class='icon-plus i-lg'></i></a></span>" +
                "Playlist" +
                "</li>";
            for (var i = 0; i < datas.data.length; i++) {
		
                if (datas.data[i].totalSongs == 0) {
                    localMusicLists += "<li>" +
                        "<a href='song-list.html?id=" + datas.data[i].id + "&name=" + datas.data[i].name + "&photo="+datas.data[i].pictureUrl+"' >" +
                        "<i class='icon-music-tone icon'></i>" +
                        "<span>" + datas.data[i].name + "</span>" +
                        "</a>" +
                        "</li>";
                } else {
                    localMusicLists += "<li>" +
                        "<a href='song-list.html?id=" + datas.data[i].id + "&name=" + datas.data[i].name + "&photo="+datas.data[i].pictureUrl+"' >" +
                        "<i class='icon-playlist icon text-success-lter'></i>" +
                        "<b class='badge bg-success dker pull-right'>" + datas.data[i].totalSongs + "</b>" +
                        "<span>" + datas.data[i].name + "</span>" +
                        "</a>" +
                        "</li>";
                }
            }
        $("#localMusicLists").html(localMusicLists);

        }
    });
	nickname = $.cookie('nickname');
	dorpdown="<a href='#' class='dropdown-toggle bg clear' data-toggle='dropdown'>"+
	"<span class='thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm'>"+
	"<img src='images/a0.png' alt='...'></span>" + nickname + "<b class='caret'></b></a>"+
	"<ul class='dropdown-menu animated fadeInRight'><li><span class='arrow top'></span><a href='setting.html'>Settings</a>"+
	"</li><li><a href='profile.html'>Profile</a></li><li class='divider'></li><li><a onclick='signout()' href='signin.html' data-toggle='' >Logout</a>"+
	"</li></ul>";
    if ($.cookie('userid') == "" || $.cookie('userid') == null) {
        $("li.dropdown").hide();
        $("footer").hide();
    } else {
        $("li.dropdown").html(dorpdown);
		document.getElementById("nickName").innerHTML=nickname;
        $("footer").show();
    }
}

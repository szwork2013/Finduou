if(strdecode(getCookie('token'))==''||strdecode(getCookie('token'))==undefined||strdecode(getCookie('token'))==-1)
{
	window.location.href = 'index.html'
}
var Top = React.createClass({displayName: "Top",
	render:function(){
		return(
				React.createElement("div", null, 
					React.createElement(Nav, null), 
					React.createElement(Left, null)
				)
			)
	}
});
//
var Nav = React.createClass({displayName: "Nav",
	getInitialState:function(){
		return {
			'onoff':false
		}
	},
	handleClick:function(){
		this.setState({
			'onoff':!this.state.onoff
		})
	},
	render:function(){
		return(
				React.createElement("nav", {id: "header-right", className: "fr"}, 
					React.createElement("a", {href: "activeList.html"}, React.createElement("span", null)), 
					React.createElement("a", {href: "myData.html"}, React.createElement("span", null)), 
					React.createElement("a", {href: "#", onClick: this.handleClick}, React.createElement("span", null)), 
					React.createElement(List, {onoff: this.state.onoff})
				)
			)
	}
});
//
var Left = React.createClass({displayName: "Left",
	render:function(){
		return(
				React.createElement("div", {id: "header-left", class: "fl"}, 
					React.createElement("img", {src: "img/list/logo.png"}), 
					React.createElement("strong", null, "活动管理")
				)
			)
	}
});
//
var List = React.createClass({displayName: "List",
	handleClick:function(){
		removeCookie('email');
		removeCookie('id')
		removeCookie('pwd')
		removeCookie('token')
		window.location.href = 'index.html'
	},
	render:function(){
		return (
				React.createElement("ul", {id: "nav-list", style: {display:this.props.onoff?'block':'none'}}, 
					React.createElement("a", {href: "mPassword.html", className: "not-float"}, React.createElement("li", null, "修改密码")), 
					React.createElement("a", {href: "javaScript:;", className: "not-float", onClick: this.handleClick}, React.createElement("li", null, "登出"))
				)
			)
	}
});
//
React.render(
	React.createElement(Top, null),
	document.getElementById('header-box')
)
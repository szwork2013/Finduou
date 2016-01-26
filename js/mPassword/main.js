var Main = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState:function(){
		return {'old':'','newA':'','newB':''}
	},
	render:function(){
		return(
				<div className="operate-box">
					<M1 valueLink={this.linkState('old')}/>
					<M2 valueLink={this.linkState('newA')}/>
					<M3 valueLink={this.linkState('newB')}/>
					<M4 data={this.state}/>
				</div>
			)
	}
})
//
var M1 = React.createClass({
	render:function(){
		return(
				<div className="fill-wrap">
					<label>原密码：</label>
					<input id="ipast" type="password" valueLink={this.props.valueLink} />
					<span>请输入原密码</span>
				</div>
			)
	}
})
//
var M2 = React.createClass({
	render:function(){
		return(
				<div className="fill-wrap">
					<label>新密码：</label>
					<input id="inow" type="password" valueLink={this.props.valueLink} />
					<span>两次密码输入不一致</span>
				</div>
			)
	}
})
//
var M3 = React.createClass({
	render:function(){
		return(
				<div className="fill-wrap">
					<label className="not">确认密码：</label>
					<input id="resure" type="password" valueLink={this.props.valueLink} />
					<span>两次密码输入不一致</span>
				</div>
			)
	}
})
//
var M4 = React.createClass({
	getInitialState:function(){
		return {'onoff':false}
	},
	handleClick:function(){
		//console.log(this.props.data)
		var onoff = true;
		var obj = this.props.data;
		this.setState({
			'onoff':true
		})
		if(obj.old==''){
			$('#ipast').next().show();
			onoff = false;
		}else{
			$('#ipast').next().hide();
		}
		if(obj.newA==''){
			$('#inow').next().html('新密码不能为空').show();
			onoff = false;
		}else{
			$('#inow').next().hide();
		}
		if(obj.newB==''){
			$('#resure').next().html('新密码不能为空').show();
			onoff = false;
		}else{
			$('#resure').next().hide();
		}
		if(obj.newB!=obj.newA){
			$('#inow').next().html('两次密码输入不一致').show();
			$('#resure').next().html('两次密码输入不一致').show();
			onoff = false;
		}else{
			if(onoff)
			{
				$('#inow').next().hide();
				$('#resure').next().hide();
			}
		}
		if(onoff){
			alert('通过')
		}else{
			this.setState({
			'onoff':false
			})
		}
	},
	render:function(){
		return(
				<div className="btn-wrap">
					<button id="submit-btn" onClick={this.handleClick} disabled={this.state.onoff}>重置</button>
				</div>
			)
	}
})
//

React.render(
	<Main/>,
	document.getElementById('operate-group')
)
var list;
var Note = React.createClass({
  deleNote: function(){
    $.post("/deleteNote",{idDelete: this.props.id}, function(data){
      list.setState({mang: data});
    });
  },
  editNote: function(){
    this.setState({onEdit: true});
  },
  getInitialState: function(){
    return (
      {onEdit: false}
    )
  },
  saveNote: function(){
    var note = this;
    $.post("/updateNote", {idSua: this.props.id, noiDung: this.refs.txt.value}, function(data){
      list.setState({mang: data});
      note.setState({onEdit: false});
    })
  },
  cancelNote: function(){
    this.setState({onEdit: false});
  },
  render: function(){
    if(this.state.onEdit){
      return(
        <div className="div-edit">
          <input ref="txt" defaultValue={this.props.children}/>
          <button onClick={this.saveNote}>Lưu </button>
          <button onClick={this.cancelNote}> Hủy </button>
        </div>
      )
    }else{
      return (
        <div className="div-note">
          <p>{this.props.children}</p>
          <button onClick={this.deleNote}>Xóa </button>
          <button onClick={this.editNote}> Sửa </button>
        </div>
      )
    }
  }
});
function addDiv(){
  ReactDOM.render(<InputDiv/>, document.getElementById("div-add"));
}
var List = React.createClass({

  getInitialState: function(){
    list = this ;
    return {mang:[]}
  },
  render: function(){
    return(
      <div className="div-list">
      <div id="div-add"> </div>
      <button onClick={addDiv}> Thêm </button>
      {
        this.state.mang.map(function(note, index){
          return <Note key={index} id={index}>{note}</Note>
        })
      }
      </div>
    );
  },
  componentDidMount(){
    var that = this;
    $.post("/getNotes", function(data){
      that.setState({mang: data});
    })
  }
})
var InputDiv = React.createClass({
  sendNote(){
    $.post("/add", {note: this.refs.txt.value}, function(data){
      list.setState({mang: data});
    });
    ReactDOM.unmountComponentAtNode(document.getElementById("div-add"));
  },
  render: function(){
    return (
      <div>
        <input type="text" ref="txt" placeholder="Enter your note!"/>
        <button onClick={this.sendNote}>Gui</button>
      </div>
    )
  }
})
ReactDOM.render(
  <div>
    <List/>
  </div>,
  document.getElementById("root")
)

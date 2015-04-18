var podcasts = [{title:"asdf1"},{title:"asdf2"},{title:"asdf3"}];

var PodcastBox = React.createClass({
    onChange: function(e) {
        this.setState({text: e.target.value});
    },
    getInitialState: function() {
        return {podcasts: []};
      },
    componentDidMount: function() {
        $.ajax({
              url: 'http://service.fxos.com.br/podcasts?limit=3',
              dataType: 'json',
              success: function(data) {
                  console.log('data', data);
                this.setState({podcasts: data});
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
              }.bind(this)
        });
        
    },
    render : function(){
        return (
            <div className="podcastBox">
                <PodcastList podcasts={this.state.podcasts} />
            </div>
        );
    }
});

var PodcastList = React.createClass({
    render : function() {
        var podcastNodes = this.props.podcasts.map(function (podcast) {
          return (
            <PodcastItem podcast={podcast} />
          );
        });
        return (
            <div className="podcastList">
                {podcastNodes}
            </div>
        );
    }
});
var PodcastItem = React.createClass({
    render : function(){
        return (
            <div>
            <PodcastTitle podcast={this.props.podcast}></PodcastTitle>
            <br />
            <PodcastAudio mp3={this.props.podcast.mp3}/>
            </div>
            
        );
    }
});
var PodcastSearchForm = React.createClass({
    render : function(){
        return (
            <form class="pure-form">
                <input type="text" onChange={this.onChange} value={this.state.text} class="pure-input-rounded" />
            </form>
        );
    }
});
var PodcastTitle = React.createClass({
    render : function(){
        return (
            <a target="_blank" className="podcastTitle" href={this.props.podcast.link}>{this.props.podcast.title}</a>
        );
    }
});
var PodcastAudio = React.createClass({
    render : function(){
        return (
            <audio className="podcastAudio" controls src={this.props.mp3} > </audio>
        );
    }
});

React.render(
    <PodcastBox podcasts={podcasts}/>,
    document.getElementById("podcatcher-body")
);
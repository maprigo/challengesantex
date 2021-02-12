import React, { PropTypes }     from 'react';
import { connect }              from 'react-redux';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import { fetchGames }           from '../../actions/home';
import NewGameButton            from '../../components/game/new_game_button';
import ListItem                 from '../../components/game/list_item';
import Logo                     from '../../components/common/logo';
import { setDocumentTitle }     from '../../utils';

class HomeIndexView extends React.Component {
  componentDidMount() {
    const { dispatch, lobbyChannel } = this.props;

    setDocumentTitle('Ahoy, Matey!');
    dispatch(fetchGames(lobbyChannel));
  }

  _renderCurrentGames() {
    const { currentGames } = this.props;

    if (currentGames.length === 0) return false;

    const gameNodes = currentGames.map((game) => {
      return (
        <ListItem key={game.id} game={game}/>
      );
    });

    return (
      <section>
        <h2>Current games</h2>
        <ul className="current-games">
          <ReactCSSTransitionGroup
            transitionName="item"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {gameNodes}
          </ReactCSSTransitionGroup>
        </ul>
      </section>
    );
  }

  render() {
    const { lobbyChannel, dispatch } = this.props;

    return (
      <div id="home_index" className="view-container">
        <header>
          <Logo/>
          <h1>Hi Guys <br/>welcome to Santex Battleship!</h1>
          <NewGameButton lobbyChannel={lobbyChannel} dispatch={dispatch}>Start new battle!</NewGameButton>
        </header>
        {::this._renderCurrentGames()}
        <footer>
          <p>crafted with ♥ by <a target="_blank" href="http://maprigo.com/">@maprigo</a></p>
          <p><a target="_blank" href="https://github.com/maprigo/challengesantex"><i className="fa fa-github"/> source code</a></p>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { ...state.session, ...state.home }
);

export default connect(mapStateToProps)(HomeIndexView);

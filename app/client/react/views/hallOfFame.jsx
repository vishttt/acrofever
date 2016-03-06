const HallOfFameAcroCard = React.createClass({
    mixins: [ReactMeteorData],
    propTypes: {
        acro: React.PropTypes.shape({
            userId: React.PropTypes.string.isRequired,
            acronym: React.PropTypes.array.isRequired,
            acro: React.PropTypes.string.isRequired,
            category: React.PropTypes.string.isRequired,
            created: React.PropTypes.instanceOf(Date).isRequired
        })
    },
    getMeteorData() {
        return {
            profilePicture: profilePicture(this.props.acro.userId, 35),
            username: displayname(this.props.acro.userId)
        }
    },
    openProfilePopup(evt) {
        evt.preventDefault();
        Session.set('selectedProfileUserId', this.props.acro.userId);
        $('#profileModal').modal('show');
    },
    render() {
        return (
            <div className="ui card">
                <div className="content">
                    <div className="header">{this.props.acro.acronym.join('. ')}</div>
                    <div className="meta">{this.props.acro.category}</div>
                    <div className="description">{this.props.acro.acro}</div>
                </div>
                <div className="content">
                    <div className="ui list">
                        <a href="#" className="userProfilePicture item" onClick={this.openProfilePopup}>
                            <img className="ui avatar image" src={this.data.profilePicture} />
                            <div className="content">
                                <div className="header">{this.data.username}</div>
                                <div className="description">{moment(this.props.acro.created).calendar()}</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
});

const HallOfFameView = React.createClass({
    mixins: [ReactMeteorData],
    getInitialState() {
        return {
            limit: new ReactiveVar(18),
            totalAcros: new ReactiveVar()
        };
    },
    getMeteorData() {
        var data = {
            limit: this.state.limit.get(),
            totalAcros: this.state.totalAcros.get()
        };

        var handle = Meteor.subscribe('hallOfFame', data.limit);
        data.acros = HallOfFame.find({}, {sort: {created: -1}}).fetch();

        var userIds = data.acros.map((acro) => acro.userId);

        var handle2 = Meteor.subscribe('otherPlayers', userIds);
        data.ready = handle.ready() && handle2.ready();

        var self = this;
        Meteor.call('hallOfFameAcroCount', (err, res) => {
            if (err) return console.log(err);
            self.state.totalAcros.set(res);
        });

        return data;
    },
    componentWillMount() {
        //SEO stuff
        var title = 'Hall of Fame - Acrofever';
        var description = 'The crème de la crème. Acrofever is an Acrophobia clone for the modern web. If you never played Acrophobia, it\'s a fun, zany word game in which players create phrases from a randomly generated acronym, then vote for their favourites.';
        var metadata = {
            'description': description,
            'og:description': description,
            'og:title': title,
            'og:image': 'https://acrofever.com/images/fb-image.png',
            'twitter:card': 'summary'
        };

        DocHead.setTitle(title);
        _.each(metadata, function(content, name) {
            DocHead.addMeta({name: name, content: content})
        });
    },
    getMore(evt) {
        evt.preventDefault();
        var limit = this.state.limit.get();
        limit += 18;
        this.state.limit.set(limit);
    },
    render() {
        var getMoreButton = (
            <button className={"ui labeled icon" + (this.data.ready ? "" : " loading") + " button"} onClick={this.getMore}>
                <i className="plus icon"></i>
                Get more
            </button>
        );

        return (
            <div>
                <h2 className="ui header">
                    <i className="trophy icon"></i>
                    <div className="content">
                        Hall of Fame
                        <div className="sub header">The crème de la crème.</div>
                    </div>
                </h2>
                <p>
                    At the end of a game of Acrofever, players vote on their overall favourite acro from the game to be
                    added to the Hall of Fame.<br />
                    You too could be immortalised on the Hall of Fame one day, so <a href={FlowRouter.path('play')}>get playing</a>!
                </p>
                <div className="ui cards">
                    {this.data.acros.map((acro, index) => <HallOfFameAcroCard key={index} acro={acro} />)}
                </div>
                <div className="ui hidden divider"></div>
                {(this.data.limit < this.data.totalAcros) ? getMoreButton : null}
            </div>
        );
    }
});

Template.registerHelper('HallOfFameView', () => HallOfFameView);
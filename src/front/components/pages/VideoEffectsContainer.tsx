import * as React from "react";
import { connect } from 'react-redux';
import {getEffects} from "front/actions/actions";

class VideoEffectsContainer extends React.Component<any, any> {
	componentDidMount(){
		getEffects();
	}

	renderEffectsList (effects){
		return effects.map ((effect, key) => {
			if (effect){
				return (
					<li key={effect.id} data-id={effect.id}>
						<span>{effect.name}</span>
					</li>
				)
			}
		})
	}
	render(): JSX.Element {

		return (
			<div>
				<h3> Effects </h3>
				<ul>
					{this.renderEffectsList(this.props.effects)}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state =>
	({
		effects: state.effects.getIn(['effects'], [])
	});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoEffectsContainer)
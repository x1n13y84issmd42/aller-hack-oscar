import * as React from "react";
import { connect } from 'react-redux';
import { getEffects } from "front/actions/actions";

class VideoEffectsContainer extends React.Component<any, any> {
	componentDidMount() {
		getEffects();
	}

	onEffectItemDragStart = (event, effectItem) => {
		const jsonEffectItem = JSON.stringify(effectItem);
		event.dataTransfer.setData('DraggedEffectItem', jsonEffectItem);
	}

	renderEffectsList(effects) {
		return effects.map((effect) => {
			if (!effect) {
				return;
			}
			return (
				<li
					key={effect.id}
					data-id={effect.id}
					onDragStart={(e) => this.onEffectItemDragStart(e, effect)}
					draggable
				>
					<span>{effect.name}</span>
				</li>
			)
		})
	}
	render(): JSX.Element {

		return (
			<div>
				<h3>Effects</h3>
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
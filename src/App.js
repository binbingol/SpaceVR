import React from 'react';
import {
  asset,
  Pano,
  View,
  Model,
  AmbientLight,
  StyleSheet,
} from 'react-vr';
import Button from './components/button';

const styles = StyleSheet.create({
  textStyle: {
    backgroundColor: '#777879',
    fontSize: 0.8,
    fontWeight: '400',
    layoutOrigin: [0.5, 0.5],
    paddingLeft: 0.2,
    paddingRight: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
    transform: [{ translate: [0, 0, -3] }],
  },
  menuStyle: {
    flex: 1,
    flexDirection: 'column',
    width: 1,
    alignItems: 'stretch',
    transform: [{ translate: [2, 2, -5] }],
  },
});

class SpaceVR extends React.Component {
  constructor() {
    super();

    this.state = {
      rotation: 130,
      zoom: -70,
    };

    this.spaceSkymap = [
      '../static_assets/space/nebula_right.png',
      '../static_assets/space/nebula_left.png',
      '../static_assets/space/nebula_up.png',
      '../static_assets/space/nebula_down.png',
      '../static_assets/space/nebula_front.png',
      '../static_assets/space/nebula_back.png',
    ];

    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
    this.rotationSpeed = 150;
  }

  componentDidMount() {
    this.rotate();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  rotate() {
    const now = Date.now();
    const deltaTime = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({
      rotation: this.state.rotation + (deltaTime / this.rotationSpeed),
    });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  render() {
    const earthStyle = {
      transform: [
        { translate: [-25, 0, this.state.zoom] },
        { scale: 0.05 },
        { rotateY: this.state.rotation },
        { rotateX: 20 },
        { rotateZ: -10 },
      ],
    };

    const moonStyle = {
      transform: [
        { translate: [10, 10, this.state.zoom - 30] },
        { scale: 0.05 },
        { rotateY: this.state.rotation / 3 },
      ],
    };

    return (
      <View>
        <Pano source={{ uri: this.spaceSkymap }} />
        <AmbientLight intensity={2.6} />
        <Model style={earthStyle} source={{ obj: asset('earth/earth.obj'), mtl: asset('earth/earth.mtl') }} lit={true} />
        <Model style={moonStyle} source={{ obj: asset('moon/moon.obj'), mtl: asset('moon/moon.mtl') }} lit={true} />

        <View style={styles.menuStyle}>
          <Button
            text="+"
            callback={() => this.setState((prevState) => ({ zoom: prevState.zoom + 10 }))}
          />
          <Button
            text="-"
            callback={() => this.setState((prevState) => ({ zoom: prevState.zoom - 10 }))}
          />
        </View>
      </View>
    );
  }
}

// <Pano source={asset('chess-world.jpg')} />
// <Pano source={asset('sample-download.jpg')} />
{/*<Text style={styles.textStyle}>
  hello
</Text>*/ }

export default SpaceVR;


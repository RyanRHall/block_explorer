// libraries
import React from "react"
import { bindAll } from "lodash";

class DependentLoader extends React.Component {

  /************ Lifecycle Methods ************/

  componentDidMount() {
    this.props.addDependancy();
  }

  componentWillUnmount() {
    this.props.removeDependancy();
  }

  /***************** Render ******************/

  render() {
    return this.props.children
  }
}

class Loader extends React.Component {

  /*************** Constructor ***************/

  constructor(props) {
    super(props);
    bindAll(this, [ "addDependancy", "dependentComponent", "removeDependancy", "setLoaded", "setDependentLoaded" ])
    this.dependentCount = 0;
    this.dependentLoadedCount = 0;
    this.state = {
      isLoaded: false
    }
  }

  /************** Public Methods *************/

  setLoaded(isLoaded) {
    this.setState({ isLoaded })
  }

  setDependentLoaded(isLoaded) {
    debugger
    this.dependentLoadedCount = this.dependentLoadedCount + (isLoaded ? 1 : -1);
    this.setState({
      isLoaded: this.dependentLoadedCount === this.dependentCount
    });
  }

  addDependancy() {
    debugger
    this.dependentCount++;
  }

  removeDependancy() {
    this.dependentCount--;
  }

  dependentComponent(Component) {
    return props => (
      <DependentLoader addDependancy={this.addDependancy} removeDependancy={this.removeDependancy}>
        <Component {...props} isLoaded={this.state.isLoaded} setLoaded={this.setDependentLoaded}/>
      </DependentLoader>
    );
  }

  /***************** Render ******************/

  render() {
    return this.props.render({
      isLoaded: this.state.isLoaded,
      setLoaded: this.setLoaded,
      dependentComponent: this.dependentComponent
    });
  }
}

export const withLoader = Component => props => {
  const render = componentProps => <Component {...props} {...componentProps} />
  return <Loader render={render} />
}

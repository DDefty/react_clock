import React from 'react';
import './App.scss';
import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type AppState = {
  clockName: string;
  hasClock: boolean;
};

export class App extends React.Component<{}, AppState> {
  nameTimerId?: number;

  contextHandler = (event: MouseEvent) => {
    event.preventDefault(); // not to show the context menu

    this.setState({ hasClock: false });
  };

  clickHandler = () => {
    this.setState({ hasClock: true });
  };

  state = {
    clockName: 'Clock-0',
    hasClock: true,
  };

  componentDidMount() {
    // start name updater
    this.nameTimerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);

    document.addEventListener('contextmenu', this.contextHandler);
    document.addEventListener('click', this.clickHandler);
  }

  componentWillUnmount() {
    if (this.nameTimerId) {
      clearInterval(this.nameTimerId);
    }

    document.removeEventListener('contextmenu', this.contextHandler);
    document.removeEventListener('click', this.clickHandler);
  }

  componentDidUpdate(): void {
    // rename logging is handled by the Clock component's componentDidUpdate
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>

        {this.state.hasClock ? <Clock name={this.state.clockName} /> : null}
      </div>
    );
  }
}

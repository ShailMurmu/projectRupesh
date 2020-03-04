import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './App.css';

const MenuItem = ({text, selected}) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

export const Menu = (list, selected) =>
  list.map(el => {
    const {prefName} = el;
 
    return <MenuItem text={prefName} key={prefName} selected={selected} />;
  });

const Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = '北海道';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected,
      prefList: []
    }

    this.menuItems = Menu(this.state.prefList, selected);
  }

  onSelect = key => {
    this.setState({ selected: key });
  }

  componentDidMount(){
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "0TcDvnFjHBuHwOTpnMkYeE4c4KZVTTObEOedJxsg"
      }
    }).then(res => {
      res.json().then(data => {
          this.setState({prefList: this.state.prefList.concat(data.result)});
      });
    });
  }

  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;
 
    return (
      <div className="App">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
        />
        <div>{this.state.prefList[0]}</div>
      </div>
    );
  }
}

export default App;

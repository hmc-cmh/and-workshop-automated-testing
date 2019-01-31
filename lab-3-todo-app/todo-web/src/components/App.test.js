import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  let app;
  beforeEach(() => {
    app = shallow(<App />);
  });
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('Renders an app bar at the top', () => {
    const appBar = app.find('WithStyles(AppBar)').at(0);
    expect(appBar.exists()).toBe(true);
  });

  it('Renders a <Toolbar /> inside the top <AppBar />', () => {});

  it('Renders an app bar at the bottom', () => {
    const appBarBottom = app.find('AppBar').at(1);
    expect(appBarBottom).toBeTruthy();
  });

  it('Renders an Icon in App Bar', () => {
    const appBar = app.find('WithStyles(AppBar)').at(1);
    expect(appBar.find('pure(FavoriteIcon)').exists()).toBe(true);
  });

  it('Renders a ToDo component', () => {
    const toDoComponent = app.find('Todo');
    expect(toDoComponent.length).toEqual(1);
  });

  it('Renders a ToDo component inside main', () => {
    const main = app.find('main');
    expect(main.find('Todo')).toBeTruthy();
    expect(main.find('Todo').prop('label')).toBe('What do you want to do?');
    expect(main.find('Todo').prop('autoFocus')).toBe(true);
  });
});

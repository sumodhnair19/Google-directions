import React from 'react';
import renderer from 'react-test-renderer';
import NavigationRouteInfo from './NavigationRouteInfo';

describe('Navigation Route Info Test', () => {
    it('render correctly', () => {
        const tree = renderer.create(<NavigationRouteInfo />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

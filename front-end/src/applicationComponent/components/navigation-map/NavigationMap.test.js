import React from 'react';
import renderer from 'react-test-renderer';

import NavigationMap from './NavigationMap';

describe('Navigation Map Test', () => {
    it('render correctly', () => {
        const tree = renderer.create(<NavigationMap />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

import React from 'react';
import renderer from 'react-test-renderer';

import NavigationForm from './NavigationForm';

describe('Navigation Form Test', () => {
    it('render correctly', () => {
        const tree = renderer.create(<NavigationForm />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

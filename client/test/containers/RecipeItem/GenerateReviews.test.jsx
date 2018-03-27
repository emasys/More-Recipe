import React from 'react';
import { shallow, mount } from 'enzyme';
import Router from 'react-mock-router';

// Component
import GenerateReviews from '../../../src/containers/RecipeItem/GenerateReviews';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

Date.now = jest.fn(() => 1487076708000);
describe('Test suite for GenerateReview component ', () => {
  describe('Render component with empty props', () => {
    const props = {
      review: {},
      deleteReview: jest.fn(),
      auth: {}
    };

    beforeEach(() => {
      wrapper = shallow(<GenerateReviews {...props} />);
    });
    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('p').text()).toMatch('Loading comments...');
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Render component with props', () => {
    const props = {
      review: {
        review: {},
        fetch_reviews: [
          {
            id: 1,
            content: 'new comment',
            createdAt: '2018-03-15T08:03:50.868Z',
            updatedAt: '2018-03-15T08:03:50.868Z',
            recipeId: 1,
            userId: 1,
            reviewsreply: [],
            User: {
              moniker: 'admin',
              avatar: null
            }
          }
        ],
        count_reviews: 1
      },
      deleteReview: jest.fn(),
      auth: fakeStore.user
    };

    beforeEach(() => {
      wrapper = mount(<Router>
        <GenerateReviews {...props} />
      </Router>);
    });
    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('p.mb-0.text-dark').text()).toMatch('new comment');
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should delete review', () => {
      wrapper.find('.delete-review-btn').simulate('click');
      expect(props.deleteReview).toBeCalled();
    });
  });
});

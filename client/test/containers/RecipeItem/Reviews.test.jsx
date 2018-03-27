import React from 'react';
import { mount, shallow } from 'enzyme';
import Router from 'react-mock-router';

// Component
import {
  Reviews,
  mapStateToProps
} from '../../../src/containers/RecipeItem/Reviews';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

jest.mock('../../../src/components/Navbar');
Date.now = jest.fn(() => 1487076708000);

describe('Test suite for Reviews component', () => {
  describe('Render component with one review', () => {
    const props = {
      postReview: jest.fn(),
      recipes: fakeStore.recipes,
      deleteReview: jest.fn(),
      clearReview: jest.fn(),
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
      auth: fakeStore.user
    };
    beforeEach(() => {
      wrapper = shallow(<Reviews {...props} />);
    });

    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('h5.text-center.text-muted').text()).toMatch('Reviews');
      expect(wrapper.find('span.badge.badge-dark').text()).toMatch('1');
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('Should submit a review', () => {
      const instance = wrapper.instance();
      const handleSubmit = jest.spyOn(instance, 'handleForm');
      wrapper
        .find('TextareaAutosize#reviewField')
        .simulate('change', { target: { value: 'A regular food' } });

      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });
      expect(handleSubmit).toBeCalled();
    });

    it('should delete a review and unmount', () => {
      const app = mount(<Router>
        <Reviews {...props} />
      </Router>);
      app.find('i.delete-review-btn').simulate('click');
      app.unmount();
      expect(props.clearReview).toBeCalled();
    });
    it('should call componentWillReceiveProps', () => {
      const instance = wrapper.instance();
      const compWRP = jest.spyOn(instance, 'componentWillReceiveProps');
      const loadMore = jest.spyOn(instance, 'loadMoreReviews');
      const newProps = {
        postReview: jest.fn(),
        recipes: fakeStore.recipes,
        deleteReview: jest.fn(),
        getReviews: jest.fn(),
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
              User: {
                moniker: 'admin',
                avatar: null
              }
            },
            {
              id: 2,
              content: 'new comment',
              createdAt: '2018-03-15T08:03:50.868Z',
              updatedAt: '2018-03-15T08:03:50.868Z',
              recipeId: 1,
              userId: 1,
              User: {
                moniker: 'admin',
                avatar: null
              }
            }
          ],
          count_reviews: 2
        },
        auth: fakeStore.user
      };
      wrapper.setProps(newProps);
      expect(compWRP).toHaveBeenCalled();
      expect(instance.state.showMore).toBe(true);
      wrapper
        .find('button.btn.mt-10.btn-lg.btn-block.bg-light')
        .simulate('click', {
          preventDefault: () => {}
        });
      expect(loadMore).toHaveBeenCalled();

      wrapper.setState({ offset: 3 });
      wrapper.setProps(newProps);
      expect(compWRP).toHaveBeenCalled();
      expect(instance.state.showMore).toBe(false);
    });

    it('should test mapStateToProps', () => {
      const initialState = {
        review: {},
        recipes: {},
        user: {}
      };
      expect(mapStateToProps(initialState).auth).toEqual({});
      expect(mapStateToProps(initialState).recipes).toEqual({});
      expect(mapStateToProps(initialState).review).toEqual({});
    });
  });
});

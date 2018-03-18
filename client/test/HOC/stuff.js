// react libraries
import * as React from 'react';

// third party libraries
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { spy } from 'sinon';

// component
import { ContributionModal } from './ContributionModal.component';

// fixtures
import { sampleContribution } from '../../fixtures/contribution';
import { mockStore } from '../../fixtures/store';
import { user } from '../../fixtures/user';

const store = createMockStore(mockStore);

const toggleVoteSpy = spy();
const DeleteDialogToggleSpy = spy();

const handleToggle = () => {  };

describe('<ContributionModal />', () => {
  const props = {
    contribution: sampleContribution,
    handleDeleteDialogToggle: DeleteDialogToggleSpy,
    handleToggle,
    toggleVote: toggleVoteSpy,
    toogleDeleteDialog: false,
    user,

  };

  // This user is not an Admin and does not own any contribution
  const userTwo = {
    ...user,
    id: '-KOPwad213QDA',
    roles: {
      Andelan: 'andelan',
      Fellow: 'Fellow',
    },
  };

  const wrapper = mount(<Provider store={store}>
      <ContributionModal {...props} />
    </Provider>,);

  const wrapperTwo = shallow(<ContributionModal {...props} />,);

  // create a wrapper without contribution author's details
  const contribution = { ...sampleContribution };
  delete (contribution.userDetail);

  it('renders a contribution modal', () => {
    expect(wrapper.find('ContributionModal')).to.have.length(1);
  });

  it('renders a Dialog component', () => {
    expect(wrapper.find('Dialog')).to.have.length(1);
  });

  it('ContributionModal modal receives a contribution in props', () => {
    expect(wrapper.find('ContributionModal').props().contribution).to.equal(sampleContribution,);
  });

  it('Dialog component receives a style class in props', () => {
    expect(wrapper.find('Dialog').props().children.props.className).to.equal('modal-container',);
  });

  it('should render edit icon with className "detail-edit" if owner contribution', () => {
    expect(wrapper.render().find('.detail-edit')).to.have.length(1);
  });

  it('should not render edit icon with className "detail-edit" if not owner contribution', () => {
    wrapperTwo.setProps({ user: userTwo });
    expect(wrapperTwo.find('.detail-edit')).to.have.length(0);
  });

  it('should render delete icon with className "detail-delete" if owner of contribution', () => {
    expect(wrapper.render().find('.detail-delete')).to.have.length(1);
  });

  it('should not render delete icon if not owner of contribution', () => {
    expect(wrapperTwo.find('.detail-delete')).to.have.length(0);
  });

  it('should call delete dialog prop when clicked in modal', () => {
    wrapper.find('.delete-contribution').simulate('click');
    expect(DeleteDialogToggleSpy.callCount).to.equal(1);
  });

  it('should render approve/archive interface if an admin', () => {
    expect(wrapper.render().find('.admin-section')).to.have.length(1);
  });

  it('should not render approve/archive interface if not an admin', () => {
    expect(wrapperTwo.find('.admin-section')).to.have.length(0);
  });

  it('calls toggleVote prop when upvote button is clicked in modal', () => {
    wrapper.find('.upvote-button').simulate('click');
    expect(toggleVoteSpy.callCount).to.equal(1);
  });

  it('should render contribution author\'s details', () => {
    expect(wrapper.render().find('.author-box')).to.have.length(1);
  });

  it('should render contribution author\'s name', () => {
    expect(wrapper.render().find('.author-name').text()).to.equal(sampleContribution.userDetail.name);
  });

  it('should render contribution author\'s profile picture', () => {
    expect(wrapper.render().find('.author-image').prop('src')).to.equal(sampleContribution.userDetail.imageUrl);
  });

  it('should not render contribution author\'s details if userDetails are not present', () => {
    wrapperTwo.setProps({ contribution });
    expect(wrapperTwo.find('.author-box')).to.have.length(0);
  });
});

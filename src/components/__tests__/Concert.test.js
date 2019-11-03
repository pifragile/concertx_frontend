import moment from 'moment';
import { mount } from '@vue/test-utils';
import Concert from '../Concert';

describe('Concert', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Concert, {
      propsData: {
        concert: {
          accepted_by: [],
          canceled_by: [],
          confirmed: false,
          date: moment(),
          id: 1,
          location: 'Helsinki',
          owner: {
            id: 1,
            username: 'Piero',
          },
        },
      },
    });
    expect(wrapper.isVueInstance())
      .toBeTruthy();
  });
});

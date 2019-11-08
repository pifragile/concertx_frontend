import moment from 'moment'
import { mount } from '@vue/test-utils'
import Intern from '../Intern'
import concerts from '../../api/concerts'

function getConcert() {
  return {
    accepted_by: [],
    canceled_by: [],
    confirmed: false,
    date: moment(),
    id: 1,
    location: 'Helsinki',
    owner: {
      id: 1,
      username: 'Alice',
    },
  }
}

describe('Intern', () => {
  jest.mock('../../api/concerts')
  beforeEach(() => {
    const concert1 = getConcert()
    concert1.date = moment('01/01/2000', 'DD/MM/YYYY')
    const concert2 = getConcert()
    concert1.date = moment('01/01/2002', 'DD/MM/YYYY')
    concert2.id = 2
    concerts.listConcerts = jest.fn().mockReturnValue({ data: [concert1, concert2] })
  })
  test('beforeCreate should load concerts and sort them by date', async () => {
    const wrapper = await mount(Intern)
    expect(concerts.listConcerts.mock.calls.length).toBe(1)
    expect(wrapper.vm.concerts[0].id).toBe(2)
    expect(wrapper.vm.concerts[1].id).toBe(1)
  })
  test('removeConcert should remove concert', async () => {
    const wrapper = await mount(Intern)
    wrapper.vm.removeConcert(1)
    expect(wrapper.vm.concerts.length).toBe(1)
    expect(wrapper.vm.concerts[0].id).toBe(2)
  })
})

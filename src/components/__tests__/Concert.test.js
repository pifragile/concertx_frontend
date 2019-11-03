import moment from 'moment'
import { mount } from '@vue/test-utils'
import Concert from '../Concert'
import concerts from '../../api/concerts'

function getBasePropsData() {
  return {
    concert: {
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
    },
    userId: 1,
    domId: 0,
  }
}
describe('isOwnerAndCanChange', () => {
  test(' should return false if user is not owner', () => {
    const propsData = getBasePropsData()
    propsData.userId = 2
    const wrapper = mount(Concert, { propsData })
    expect(wrapper.vm.isOwnerAndCanChange)
      .toBeFalsy()
  })
  test(' should return false if the concert is in the past', () => {
    const propsData = getBasePropsData()
    propsData.concert.date = moment().subtract(13, 'h')
    const wrapper = mount(Concert, { propsData })
    expect(wrapper.vm.isOwnerAndCanChange)
      .toBeFalsy()
  })
  test(' should return true if user is owner and concert is in future', () => {
    const propsData = getBasePropsData()
    propsData.concert.date = moment().add(13, 'h')
    const wrapper = mount(Concert, { propsData })
    expect(wrapper.vm.isOwnerAndCanChange)
      .toBeTruthy()
  })
})

describe('accepted', () => {
  test(' should return true if user accepted', () => {
    const propsData = getBasePropsData()
    propsData.concert.accepted_by.push({
      id: 1,
      username: 'Alice',
    })
    const wrapper = mount(Concert, { propsData })
    expect(wrapper.vm.accepted)
      .toBeTruthy()
  })
  test(' should return false if user did not accept', () => {
    const propsData = getBasePropsData()
    const wrapper = mount(Concert, { propsData })
    expect(wrapper.vm.accepted)
      .toBeFalsy()
  })
})

describe('canceled', () => {
  test(' should return true if user canceled', () => {
    const propsData = getBasePropsData()
    propsData.concert.canceled_by.push({
      id: 1,
      username: 'Alice',
    })
    const wrapper = mount(Concert, { propsData })
    expect(wrapper.vm.canceled)
      .toBeTruthy()
  })
  test(' should return false if user did not cancel', () => {
    const propsData = getBasePropsData()
    const wrapper = mount(Concert, { propsData })
    expect(wrapper.vm.canceled)
      .toBeFalsy()
  })
})

describe('someAccepted', () => {
  test(' should return true if some users accpeted', () => {
    const propsData = getBasePropsData()
    propsData.concert.accepted_by.push({
      id: 3,
      username: 'Bob',
    })
    const wrapper = mount(Concert, { propsData })
    expect(wrapper.vm.someAccepted)
      .toBeTruthy()
  })
  test(' should return false if no user accepted', () => {
    const propsData = getBasePropsData()
    const wrapper = mount(Concert, { propsData })
    expect(wrapper.vm.someAccepted)
      .toBeFalsy()
  })
})

describe('someCanceled', () => {
  test(' should return true if some users canceled', () => {
    const propsData = getBasePropsData()
    propsData.concert.canceled_by.push({
      id: 3,
      username: 'Bob',
    })
    const wrapper = mount(Concert, { propsData })
    expect(wrapper.vm.someCanceled)
      .toBeTruthy()
  })
  test(' should return false if no user canceled', () => {
    const propsData = getBasePropsData()
    const wrapper = mount(Concert, { propsData })
    expect(wrapper.vm.someCanceled)
      .toBeFalsy()
  })
})

describe('updateConcert', () => {
  jest.mock('../../api/concerts')
  test('should invoke concerts.updateConcert', () => {
    concerts.modifyConcert = jest.fn()
    const propsData = getBasePropsData()
    propsData.concert.id = 5
    propsData.concert.confirmed = false
    propsData.concert.date = moment('01/01/2000', 'DD/MM/YYYY')
    const wrapper = mount(Concert, { propsData })
    wrapper.setData({ confirmed: true })
    wrapper.vm.updateConcert()
    const modifyConcertCallArgs = concerts.modifyConcert.mock.calls[0]
    expect(modifyConcertCallArgs[0]).toEqual(5)
    expect(modifyConcertCallArgs[1].date).toEqual('2000-01-01T00:00:00+01:00')
    expect(modifyConcertCallArgs[1].confirmed).toBeTruthy()
  })
})

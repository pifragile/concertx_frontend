import moment from 'moment'
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import AddConcert from '../AddConcert'
import concerts from '../../api/concerts'

describe('addConcert', () => {
  jest.mock('../../api/concerts')
  test('should call concerts.addConcerts with the right location and date', async () => {
    concerts.addConcert = jest.fn().mockReturnValue({ status: 200 })
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const wrapper = mount(AddConcert, {
      localVue,
      router,
    })
    wrapper.setData({ date: moment('01/01/2000', 'DD/MM/YYYY'), location: 'ALocation' })
    await wrapper.vm.addConcert()
    const callArgs = concerts.addConcert.mock.calls[0]
    expect(callArgs[0]).toEqual('ALocation')
    expect(callArgs[1]).toEqual('2000-01-01T00:00:00+01:00')
    expect(wrapper.vm.$route.path).toBe('/intern')
  })
})

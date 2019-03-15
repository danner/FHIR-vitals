import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import Home from './home'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('@views/home', () => {
  let store

  // add this before each
  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
    })
  })

  it('is a valid view', () => {
    expect(Home).toBeAViewComponent()
  })

  it('renders an element', () => {
    const { element } = shallowMountView(Home, {
      localVue,
      store,
      computed: {
        serviceUrl: () => 'foo',
        patientId: () => 'bar',
        response: () => 'baz',
      },
    })
    expect(element.textContent).toContain('Home Page')
  })
})

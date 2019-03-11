import { shallowMount } from '@vue/test-utils'
import Pomodoro from '@/components/Pomodoro.vue'

describe('Teste do componente Pomodoro.vue', () => {
    it('Se o componente existe', () => {
        const wrapper = shallowMount(Pomodoro)
        expect(wrapper.isVueInstance()).toBe(true)
    })
})
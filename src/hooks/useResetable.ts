import type { Ref } from 'vue'
import { ref } from 'vue'

/**
 * 创建一个可重置的状态 Hook
 * @template T - 状态的类型
 * @param {T} initState - 初始状态
 * @returns {Object} - 包含状态和重置函数的对象
 * @property {Ref<T>} state - 响应式状态
 * @property {() => void} reset - 重置状态的函数
 * @property {(partialState: Partial<T>) => void} update - 更新局部状态的函数
 */
export function useResetable<T>(initState: T) {
  const state: Ref<T> = ref(initState) as Ref<T>

      function reset(): void {
        state.value = initState
      }

      return {
        state,
    reset,
  }
} 
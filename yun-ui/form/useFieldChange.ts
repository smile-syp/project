import React from 'react'

import FormStore from './formStore'

const useFieldChange = (
	store: FormStore | undefined,
	name: string | undefined,
	onChange: (isReset: boolean) => void
) => {
	React.useEffect(() => {
		if (!name || !store) return
		return store.subscribe((n) => {
			// n为*代表初始化，其他的都为触发校验
			if (n === '*') {
				onChange(true)
			} else if (n === name) {
				onChange(false)
			}
		})
	}, [name, store])
}

export default useFieldChange;
import React from 'react'

import FormStore from './formStore'

const FormStoreContext = React.createContext<FormStore | undefined>(undefined)

export default FormStoreContext

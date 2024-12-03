import { createSlice } from '@reduxjs/toolkit'

export const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        catalogIsActive: false,
        modalIsActive: false,
        privacyIsChecked: false,
    },
    reducers: {
        toggleCatalog: (state)=>{
            state.catalogIsActive = !state.catalogIsActive
        },
        toggleModal: (state)=>{
            state.modalIsActive = !state.modalIsActive
        },
        togglePrivacy: (state)=>{
            state.privacyIsChecked = !state.privacyIsChecked
        }
    },
})

export const { toggleCatalog, toggleModal, togglePrivacy } = toggleSlice.actions

export default toggleSlice.reducer

export const selectCatalog = (state) => state.toggle.catalogIsActive
export const selectModal = (state) => state.toggle.modalIsActive
export const selectPrivacy = (state) => state.toggle.privacyIsChecked
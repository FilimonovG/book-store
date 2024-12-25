import { createSlice } from '@reduxjs/toolkit'

export const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        catalogIsActive: false,
        createModalIsActive: false,
        updateModalIsActive: false,
        deleteModalIsActive: false,
        privacyIsChecked: false,
    },
    reducers: {
        toggleCatalog: (state)=>{
            state.catalogIsActive = !state.catalogIsActive
        },
        toggleCreateModal: (state)=>{
            state.createModalIsActive = !state.createModalIsActive
        },
        toggleUpdateModal: (state)=>{
            state.updateModalIsActive = !state.updateModalIsActive
        },
        toggleDeleteModal: (state)=>{
            state.deleteModalIsActive = !state.deleteModalIsActive
        },
        togglePrivacy: (state)=>{
            state.privacyIsChecked = !state.privacyIsChecked
        },
    },
})

export const { toggleCatalog, toggleCreateModal, toggleDeleteModal, toggleUpdateModal, togglePrivacy } = toggleSlice.actions

export default toggleSlice.reducer

export const selectCatalog = (state) => state.toggle.catalogIsActive
export const selectCreateModal = (state) => state.toggle.createModalIsActive
export const selectUpdateModal = (state) => state.toggle.updateModalIsActive
export const selectDeleteModal = (state) => state.toggle.deleteModalIsActive
export const selectPrivacy = (state) => state.toggle.privacyIsChecked
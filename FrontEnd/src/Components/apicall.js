import {
    _call
} from './api-utils';

const api = {
    getUser: () => (
        _call({
            method: 'GET',
            url: '/user/getUser'
        })
    ),
    addUser: (data) => (
        _call({
            method: 'POST',
            url: '/user/addUser',
            data
        })
    ),
    updateUser: (data) => (
        _call({
            method: 'POST',
            url: '/user/updateUser',
            data
        })
    ),
    deleteUser: (data) => (
        _call({
            method: 'POST',
            url: '/user/deleteUser',
            data
        })
    ),
    getRole: () => (
        _call({
            method: 'GET',
            url: '/role/getRole'
        })
    ),
    addRole: (data) => (
        _call({
            method: 'POST',
            url: '/role/addRole',
            data
        })
    ),
    updateRole: (data) => (
        _call({
            method: 'POST',
            url: '/role/updateRole',
            data
        })
    ),
    deleteRole: (data) => (
        _call({
            method: 'post',
            url: '/role/deleteRole',
            data
        })
    ),
    getCountry: () => (
        _call({
            method: 'GET',
            url: '/country/getCountry'
        })
    ),
    addCountry: (data) => (
        _call({
            method: 'POST',
            url: '/country/addCountry',
            data
        })
    ),
    updateCountry: (data) => (
        _call({
            method: 'POST',
            url: '/country/updateCountry',
            data
        })
    ),
    deleteCountry: (data) => (
        _call({
            method: 'POST',
            url: '/country/deleteCountry',
            data
        })
    )
}


export default api;

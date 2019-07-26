import axios from 'axios'

export var NavList = () => {
    return axios.get('api/getimgcategory').then(res => res)
}